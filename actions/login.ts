'use server'

import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'

import { z } from 'zod'
import { db } from '@/lib/db'
import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { getUserByEmail } from '@/data/user'
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/token'
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: "невалидные данные." }
	}

	const { email, password, code } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Такой email не зарегистрирован' }
	}

	const isValidPassword = await bcrypt.compare(password, existingUser.password!);

	if (!isValidPassword) {
		return { error: "Неверный пароль" };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(existingUser.email);

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		)

		return { success: 'Письмо с верификацией отправлено на вашу почту' }
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

			if (!twoFactorToken) return { error: 'Код отсутствует. Пожалуйста, запросите код повторно.' };

			if (twoFactorToken.token !== code) {
				return { error: 'Неправильный код. Проверьте и попробуйте снова.' };
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date();

			if (hasExpired) {
				return { error: 'Срок действия кода истёк. Пожалуйста, запросите новый код.' };
			}

			await db.twoFactorToken.delete({
				where: { id: twoFactorToken.id }
			});

			const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

			if (existingConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id }
				})
			}

			await db.twoFactorConfirmation.create({
				data: { userId: existingUser.id }
			})
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email);

			await sendTwoFactorTokenEmail(
				twoFactorToken.email,
				twoFactorToken.token,
			)

			return { twoFactor: true }
		}
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: 'Неправильные email или пароль' }
				default:
					return { error: 'Что-то пошло не так при входе. Попробуйте снова.' }
			}
		}

		throw error;
	}
}
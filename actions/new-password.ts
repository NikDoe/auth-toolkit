"use server"

import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { NewPasswordSchema } from "@/schemas"
import { getResetPasswordTokenByToken } from '@/data/reset-password-token'

export const newPassword = async (
	values: z.infer<typeof NewPasswordSchema>,
	token: string | null,
) => {
	if (!token) return { error: 'Токен не найден. Пожалуйста, проверьте ссылку.' }

	const existingToken = await getResetPasswordTokenByToken(token);

	if (!existingToken) {
		return { error: 'Токен недействителен.' };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: 'Срок действия токена истёк.' };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: 'Пользователь с данным email не найден.' };
	}

	const { password } = values;
	const hashedPassword = await bcrypt.hash(password, 10);

	await db.user.update({
		where: { id: existingUser.id },
		data: { password: hashedPassword },
	})

	await db.resetPasswordToken.delete({
		where: { id: existingToken.id },
	})

	return { success: 'Пароль успешно обновлён 🎉' }
}
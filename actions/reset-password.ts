"use server"

import { z } from 'zod'
import { getUserByEmail } from '@/data/user'
import { ResetPasswordSchema } from "@/schemas"
import { sendResetPasswordEmail } from '@/lib/mail'
import { generateResetPasswordToken } from '@/lib/token'

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
	const validatedFields = ResetPasswordSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: "невалидный email" }
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return { error: 'Такого email не существует' }
	}

	const resetPasswordToken = await generateResetPasswordToken(email);

	await sendResetPasswordEmail(
		resetPasswordToken.email,
		resetPasswordToken.token,
	)

	return { success: 'Письмо со сбросом пароля отправлено вам на почту' }
}
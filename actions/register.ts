'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { RegisterSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: "невалидные данные" }
	}

	const { email, name, password } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await getUserByEmail(email);

	if (user) return { error: "Пользователь с таким email уже существует" };

	await db.user.create({
		data: {
			email,
			name,
			password: hashedPassword,
		}
	})

	return { success: 'Пользователь создан' };
}
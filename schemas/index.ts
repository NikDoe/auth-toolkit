import { z } from "zod"

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'невалидный email'
	}),
	password: z.string().min(1, {
		message: 'пароль обязателен'
	})
})

export const RegisterSchema = z.object({
	email: z.string().email({
		message: 'невалидный email'
	}),
	password: z.string().min(6, {
		message: 'Минимальная длинна 6 символов'
	}),
	name: z.string().min(2, {
		message: 'Минимальная длинна 2 символа'
	})
})
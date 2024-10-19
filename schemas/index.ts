import { z } from "zod"

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'невалидный email'
	}),
	password: z.string().min(6, {
		message: 'пароль обязателен'
	})
})
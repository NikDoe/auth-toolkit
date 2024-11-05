import { z } from "zod"
import {UserRole} from "@prisma/client";

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'невалидный email'
	}),
	password: z.string().min(1, {
		message: 'пароль обязателен'
	}),
	code: z.optional(z.string()),
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

export const ResetPasswordSchema = z.object({
	email: z.string().email({
		message: 'невалидный email'
	}),
})

export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: 'Минимальная длинна 6 символов'
	}),
})

export const SettingsSchema = z.object({
	name: z.optional(z.string().min(2, {
		message: 'Минимальная длинна 2 символа'
	})),
	isTwoFactorEnabled: z.optional(z.boolean()),
	email: z.optional(z.string().email({
		message: 'невалидный email'
	})),
	password: z.optional(z.string()),
	newPassword: z.optional(z.string()),
	role: z.enum([UserRole.USER, UserRole.ADMIN]),
}).refine(data => {
	if(data.password && !data.newPassword) return false;

	return true;
}, {
	message: 'Введите новый пароль',
	path: ['newPassword'],
}).refine(data => {
	if(data.newPassword && !data.password) return false;

	return true;
}, {
	message: 'Введите текущий пароль',
	path: ['password'],
})
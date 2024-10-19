'use client'

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RegisterSchema } from "@/schemas"

import { CardWrapper } from "@/components/auth/CardWrapper"
import { zodResolver } from "@hookform/resolvers/zod"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form/FormError"
import { FormSuccess } from "@/components/form/FormSuccess"

import { register } from '@/actions/register'

export const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState<string | undefined>("");
	const [error, setError] = useState<string | undefined>("");


	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
	})

	function onSubmit(values: z.infer<typeof RegisterSchema>) {
		setSuccess('');
		setError('');

		startTransition(() => {
			register(values)
				.then((data) => {
					setSuccess(data.success)
					setError(data.error)
				})
		})
	}

	return (
		<CardWrapper
			backButtonHref="/auth/login"
			backButtonLabel="Уже есть аккаунт ?"
			headerlabel="Создание аккаунта 👻"
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-y-6"
				>
					<div className="flex flex-col gap-y-4">
						<FormField
							disabled={isPending}
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="John Doe"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							disabled={isPending}
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="example@email.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							disabled={isPending}
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="******"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button
						disabled={isPending}
						type='submit'
						className="w-full"
					>
						{isPending ? 'Подождите...' : 'Регистрация'}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
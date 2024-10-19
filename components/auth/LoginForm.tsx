'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoginSchema } from "@/schemas"

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

export const LoginForm = () => {
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(values: z.infer<typeof LoginSchema>) {
		console.log(values)
	}

	return (
		<CardWrapper
			backButtonHref="/auth/register"
			backButtonLabel="Нет аккаунта ?"
			headerlabel="С возвращением 👻"
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-y-6"
				>
					<div className="flex flex-col gap-y-4">
						<FormField
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
					<FormError message="error message" />
					<FormSuccess message="success message" />
					<Button
						type='submit'
						className="w-full"
					>
						Войти в аккаунт
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
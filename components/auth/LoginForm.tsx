'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import Link from "next/link"

import { LoginSchema } from "@/schemas"

import { CardWrapper } from "@/components/auth/CardWrapper"
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

import { login } from '@/actions/login'

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
		? 'Email уже используется при логине через другой провайдер'
		: '';

	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState<string | undefined>("");
	const [error, setError] = useState<string | undefined>("");


	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(values: z.infer<typeof LoginSchema>) {
		setSuccess('');
		setError('');

		startTransition(() => {
			login(values)
				.then((data) => {
					if (data?.error) {
						setError(data.error);
					}

					if (data?.success) {
						form.reset();
						setSuccess(data.success);
					}

					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => {
					setError('Что-то пошло не так...')
				})
		})
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
						{showTwoFactor && (
							<FormField
								control={form.control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>2FA Код</FormLabel>
										<FormControl>
											<Input
												disabled={isPending}
												placeholder="123456"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{!showTwoFactor && (
							<>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													disabled={isPending}
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
													disabled={isPending}
													type="password"
													placeholder="******"
													{...field}
												/>
											</FormControl>
											<FormMessage />
											<Button
												variant='link'
												className="px-0"
												asChild
											>
												<Link href='/auth/reset-password'>
													забыли пароль?
												</Link>
											</Button>
										</FormItem>
									)}
								/>
							</>
						)}
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button
						disabled={isPending}
						type='submit'
						className="w-full"
					>
						{isPending
							? 'Подождите...'
							: showTwoFactor
								? 'Подвердить код'
								: 'Войти в аккаунт'
						}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

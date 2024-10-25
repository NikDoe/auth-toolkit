'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"

import { ResetPasswordSchema } from "@/schemas"

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
import { resetPassword } from "@/actions/reset-password"

export const ResetPasswordForm = () => {
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState<string | undefined>("");
	const [error, setError] = useState<string | undefined>("");


	const form = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: '',
		},
	})

	function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
		setSuccess('');
		setError('');

		startTransition(() => {
			resetPassword(values)
				.then(data => {
					setSuccess(data.success);
					setError(data.error);
				})
				.catch(() => {
					setError('Что-то пошло не так при сбросе пароля');
				})
		})
	}

	return (
		<CardWrapper
			backButtonHref="/auth/login"
			backButtonLabel="Вернуться к логину"
			headerlabel="забыли пароль?"
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
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button
						disabled={isPending}
						type='submit'
						className="w-full"
					>
						{isPending ? 'Подождите...' : 'Восстановить пароль'}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

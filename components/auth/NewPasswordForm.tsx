'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"

import { NewPasswordSchema } from "@/schemas"

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
import { newPassword } from "@/actions/new-password"

export const NewPasswordForm = () => {
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState<string | undefined>("");
	const [error, setError] = useState<string | undefined>("");

	const token = searchParams.get('token');

	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
		},
	})

	function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
		setSuccess('');
		setError('');

		startTransition(() => {
			newPassword(values, token)
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
			headerlabel="Придумайте новый пароль"
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
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Новый пароль</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="*******"
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
						{isPending ? 'Подождите...' : 'Обновить пароль'}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}



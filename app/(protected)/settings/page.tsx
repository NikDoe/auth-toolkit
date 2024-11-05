"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"

import { SettingsSchema } from "@/schemas";

import {
	Form,
	FormControl, FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form/FormError"
import { FormSuccess } from "@/components/form/FormSuccess"

import { settingsAction } from "@/actions/settings";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
import {Switch} from "@/components/ui/switch";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UserRole} from "@prisma/client";

function SettingsPage() {
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState<string | undefined>("");
	const [error, setError] = useState<string | undefined>("");

	const { update } = useSession();
	const user = useCurrentUser();

	const form = useForm<z.infer<typeof SettingsSchema>>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			name: user?.name || undefined,
			role: user?.role || undefined,
			email: user?.email || undefined,
			password: undefined,
			newPassword: undefined,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
		},
	})

	function onSubmit(values: z.infer<typeof SettingsSchema>) {
		setSuccess('');
		setError('');

		startTransition(() => {
			settingsAction(values)
				.then(data => {
					if (data?.success) {
						update()
						setSuccess(data.success);
					}

					if(data.error) {
						setError(data.error);
					}
				})
				.catch(() => setError('Что-то пошло не так при изменении настроек'))
		})
	}

	return (
		<div
			className="w-full flex flex-col items-center gap-y-4 p-5 rounded-sm border bg-white max-w-[480px]"
		>
			<h1 className='text-lg'>⚙️ Настройки</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full flex flex-col gap-y-6"
				>
					<div className="flex flex-col gap-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											type="text"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Роль</FormLabel>
									<Select
										disabled={isPending}
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={UserRole.USER}>
												Пользователь
											</SelectItem>
											<SelectItem value={UserRole.ADMIN}>
												Администратор
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{user?.isOAuth === false && (
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
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						{user?.isOAuth === false && (
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Текущий пароль</FormLabel>
										<FormControl>
											<Input
												disabled={isPending}
												type="password"
												placeholder="******"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						{user?.isOAuth === false && (
							<FormField
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Новый пароль</FormLabel>
										<FormControl>
											<Input
												disabled={isPending}
												type="password"
												placeholder="******"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						{user?.isOAuth === false && (
							<FormField
								control={form.control}
								name="isTwoFactorEnabled"
								render={({ field }) => (
									<FormItem
										className='flex flex-col sm:flex-row sm:items-center sm:justify-between'
									>
										<div>
											<FormLabel>2-х факторная аутентификация</FormLabel>
											<FormDescription>
												включает 2-х факторную аутентификацию
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												disabled={isPending}
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button
						disabled={isPending}
						type='submit'
						className="w-full"
					>
						{isPending
							? 'Подождите...'
							: 'Сохранить'
						}
					</Button>
				</form>
			</Form>
		</div>
)
}

export default SettingsPage

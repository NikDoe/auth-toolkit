import { CardWrapper } from "@/components/auth/CardWrapper"

export const LoginForm = () => {
	return (
		<CardWrapper
			backButtonHref="/auth/register"
			backButtonLabel="Нет аккаунта ?"
			headerlabel="С возвращением 👻"
			showSocial
		>
			Login Form
		</CardWrapper>
	)
}
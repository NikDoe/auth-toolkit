import { CardWrapper } from "@/components/auth/CardWrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

function ErrorCard() {
	return (
		<CardWrapper
			headerlabel="Что-то пошло не так 🤔"
			backButtonHref="/auth/login"
			backButtonLabel="Войти в аккаунт снова"
		>
			<div className="my-2 w-full flex items-center justify-center">
				<ExclamationTriangleIcon className="text-destructive" />
			</div>
		</CardWrapper>
	)
}

export default ErrorCard

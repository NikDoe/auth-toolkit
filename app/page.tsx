import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main
			className="flex flex-col h-full items-center justify-center bg-lime-300"
		>
			<h1 className="text-6xl font-bold mb-4 text-center">
				🚀 Auth NikDOe
			</h1>
			<p
				className="text-lg mb-4 text-center"
			>
				простой сервис авторизации и регистрации
			</p>
			<LoginButton>
				<Button variant='outline' size='lg'>
					Войти в аккаунт
				</Button>
			</LoginButton>
		</main>
	);
}

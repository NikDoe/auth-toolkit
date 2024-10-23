import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const Social = () => {
	const loginWithSocial = (provider: "google" | "github") => {
		signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT,
		});
	}

	return (
		<div
			className="w-full flex items-center gap-x-2"
		>
			<Button
				className="w-full"
				variant='outline'
				size='lg'
				onClick={() => loginWithSocial('google')}
			>
				<FcGoogle
					className="h-5 w-5"
				/>
			</Button>
			<Button
				className="w-full"
				variant='outline'
				size='lg'
				onClick={() => loginWithSocial('github')}
			>
				<FaGithub
					className="h-5 w-5"
				/>
			</Button>
		</div>
	)
}
import { LoginForm } from "@/components/auth/LoginForm"
import { Suspense } from 'react'

function LoginPage() {
	return (
		<div className="h-full w-full bg-lime-300 flex items-center justify-center">
			<Suspense>
				<LoginForm />
			</Suspense>
		</div>
	)
}

export default LoginPage

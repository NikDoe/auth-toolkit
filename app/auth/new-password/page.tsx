import { NewPasswordForm } from "@/components/auth/NewPasswordForm"
import { Suspense } from "react"

function NewPasswordPage() {
	return (
		<div className="h-full w-full bg-lime-300 flex items-center justify-center">
			<Suspense>
				<NewPasswordForm />
			</Suspense>
		</div>
	)
}

export default NewPasswordPage

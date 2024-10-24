import NewVerificationForm from "@/components/auth/NewVerificationForm"
import { Suspense } from 'react'

function NewVerificationPage() {
	return (
		<div className="h-full w-full bg-lime-300 flex items-center justify-center">
			<Suspense>
				<NewVerificationForm />
			</Suspense>
		</div>

	)
}

export default NewVerificationPage

'use client'

import { useRouter } from "next/navigation";

interface LoginButtonProps {
	asChild?: boolean;
	children: React.ReactNode;
	mode?: 'modal' | 'redirect';
}

function LoginButton({
	children,
	mode = 'redirect'
}: LoginButtonProps) {
	const router = useRouter();

	const onClick = () => {
		router.push('/auth/login')
	}

	if (mode === 'modal') {
		return (
			<span>
				TODO: создать модалку
			</span>
		)
	}

	return (
		<span onClick={onClick} className="cursor-pointer">
			{children}
		</span>
	)
}

export default LoginButton

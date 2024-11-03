'use client'

import { ReactNode } from "react";
import { logout } from "@/actions/logout"

interface LogoutButtonProps {
	children?: ReactNode;
}

function LogoutButton({ children }: LogoutButtonProps) {
	const onClick = () => {
		logout();
	}

	return (
		<span onClick={onClick} className="cursor-pointer">
			{children}
		</span>
	)
}

export default LogoutButton
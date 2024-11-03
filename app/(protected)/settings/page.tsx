"use client"

import { logout } from "@/actions/logout";
import LogoutButton from "@/components/auth/LogoutButton";

function SettingsPage() {

	return (
		<div className="p-5 rounded-sm border bg-white">
			<form action={logout}>
				<LogoutButton>
					Выйти
				</LogoutButton>
			</form>
		</div>
	)
}

export default SettingsPage

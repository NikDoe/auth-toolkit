'use client'

import LogoutButton from "@/components/auth/LogoutButton";
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user"

function UserMenu() {
	const user = useCurrentUser();

	const avatarFallbackText = user?.name?.slice(0, 2).toUpperCase();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="outline-none">
				<Avatar>
					<AvatarImage
						src={user?.image || "https://github.com/shadcn.png"}
						alt="avatar image"
						referrerPolicy="no-referrer"
					/>
					<AvatarFallback>{avatarFallbackText}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" sideOffset={10}>
				<LogoutButton>
					<DropdownMenuItem>
						Выйти
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserMenu

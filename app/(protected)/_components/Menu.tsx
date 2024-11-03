'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { IoMenuOutline } from "react-icons/io5";

function Menu() {
	const pathName = usePathname();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="outline-none">
				<IoMenuOutline className="w-6 h-6" />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="flex flex-col gap-y-2"
				align="start"
				sideOffset={10}
			>
				<Button
					className="w-full"
					variant={pathName === '/client' ? 'default' : 'outline'}
					asChild
				>
					<Link
						href='/client'
					>
						на клиенте
					</Link>
				</Button>
				<Button
					className="w-full"
					variant={pathName === '/server' ? 'default' : 'outline'}
					asChild
				>
					<Link
						href='/server'
					>
						на сервере
					</Link>
				</Button>
				<Button
					className="w-full"
					variant={pathName === '/admin' ? 'default' : 'outline'}
					asChild
				>
					<Link
						href='/admin'
					>
						админ
					</Link>
				</Button>
				<Button
					className="w-full"
					variant={pathName === '/settings' ? 'default' : 'outline'}
					asChild
				>
					<Link
						href='/settings'
					>
						настройки
					</Link>
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default Menu;

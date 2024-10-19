'use client'

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/Header";
import { Social } from "@/components/auth/Social";
import { BackButton } from "@/components/auth/BackButton";

interface CardWrapperProps {
	children: React.ReactNode;
	headerlabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
}

export const CardWrapper = ({
	children,
	backButtonHref,
	backButtonLabel,
	headerlabel,
	showSocial
}: CardWrapperProps) => {
	return (
		<Card className="w-[400px] shadow-md">
			<CardHeader>
				<Header label={headerlabel} />
			</CardHeader>
			<CardContent>
				{children}
			</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton
					href={backButtonHref}
					label={backButtonLabel}
				/>
			</CardFooter>
		</Card>
	)
}
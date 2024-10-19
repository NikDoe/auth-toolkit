interface HeaderProps {
	label: string;
}

export const Header = ({
	label,
}: HeaderProps) => {
	return (
		<div
			className="w-full flex flex-col items-center justify-center gap-y-2"
		>
			<h1 className="text-3xl font-bold">
				Auth
			</h1>
			<p>{label}</p>
		</div>
	)
}
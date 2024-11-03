import Navbar from "./_components/Navbar";

export default async function ProtectedLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="bg-lime-300 w-full h-full flex flex-col items-center justify-center gap-y-5">
			<Navbar />
			{children}
		</div>
	);
}
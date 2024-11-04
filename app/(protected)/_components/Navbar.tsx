import Menu from "./Menu"
import UserMenu from "./UserMenu"

function Navbar() {
	return (
		<div className="bg-white flex justify-between max-w-[480px] border rounded-md w-full p-2">
			<Menu />
			<UserMenu />
		</div>
	)
}

export default Navbar

import Navbar from "@components/layouts/Navbar"
import { Outlet } from "react-router"

const LayoutRouter = () => {
	return (
		<div className="py-5 max-lg:px-5 lg:px-28">
			{/* NAVBAR, CONTENT, FOOTER */}
			<div className="flex w-full flex-col">
				<div className="flex-1">
					<Navbar>
						<Outlet />
					</Navbar>
				</div>
			</div>
		</div>
	)
}

export default LayoutRouter

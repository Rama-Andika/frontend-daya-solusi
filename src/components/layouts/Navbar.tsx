import Button from "@components/ui/Button"
import { contentPage } from "@configs/pages.config"
import { ReactNode } from "react"
import { Link } from "react-router"

const Navbar = ({ children }: { children: ReactNode }) => {
	return (
		<nav className="flex flex-col gap-10">
			<div className="flex items-center justify-between">
				<Link to={contentPage.Home.to}>
					<h1 className="text-3xl font-bold">Daya Solusi</h1>
				</Link>

				<Link to={contentPage.Home.subPages.createTransaction.to}>
					<Button variant="outline" className="font-medium">
						Create Transaction
					</Button>
				</Link>
			</div>
			{children}
		</nav>
	)
}

export default Navbar

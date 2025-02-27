import Button from "@components/ui/Button"
import { contentPage } from "@configs/pages.config"
import { Link } from "react-router"

const NotFoundPage: React.FC = () => {
	return (
		<div className="flex h-screen items-center justify-center px-5">
			<div>
				<div className="text-xl">Page not found</div>
				<div>
					Sorry, the page you’re looking for doesn’t exist. It may have been moved or
					deleted.
				</div>
				<div className="mt-5">
					<Link to={contentPage.Home.to}>
						<Button>Back to new sales</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFoundPage

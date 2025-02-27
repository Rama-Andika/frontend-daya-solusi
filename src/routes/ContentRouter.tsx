import { Route, Routes } from "react-router"
import { lazy, Suspense } from "react"
import LayoutRouter from "./LayoutRouter"
import NotFoundPage from "@pages/NotFound.page"
import { contentPage } from "@configs/pages.config"

const ContentRouter = () => {
	// Lazy-loaded pages
	const HomePage = lazy(() => import("../pages/Home.page"))
	const AddTransaction = lazy(() => import("../pages/AddTransaction"))
	const EditTransaction = lazy(() => import("../pages/EditTransaction"))
	const DetailTransaction = lazy(() => import("../pages/DetailTransaction"))

	return (
		<Routes>
			{/* Routes with LayoutRouter */}
			<Route element={<LayoutRouter />}>
				<Route
					path={contentPage.Home.to}
					element={
						<Suspense fallback={<div>Loading...</div>}>
							<HomePage />
						</Suspense>
					}
				/>
				<Route
					path={contentPage.Home.subPages.createTransaction.to}
					element={
						<Suspense fallback={<div>Loading...</div>}>
							<AddTransaction />
						</Suspense>
					}
				/>
				<Route
					path={`${contentPage.Home.subPages.editTransaction.to}/:id`}
					element={
						<Suspense fallback={<div>Loading...</div>}>
							<EditTransaction />
						</Suspense>
					}
				/>
				<Route
					path={`${contentPage.Home.subPages.detailTransaction.to}/:id`}
					element={
						<Suspense fallback={<div>Loading...</div>}>
							<DetailTransaction />
						</Suspense>
					}
				/>
			</Route>

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	)
}

export default ContentRouter

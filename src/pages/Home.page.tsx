import axiosInstance from "@api/axiosInstance"
import Button from "@components/ui/Button"
import { contentPage } from "@configs/pages.config"
import classNames from "classnames"
import { Status } from "constants/enums/status.enum"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { TResponse } from "types/response/successResponse.type"
import { TTransaction } from "types/transaction.type"

const HomePage = () => {
	const [data, setData] = useState<{ [key in string]: TTransaction[] } | undefined>(undefined)
	const [loading, setLoading] = useState(false)

	const fetchData = async () => {
		try {
			setLoading(true)
			const response = await axiosInstance.get("/api/transactions")
			const result: TResponse<TTransaction[]> = response.data
			if (result.data) {
				const groupedData = result.data.reduce(
					(acc: { [key in string]: TTransaction[] }, curr) => {
						const date = new Date(curr.transactionDate)
						const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`

						if (!acc[key]) {
							acc[key] = []
						}

						acc[key].push(curr)
						return acc
					},
					{}
				)

				// Sorting the grouped data by YYYY-MM in ascending order

				// const sortedGrouped = Object.fromEntries(
				// 	Object.entries(groupedData).sort(([a], [b]) => b.localeCompare(a))
				// )

				setData(groupedData)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	if (!data) {
		return (
			<div>
				Transaction is still empty, let's{" "}
				<Link
					to={contentPage.Home.subPages.createTransaction.to}
					className="text-main-color">
					create
				</Link>{" "}
				a new one!
			</div>
		)
	}

	return (
		<div>
			<div className="mb-5 text-xl">Transaction List</div>
			{Object.entries(data).map(([key, value]) => (
				<div key={key} className="mb-5 overflow-auto">
					<h2 className="text-lg font-semibold">{key}</h2>
					<table className="w-full rounded-lg bg-slate-100">
						<thead className="text-left">
							<tr>
								<th className="w-10 min-w-10 p-2">No</th>
								<th className="w-52 min-w-52 p-2">Product Name</th>
								<th className="w-24 min-w-24 p-2">Amount</th>
								<th className="w-52 min-w-52 p-2">Customer Name</th>
								<th className="w-24 min-w-24 p-2">Status</th>
								<th className="w-24 min-w-24 p-2">Action</th>
							</tr>
						</thead>
						<tbody>
							{value.map((item, i) => (
								<tr key={item.id} className="hover:bg-slate-200">
									<td className="p-2">{i + 1}</td>
									<td className="p-2">
										<Link
											className="text-blue-500"
											to={`${contentPage.Home.subPages.editTransaction.to}/${item.id}`}>
											{item.productName}
										</Link>
									</td>
									<td className="p-2">{item.amount}</td>
									<td className="p-2">{item.customerName}</td>
									<td
										className={classNames("p-2", {
											"text-red-500": item.status === 1,
											"text-green-500": item.status === 0
										})}>
										{item.status === 0 ? Status.SUCCESS : Status.FAILED}
									</td>
									<td>
										<Link
											to={`${contentPage.Home.subPages.detailTransaction.to}/${item.id}`}>
											<Button>Detail</Button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			))}
		</div>
	)
}

export default HomePage

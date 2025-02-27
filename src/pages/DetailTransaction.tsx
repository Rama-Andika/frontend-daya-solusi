import axiosInstance from "@api/axiosInstance"
import classNames from "classnames"
import { Status } from "constants/enums/status.enum"
import dayjs from "dayjs"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router"
import { TResponse } from "types/response/successResponse.type"
import { TTransaction } from "types/transaction.type"

const DetailTransaction = () => {
	const { id } = useParams()

	// State
	const [data, setData] = useState<Partial<TTransaction>>({
		productName: "",
		amount: "",
		customerName: "",
		status: 0,
		transactionDate: "",
		createBy: "",
		createOn: ""
	})

	const fetchData = useCallback(async () => {
		try {
			const response = await axiosInstance.get(`/api/transaction/${id}`)
			const result: TResponse<Partial<TTransaction>> = response.data
			const { data } = result
			if (data) {
				setData(data)
			}
		} catch (error) {
			console.log(error)
		}
	}, [id])

	useEffect(() => {
		fetchData()
	}, [fetchData])
	return (
		<div>
			<div className="mb-5 text-xl">Transaction Detail</div>
			<div className="flex flex-col gap-5">
				<div>
					<div className="font-semibold">Product Name</div>
					<div>{data.productName}</div>
				</div>
				<div>
					<div className="font-semibold">Amount</div>
					<div>{data.amount}</div>
				</div>
				<div>
					<div className="font-semibold">Customer</div>
					<div>{data.customerName}</div>
				</div>
				<div>
					<div className="font-semibold">Status</div>
					<div
						className={classNames({
							"text-red-500": data.status === 1,
							"text-green-500": data.status === 0
						})}>
						{data.status === 0 ? Status.SUCCESS : Status.FAILED}
					</div>
				</div>
				<div>
					<div className="font-semibold">Transaction Date</div>
					<div>{dayjs(data.transactionDate).format("DD MMMM, YYYY HH:mm:ss")}</div>
				</div>
				<div>
					<div className="font-semibold">Create By</div>
					<div>{data.createBy}</div>
				</div>
				<div>
					<div className="font-semibold">Created Date</div>
					<div>{dayjs(data.createOn).format("DD MMMM, YYYY HH:mm:ss")}</div>
				</div>
			</div>
		</div>
	)
}

export default DetailTransaction

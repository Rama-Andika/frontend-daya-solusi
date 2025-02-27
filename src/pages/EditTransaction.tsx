import Input from "@components/forms/Input"
import Button from "@components/ui/Button"
import { Status } from "constants/enums/status.enum"
import { useCallback, useEffect, useRef, useState } from "react"
import { TTransaction } from "types/transaction.type"
import dayjs from "dayjs"
import FieldErrortext from "@components/texts/FieldErrortext"
import getErrorResponse from "@utils/getErrorResponse"
import { toast } from "sonner"
import { errorMessage } from "@utils/messages/error"
import axiosInstance from "@api/axiosInstance"
import { successMessage } from "@utils/messages/success"
import { useNavigate, useParams } from "react-router"
import { contentPage } from "@configs/pages.config"
import { TResponse } from "types/response/successResponse.type"

const EditTransaction = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	// State
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState<Partial<TTransaction>>({
		productName: "",
		amount: "",
		customerName: "",
		status: 0,
		transactionDate: dayjs(new Date()).format("YYYY-MM-DD"),
		createBy: ""
	})

	const [fieldErrors, setFieldErrors] = useState<Partial<TTransaction> | undefined>(undefined)

	// Ref
	const productNameRef = useRef<HTMLInputElement>(null)
	const amountRef = useRef<HTMLInputElement>(null)
	const customerNameRef = useRef<HTMLInputElement>(null)
	const statusRef = useRef<HTMLSelectElement>(null)
	const transactionDateRef = useRef<HTMLInputElement>(null)
	const createByRef = useRef<HTMLInputElement>(null)

	const fetchData = useCallback(async () => {
		try {
			setLoading(true)
			const response = await axiosInstance.get(`/api/transaction/${id}`)
			const result: TResponse<Partial<TTransaction>> = response.data
			const { data } = result
			if (data) {
				data.transactionDate = dayjs(data.transactionDate).format("YYYY-MM-DD")
				setFormData(data)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}, [id])

	const handleValidateData = (): boolean => {
		let isValid = true
		const errors: Partial<TTransaction> = {}
		if (!formData.productName) {
			isValid = false
			errors.productName = "Product name cannot be empty!"
		}
		if (!formData.amount) {
			isValid = false
			errors.amount = "Amount cannot be empty!"
		}
		if (!formData.customerName) {
			isValid = false
			errors.customerName = "Customer name cannot be empty!"
		}
		if (!formData.transactionDate) {
			isValid = false
			errors.transactionDate = "Transaction date cannot be empty!"
		}
		if (!formData.createBy) {
			isValid = false
			errors.createBy = "Create by cannot be empty!"
		}

		setFieldErrors(errors)

		return isValid
	}

	const mappingFormData = (): Partial<TTransaction> => {
		return {
			productName: formData.productName,
			amount: formData.amount,
			customerName: formData.customerName,
			status: formData.status,
			transactionDate: formData.transactionDate + " " + dayjs(new Date()).format("HH:mm:ss"),
			createBy: formData.createBy
		}
	}

	const handleSubmit = async () => {
		try {
			setLoading(true)
			const isValid = handleValidateData()
			if (!isValid) {
				toast.error(errorMessage("Save failed, please fill in some incomplete data"))
				return
			}

			await axiosInstance.put(`/api/transaction/${id}`, mappingFormData())
			toast.success(successMessage("Data has been saved"))
			navigate(contentPage.Home.to)
		} catch (error: any) {
			toast.error(getErrorResponse(error))
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return (
		<div>
			<div className="mb-5 text-xl">Edit Transaction</div>
			<div className="flex max-w-72 flex-col gap-5">
				<div>
					<label htmlFor="productName">Product Name</label>
					<Input
						ref={productNameRef}
						value={formData.productName}
						onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
						onKeyUp={(e) => e.key === "Enter" && amountRef.current?.focus()}
						id="productName"
						name="productName"
					/>
					{fieldErrors?.productName && (
						<FieldErrortext>{fieldErrors.productName}</FieldErrortext>
					)}
				</div>
				<div>
					<label htmlFor="amount">Amount</label>
					<Input
						ref={amountRef}
						value={formData.amount}
						onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
						onKeyUp={(e) => e.key === "Enter" && customerNameRef.current?.focus()}
						id="amount"
						name="amount"
						type="number"
						inputMode="decimal"
					/>
					{fieldErrors?.amount && <FieldErrortext>{fieldErrors.amount}</FieldErrortext>}
				</div>
				<div>
					<label htmlFor="customerName">Customer Name</label>
					<Input
						ref={customerNameRef}
						value={formData.customerName}
						onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
						onKeyUp={(e) => e.key === "Enter" && statusRef.current?.focus()}
						id="customerName"
						name="customerName"
					/>
					{fieldErrors?.customerName && (
						<FieldErrortext>{fieldErrors.customerName}</FieldErrortext>
					)}
				</div>
				<div>
					<label className="block" htmlFor="status">
						Status
					</label>
					<select
						ref={statusRef}
						value={formData.status}
						onChange={(e) =>
							setFormData({
								...formData,
								status: Number(e.target.value)
							})
						}
						className="h-[38px] w-full rounded-md border-2"
						name="status"
						id="status">
						{Object.values(Status).map((status, i) => (
							<option value={status === Status.SUCCESS ? 0 : 1} key={i}>
								{status}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="transactionDate">Transaction Date</label>
					<Input
						ref={transactionDateRef}
						value={formData.transactionDate}
						onChange={(e) =>
							setFormData({ ...formData, transactionDate: e.target.value })
						}
						onKeyUp={(e) => e.key === "Enter" && createByRef.current?.focus()}
						id="transactionDate"
						name="transactionDate"
						type="date"
					/>
					{fieldErrors?.transactionDate && (
						<FieldErrortext>{fieldErrors.transactionDate}</FieldErrortext>
					)}
				</div>
				<div>
					<label htmlFor="createBy">Create By</label>
					<Input
						ref={createByRef}
						value={formData.createBy}
						onChange={(e) => setFormData({ ...formData, createBy: e.target.value })}
						id="createBy"
						name="createBy"
					/>
					{fieldErrors?.createBy && (
						<FieldErrortext>{fieldErrors.createBy}</FieldErrortext>
					)}
				</div>
				<div>
					{loading ? (
						<Button className="w-full">Saving...</Button>
					) : (
						<Button onClick={handleSubmit} className="w-full">
							Save
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default EditTransaction

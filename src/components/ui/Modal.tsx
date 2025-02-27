import classNames from "classnames"
import { memo } from "react"

const Modal = ({
	title,
	open,
	setOpen,
	children
}: {
	title: string
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	children: React.ReactNode
}) => {
	if (!open) return null
	return (
		<div
			onClick={() => setOpen(false)}
			className={classNames(
				"fixed inset-0 left-1/2 top-1/2 h-full w-full translate-x-[-50%] translate-y-[-50%] items-center justify-center backdrop-blur-sm",
				{
					hidden: !open,
					flex: open
				}
			)}>
			<div
				className="z-10 flex flex-col gap-5 rounded-md bg-white p-2 shadow-md"
				onClick={(e) => e.stopPropagation()}>
				<div className="flex items-center justify-between gap-5">
					<div>{title}</div>
					<div
						className="cursor-pointer"
						onClick={() => {
							setOpen(false)
						}}>
						x
					</div>
				</div>

				{children}
			</div>
		</div>
	)
}

export default memo(Modal)

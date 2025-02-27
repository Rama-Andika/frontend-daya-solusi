import React, { FC, InputHTMLAttributes } from "react"
import classNames from "classnames"
import { TInputTypes } from "types/input.type"

interface IinputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string
	type?: TInputTypes
	ref?: React.Ref<HTMLInputElement>
}

const Input: FC<IinputProps> = ({ className = "", type = "text", ref = null, ...rest }) => {
	return (
		<input
			ref={ref}
			data-component-input="input"
			className={classNames(
				"h-[38px] w-full ps-2 rounded-md border-2 focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:bg-slate-100",
				className
			)}
			type={type}
			{...rest}
		/>
	)
}

export default React.memo(Input)

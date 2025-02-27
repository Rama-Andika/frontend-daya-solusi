import classNames from "classnames"
import { FC, HTMLAttributes } from "react"

type TVariants = "solid" | "outline"

export interface IButton extends HTMLAttributes<HTMLButtonElement> {
	className?: string
	variant?: TVariants
}
const Button: FC<IButton> = ({ className = undefined, variant = "solid", children, ...rest }) => {
	const variants = {
		solid: classNames("bg-main-color", "text-white"),
		outline: classNames("border border-main-color", "text-main-color")
	}
	return (
		<button
			{...rest}
			className={classNames(
				"flex h-[32.5px] items-center justify-center rounded-md px-3",
				variants[variant],
				className
			)}>
			<span className="text-sm">{children}</span>
		</button>
	)
}

export default Button

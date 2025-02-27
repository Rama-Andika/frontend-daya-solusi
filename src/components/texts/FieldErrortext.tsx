import { ReactNode } from "react"

const FieldErrortext = ({ children }: { children: ReactNode }) => {
	return <p className="text-xs text-red-500">{children}</p>
}

export default FieldErrortext

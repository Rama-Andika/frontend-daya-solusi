import { AxiosError } from "axios"
import { TResponseFailed } from "types/response/failedResponse.type"

const getErrorResponse = (error: AxiosError | undefined): string => {
	let response: TResponseFailed<string | object> | undefined
	if (
		error?.response?.data &&
		typeof error.response.data === "object" &&
		"message" in error.response.data
	) {
		response = error.response.data as TResponseFailed<string | object>
	} else {
		response = undefined
	}
	let messages = ""
	if (response) {
		const { message, errors, requestId } = response
		messages = `${message}${requestId ? `(${requestId})` : ""}`
		if (errors) {
			if (typeof errors === "object") {
				Object.keys(errors).map(
					(key) =>
						(messages +=
							(messages.length > 0 ? ", " : "") +
							(errors as { [key: string]: any })[key])
				)
			} else {
				messages += `, ${errors ?? ""}`
			}
		}

		return messages
	}
	return messages
}

export default getErrorResponse

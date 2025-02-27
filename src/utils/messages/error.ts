type TErrorsMessage =
	| "Please fill in"
	| "You have entered a duplicate data"
	| "You have entered an invalid format"
	| "Data failed to save"
	| "Data failed to delete"
	| "Save failed, please fill in some incomplete data"
	| "Data not found"
	| "Data failed to copy"

export const errorMessage = (message: TErrorsMessage) => {
	return message
}

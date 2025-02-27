export type TResponseFailed<T> = {
	message: string
	errors?: T
	requestId: string
}

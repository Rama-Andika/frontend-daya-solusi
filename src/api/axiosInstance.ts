import axios from "axios"

const url = import.meta.env.VITE_API_URL as string

const axiosInstance = axios.create({
	baseURL: url,
	headers: {
		"Content-Type": "application/json"
	}
})

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error)
	}
)

export default axiosInstance

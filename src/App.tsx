import { Toaster } from "sonner"
import ContentRouter from "./routes/ContentRouter"

function App() {
	return (
		<>
			<Toaster duration={2000} richColors position="top-center" />
			<ContentRouter />
		</>
	)
}

export default App

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
// @ts-ignore
import eslintPlugin from "vite-plugin-eslint"

// https://vite.dev/config/
export default defineConfig({
	server: {
		host: true
	},
	plugins: [react(), eslintPlugin(), tsconfigPaths()]
})

import defaultTheme from "tailwindcss/defaultTheme"
const { heroui } = require("@heroui/theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
		"./node_modules/@heroui/theme/dist/components/(progress|button|skeleton).js"
	],
	theme: {
		extend: {
			colors: {
				"main-color": "#02ce4d",
				"second-color": "#125376DB"
			},
			backgroundColor: {
				"half-transparent": "rgba(0, 0, 0, 0.5)"
			},
			fontFamily: {
				sans: ["Poppins", ...defaultTheme.fontFamily.sans]
			},
			height: {
				"screen-dynamic": "calc(var(--vh, 100vh))"
			}
		}
	},
	plugins: [heroui()]
}

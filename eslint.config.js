import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import eslintPluginPrettier from "eslint-plugin-prettier"
import eslintPluginTailwindCSS from "eslint-plugin-tailwindcss"
import js from "@eslint/js"

export default tseslint.config({
	ignores: ["dist", "node_modules"],
	extends: [js.configs.recommended, ...tseslint.configs.recommended],
	files: ["**/*.{ts,tsx}"],
	languageOptions: {
		ecmaVersion: 2020,
		globals: globals.browser
	},
	plugins: {
		"react-hooks": reactHooks,
		"react-refresh": reactRefresh,
		prettier: eslintPluginPrettier,
		tailwindcss: eslintPluginTailwindCSS
	},
	rules: {
		...reactHooks.configs.recommended.rules,
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"tailwindcss/no-custom-classname": "off",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": [
			"warn",
			{
				additionalHooks: "(useMyCustomHook|useMyOtherCustomHook)"
			}
		],
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }]
	},
	settings: {
		react: {
			version: "detect"
		},
		tailwindcss: {
			callees: ["clsx", "classnames"],
			config: "tailwind.config.js",
			removeDuplicates: true
		}
	}
})

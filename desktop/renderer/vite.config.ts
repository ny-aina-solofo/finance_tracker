import react from "@vitejs/plugin-react";
import * as path from 'path';
import { defineConfig } from "vite";
import tailwind from "@tailwindcss/vite"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwind()
	],
    resolve: {
		alias: {
		  '@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		port : 8080,
	},
});
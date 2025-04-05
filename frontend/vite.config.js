import path from "path";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	server: {
		port: 4000,
		strictPort: true
	},
	resolve: {
		alias: {
			$lib: path.resolve("./src/lib"),
		},
	},
	plugins: [
		sveltekit()
	]
});

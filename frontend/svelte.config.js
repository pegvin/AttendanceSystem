import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({ script: true }),
	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			strict: true,
			fallback: undefined
		}),
		alias: {
			"@incl/*": "src/incl/*"
		}
	}
};

export default config;

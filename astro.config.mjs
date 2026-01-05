// @ts-check

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://webmaka.jp',
	integrations: [
		sitemap({
			filter: (page) =>
				!page.includes('/contact/confirm') && !page.includes('/contact/thanks'),
		}),
	],
	adapter: cloudflare(),
	vite: {
		plugins: [tailwindcss()],
	},
});

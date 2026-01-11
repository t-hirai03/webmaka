// @ts-check

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://webmaka.com',
	integrations: [
		sitemap({
			filter: (page) => !page.includes('/contact/confirm') && !page.includes('/contact/thanks'),
		}),
		icon(),
	],
	adapter: cloudflare(),
	vite: {
		plugins: [tailwindcss()],
	},
});

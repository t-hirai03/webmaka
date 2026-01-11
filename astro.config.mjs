// @ts-check

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
	site: 'https://webmaka.com',
	integrations: [
		sitemap({
			filter: (page) => !page.includes('/contact/confirm') && !page.includes('/contact/thanks'),
		}),
		robotsTxt({
			policy: [
				{
					userAgent: '*',
					allow: '/',
					disallow: ['/contact/confirm', '/contact/thanks'],
				},
			],
		}),
		icon(),
	],
	adapter: cloudflare(),
	vite: {
		plugins: [tailwindcss()],
	},
});

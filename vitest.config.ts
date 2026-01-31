import { getViteConfig } from 'astro/config';

export default getViteConfig({
	test: {
		globals: true,
		include: ['src/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'lcov'],
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.test.ts', 'src/**/*.d.ts', 'src/stories/**'],
		},
	},
} as Parameters<typeof getViteConfig>[0]);

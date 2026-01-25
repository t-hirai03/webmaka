import type { StorybookConfig } from '@storybook/html-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
	stories: ['../src/stories/**/*.stories.@(js|ts)'],
	framework: {
		name: '@storybook/html-vite',
		options: {},
	},
	viteFinal: (config) => {
		config.plugins = config.plugins || [];
		config.plugins.push(tailwindcss());
		return config;
	},
};

export default config;

import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
	stories: ['../src/stories/**/*.stories.@(js|ts)'],
	framework: {
		name: '@storybook/html-vite',
		options: {},
	},
};

export default config;

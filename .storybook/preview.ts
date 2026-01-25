import type { Preview } from '@storybook/html';
import '../src/styles/tailwind.css';

const preview: Preview = {
	decorators: [
		(story) => `<div style="font-family: 'Zen Maru Gothic', sans-serif;">${story()}</div>`,
	],
	parameters: {
		viewport: {
			viewports: {
				mobile1: {
					name: 'Small mobile',
					styles: {
						width: '320px',
						height: '568px',
					},
				},
				mobile2: {
					name: 'Large mobile',
					styles: {
						width: '414px',
						height: '896px',
					},
				},
				tablet: {
					name: 'Tablet',
					styles: {
						width: '768px',
						height: '1024px',
					},
				},
				desktop: {
					name: 'Desktop',
					styles: {
						width: '1280px',
						height: '1024px',
					},
				},
			},
		},
	},
};

export default preview;

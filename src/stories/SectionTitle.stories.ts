import type { Meta, StoryObj } from '@storybook/html';

interface SectionTitleArgs {
	title: string;
	subtitle: string;
	device: 'PC' | 'SP';
}

const createSectionTitle = (args: SectionTitleArgs): string => {
	const width = args.device === 'PC' ? '1280px' : '320px';
	// Storybook用: PC=48px(3rem), SP=36px(2.25rem)を直接指定
	const titleSize = args.device === 'PC' ? 'text-5xl' : 'text-4xl';
	const subtitleSize = args.device === 'PC' ? 'text-lg' : 'text-base';

	return `
		<div style="width: ${width}; margin: 0 auto;">
			<div class="text-center">
				<h2 class="${titleSize} font-bold leading-tight text-text">${args.title}</h2>
				${args.subtitle ? `<p class="mt-1 ${subtitleSize} text-text-muted">${args.subtitle}</p>` : ''}
			</div>
		</div>
	`;
};

const meta: Meta<SectionTitleArgs> = {
	title: 'UI/SectionTitle',
	render: (args) => createSectionTitle(args),
	argTypes: {
		device: {
			control: 'select',
			options: ['PC', 'SP'],
			description: 'デバイス表示切替',
		},
		title: {
			control: 'text',
			description: '英語タイトル',
		},
		subtitle: {
			control: 'text',
			description: '日本語サブタイトル',
		},
	},
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'light',
			values: [{ name: 'light', value: '#F5F0E8' }],
		},
	},
};

export default meta;
type Story = StoryObj<SectionTitleArgs>;

export const Default: Story = {
	args: {
		device: 'PC',
		title: 'Service',
		subtitle: 'サービス内容',
	},
};

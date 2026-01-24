import type { Meta, StoryObj } from '@storybook/html';

interface SectionTitleArgs {
	title: string;
	subtitle: string;
}

const createSectionTitle = (args: SectionTitleArgs): string => {
	return `
		<div class="text-center">
			<h2 class="text-section-title font-bold leading-tight text-text">${args.title}</h2>
			${args.subtitle ? `<p class="mt-1 text-section-subtitle text-text-muted">${args.subtitle}</p>` : ''}
		</div>
	`;
};

const meta: Meta<SectionTitleArgs> = {
	title: 'UI/SectionTitle',
	render: (args) => createSectionTitle(args),
	argTypes: {
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
		title: 'Service',
		subtitle: 'サービス内容',
	},
};

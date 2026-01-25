import type { Meta, StoryObj } from '@storybook/html';

interface FlowCardArgs {
	stepNumber: number;
	icon: 'mail' | 'hearing' | 'check' | 'delivery';
	title: string;
	description: string;
	linkText?: string;
	linkHref?: string;
}

const iconPaths: Record<FlowCardArgs['icon'], string> = {
	mail: '/src/assets/icons/flow-mail.png',
	hearing: '/src/assets/icons/flow-hearing.png',
	check: '/src/assets/icons/flow-check.png',
	delivery: '/src/assets/icons/flow-delivery.png',
};

const createFlowCard = (args: FlowCardArgs): string => {
	const iconSrc = iconPaths[args.icon];

	const linkHtml =
		args.linkText && args.linkHref
			? `<a href="${args.linkHref}" style="font-weight: 700; color: #3D8B6E; text-decoration: underline; text-underline-offset: 2px;">${args.linkText}</a>`
			: '';

	const descriptionHtml = args.description.replace('{link}', linkHtml);

	return `
		<div style="width: 300px;">
			<article style="display: flex; flex-direction: column; align-items: center; gap: 26px; padding: 16px 24px 24px; background: #fff; border-radius: 16px; box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.16);">
				<!-- Step Badge -->
				<span style="display: inline-block; padding: 5px 16px 4px; background: #3D8B6E; border-radius: 6px; font-size: 24px; font-weight: 500; color: #fff;">
					STEP${args.stepNumber}
				</span>

				<!-- Card Contents -->
				<div style="display: flex; flex-direction: column; align-items: center; gap: 32px;">
					<!-- Icon -->
					<div style="display: flex; align-items: center; justify-content: center; height: 105px;">
						<img src="${iconSrc}" alt="" style="max-height: 105px; width: auto;" />
					</div>

					<!-- Text Area -->
					<div style="display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; width: 252px;">
						<h3 style="margin: 0; font-size: 20px; font-weight: 700; color: #3D8B6E; line-height: 29.25px;">${args.title}</h3>
						<p style="margin: 0; font-size: 14px; line-height: 24px; color: #6B7280;">${descriptionHtml}</p>
					</div>
				</div>
			</article>
		</div>
	`;
};

const meta: Meta<FlowCardArgs> = {
	title: 'UI/FlowCard',
	render: (args) => createFlowCard(args),
	argTypes: {
		stepNumber: {
			control: { type: 'number', min: 1, max: 10 },
			description: 'ステップ番号',
		},
		icon: {
			control: 'select',
			options: ['mail', 'hearing', 'check', 'delivery'],
			description: 'アイコンの種類',
		},
		title: {
			control: 'text',
			description: 'カードタイトル',
		},
		description: {
			control: 'text',
			description: '説明文（{link}でリンク挿入位置を指定）',
		},
		linkText: {
			control: 'text',
			description: 'リンクテキスト',
		},
		linkHref: {
			control: 'text',
			description: 'リンク先URL',
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
type Story = StoryObj<FlowCardArgs>;

export const Default: Story = {
	args: {
		stepNumber: 1,
		icon: 'mail',
		title: 'お問い合わせ',
		description: '{link}からご連絡ください。',
		linkText: 'フォーム',
		linkHref: '/contact/',
	},
};

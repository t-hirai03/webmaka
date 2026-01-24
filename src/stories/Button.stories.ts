import type { Meta, StoryObj } from '@storybook/html';

interface ButtonArgs {
	variant: 'primary' | 'secondary' | 'ghost' | 'cta' | 'confirm';
	size: 'sm' | 'md' | 'lg';
	label: string;
	disabled: boolean;
	icon: 'mail' | 'none';
}

const variantClasses: Record<ButtonArgs['variant'], string> = {
	primary:
		'bg-primary text-white hover:bg-primary-dark focus:ring-primary disabled:hover:bg-primary',
	secondary: 'bg-accent text-white hover:bg-accent-dark focus:ring-accent disabled:hover:bg-accent',
	ghost: 'bg-gray-200 text-text hover:bg-gray-300 focus:ring-gray-400 disabled:hover:bg-gray-200',
	cta: 'bg-cta text-white hover:bg-cta-dark focus:ring-cta shadow-button',
	confirm:
		'bg-confirm text-white hover:bg-confirm-dark focus:ring-confirm shadow-button border-2 border-confirm-border',
};

const sizeClasses: Record<ButtonArgs['size'], string> = {
	sm: 'px-4 py-2 text-sm',
	md: 'px-6 py-3 text-base',
	lg: 'px-8 py-4 text-lg',
};

const mailIconSvg = `
	<svg class="mr-2 size-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
		<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
		<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
	</svg>
`;

const createButton = (args: ButtonArgs): string => {
	const baseClasses =
		'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
	const disabledClasses = args.disabled ? 'opacity-50 cursor-not-allowed' : '';

	const classes = [
		baseClasses,
		variantClasses[args.variant],
		sizeClasses[args.size],
		disabledClasses,
	]
		.filter(Boolean)
		.join(' ');

	const iconHtml = args.icon === 'mail' ? mailIconSvg : '';

	return `
		<button
			type="button"
			class="${classes}"
			${args.disabled ? 'disabled' : ''}
		>
			${iconHtml}${args.label}
		</button>
	`;
};

const meta: Meta<ButtonArgs> = {
	title: 'UI/Button',
	render: (args) => createButton(args),
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'ghost', 'cta', 'confirm'],
			description: 'ボタンのスタイルバリエーション',
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'ボタンのサイズ',
		},
		label: {
			control: 'text',
			description: 'ボタンのテキスト',
		},
		disabled: {
			control: 'boolean',
			description: '無効状態',
		},
		icon: {
			control: 'select',
			options: ['none', 'mail'],
			description: 'アイコン',
		},
	},
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'light',
			values: [
				{ name: 'light', value: '#F5F0E8' },
				{ name: 'white', value: '#FFFFFF' },
			],
		},
	},
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Default: Story = {
	args: {
		variant: 'primary',
		size: 'md',
		label: 'ボタン',
		disabled: false,
		icon: 'none',
	},
};

export const CTA: Story = {
	args: {
		variant: 'cta',
		size: 'lg',
		label: 'お問い合わせはこちら',
		disabled: false,
		icon: 'mail',
	},
};

export const Confirm: Story = {
	args: {
		variant: 'confirm',
		size: 'md',
		label: '確認する',
		disabled: false,
		icon: 'none',
	},
};

import type { Meta, StoryObj } from '@storybook/html';

interface ButtonArgs {
	label: string;
	variant: 'primary' | 'secondary' | 'ghost';
	size: 'sm' | 'md' | 'lg';
	disabled: boolean;
}

const baseClasses =
	'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

const variantClasses = {
	primary:
		'bg-primary text-white hover:bg-primary-dark focus:ring-primary disabled:hover:bg-primary',
	secondary: 'bg-accent text-white hover:bg-accent-dark focus:ring-accent disabled:hover:bg-accent',
	ghost: 'bg-gray-200 text-text hover:bg-gray-300 focus:ring-gray-400 disabled:hover:bg-gray-200',
};

const sizeClasses = {
	sm: 'px-4 py-2 text-sm',
	md: 'px-6 py-3 text-base',
	lg: 'px-8 py-4 text-lg',
};

const createButton = (args: ButtonArgs): string => {
	const disabledClasses = args.disabled ? 'opacity-50 cursor-not-allowed' : '';
	const classes = [
		baseClasses,
		variantClasses[args.variant],
		sizeClasses[args.size],
		disabledClasses,
	]
		.filter(Boolean)
		.join(' ');

	return `<button type="button" class="${classes}" ${args.disabled ? 'disabled' : ''}>${args.label}</button>`;
};

const meta: Meta<ButtonArgs> = {
	title: 'UI/Button',
	render: (args) => createButton(args),
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'ghost'],
			description: 'ボタンのスタイル',
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'ボタンのサイズ',
		},
		disabled: {
			control: 'boolean',
			description: '無効状態',
		},
		label: {
			control: 'text',
			description: 'ボタンのテキスト',
		},
	},
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {
	args: {
		label: 'Primary Button',
		variant: 'primary',
		size: 'md',
		disabled: false,
	},
};

export const Secondary: Story = {
	args: {
		label: 'Secondary Button',
		variant: 'secondary',
		size: 'md',
		disabled: false,
	},
};

export const Ghost: Story = {
	args: {
		label: 'Ghost Button',
		variant: 'ghost',
		size: 'md',
		disabled: false,
	},
};

export const Small: Story = {
	args: {
		label: 'Small Button',
		variant: 'primary',
		size: 'sm',
		disabled: false,
	},
};

export const Large: Story = {
	args: {
		label: 'Large Button',
		variant: 'primary',
		size: 'lg',
		disabled: false,
	},
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Button',
		variant: 'primary',
		size: 'md',
		disabled: true,
	},
};

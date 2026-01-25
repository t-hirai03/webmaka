import type { Meta, StoryObj } from '@storybook/html';

interface InputArgs {
	type: 'text' | 'email' | 'tel';
	name: string;
	placeholder: string;
	required: boolean;
	disabled: boolean;
	value: string;
	hasError: boolean;
}

const createInput = (args: InputArgs): string => {
	const baseClasses =
		'w-full bg-white rounded-lg px-4 py-3 text-text border focus:ring-2 focus:ring-accent focus:border-transparent focus:outline-none transition-colors duration-200';
	const borderClass = args.hasError ? 'border-red-500' : 'border-gray-300';
	const disabledClasses = args.disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : '';

	const classes = [baseClasses, borderClass, disabledClasses].filter(Boolean).join(' ');

	return `
		<div class="w-80">
			<input
				type="${args.type}"
				name="${args.name}"
				id="${args.name}"
				placeholder="${args.placeholder}"
				${args.required ? 'required' : ''}
				${args.disabled ? 'disabled' : ''}
				${args.hasError ? 'aria-invalid="true"' : ''}
				value="${args.value}"
				class="${classes}"
			/>
			${args.hasError ? '<span class="text-sm text-red-600 mt-1 block">エラーメッセージ</span>' : ''}
		</div>
	`;
};

const meta: Meta<InputArgs> = {
	title: 'Form/Input',
	render: (args) => createInput(args),
	argTypes: {
		type: {
			control: 'select',
			options: ['text', 'email', 'tel'],
			description: '入力タイプ',
		},
		name: {
			control: 'text',
			description: 'フィールド名',
		},
		placeholder: {
			control: 'text',
			description: 'プレースホルダー',
		},
		required: {
			control: 'boolean',
			description: '必須フィールド',
		},
		disabled: {
			control: 'boolean',
			description: '無効状態',
		},
		value: {
			control: 'text',
			description: '入力値',
		},
		hasError: {
			control: 'boolean',
			description: 'エラー状態',
		},
	},
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'section',
			values: [
				{ name: 'section', value: '#F5F0E8' },
				{ name: 'white', value: '#FFFFFF' },
			],
		},
	},
};

export default meta;
type Story = StoryObj<InputArgs>;

export const Default: Story = {
	args: {
		type: 'text',
		name: 'name',
		placeholder: '山田 太郎',
		required: false,
		disabled: false,
		value: '',
		hasError: false,
	},
};

export const Email: Story = {
	args: {
		type: 'email',
		name: 'email',
		placeholder: 'example@example.com',
		required: true,
		disabled: false,
		value: '',
		hasError: false,
	},
};

export const Tel: Story = {
	args: {
		type: 'tel',
		name: 'phone',
		placeholder: '090-1234-5678',
		required: false,
		disabled: false,
		value: '',
		hasError: false,
	},
};

export const Filled: Story = {
	args: {
		type: 'text',
		name: 'name',
		placeholder: '山田 太郎',
		required: false,
		disabled: false,
		value: '山田 太郎',
		hasError: false,
	},
};

export const ErrorState: Story = {
	args: {
		type: 'email',
		name: 'email',
		placeholder: 'example@example.com',
		required: true,
		disabled: false,
		value: 'invalid-email',
		hasError: true,
	},
};

export const Disabled: Story = {
	args: {
		type: 'text',
		name: 'name',
		placeholder: '山田 太郎',
		required: false,
		disabled: true,
		value: '',
		hasError: false,
	},
};

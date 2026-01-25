import type { Meta, StoryObj } from '@storybook/html';

interface TextareaArgs {
	name: string;
	placeholder: string;
	rows: number;
	required: boolean;
	disabled: boolean;
	value: string;
	hasError: boolean;
}

const createTextarea = (args: TextareaArgs): string => {
	const baseClasses =
		'w-full bg-white rounded-lg px-4 py-3 text-text border focus:ring-2 focus:ring-accent focus:border-transparent focus:outline-none transition-colors duration-200 resize-none';
	const borderClass = args.hasError ? 'border-red-500' : 'border-gray-300';
	const disabledClasses = args.disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : '';

	const classes = [baseClasses, borderClass, disabledClasses].filter(Boolean).join(' ');

	return `
		<div class="w-80">
			<textarea
				name="${args.name}"
				id="${args.name}"
				placeholder="${args.placeholder}"
				rows="${args.rows}"
				${args.required ? 'required' : ''}
				${args.disabled ? 'disabled' : ''}
				${args.hasError ? 'aria-invalid="true"' : ''}
				class="${classes}"
			>${args.value}</textarea>
			${args.hasError ? '<span class="text-sm text-red-600 mt-1 block">エラーメッセージ</span>' : ''}
		</div>
	`;
};

const meta: Meta<TextareaArgs> = {
	title: 'Form/Textarea',
	render: (args) => createTextarea(args),
	argTypes: {
		name: {
			control: 'text',
			description: 'フィールド名',
		},
		placeholder: {
			control: 'text',
			description: 'プレースホルダー',
		},
		rows: {
			control: { type: 'number', min: 2, max: 10 },
			description: '行数',
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
type Story = StoryObj<TextareaArgs>;

export const Default: Story = {
	args: {
		name: 'message',
		placeholder: 'お問い合わせ内容を入力してください',
		rows: 5,
		required: false,
		disabled: false,
		value: '',
		hasError: false,
	},
};

export const Required: Story = {
	args: {
		name: 'message',
		placeholder: 'お問い合わせ内容を入力してください',
		rows: 5,
		required: true,
		disabled: false,
		value: '',
		hasError: false,
	},
};

export const Filled: Story = {
	args: {
		name: 'message',
		placeholder: 'お問い合わせ内容を入力してください',
		rows: 5,
		required: false,
		disabled: false,
		value:
			'Webサイト制作についてお問い合わせいたします。\n\n具体的には、コーポレートサイトのリニューアルを検討しております。',
		hasError: false,
	},
};

export const ErrorState: Story = {
	args: {
		name: 'message',
		placeholder: 'お問い合わせ内容を入力してください',
		rows: 5,
		required: true,
		disabled: false,
		value: '',
		hasError: true,
	},
};

export const Disabled: Story = {
	args: {
		name: 'message',
		placeholder: 'お問い合わせ内容を入力してください',
		rows: 5,
		required: false,
		disabled: true,
		value: '',
		hasError: false,
	},
};

export const SmallRows: Story = {
	args: {
		name: 'message',
		placeholder: 'お問い合わせ内容を入力してください',
		rows: 3,
		required: false,
		disabled: false,
		value: '',
		hasError: false,
	},
};

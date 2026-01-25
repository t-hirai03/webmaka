import type { Meta, StoryObj } from '@storybook/html';

interface SelectArgs {
	name: string;
	disabled: boolean;
	hasError: boolean;
	selectedValue: string;
}

const arrowIcon = `<svg class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,9 12,15 18,9"></polyline></svg>`;

const createSelect = (args: SelectArgs): string => {
	const baseClasses =
		'w-full bg-white rounded-lg px-4 py-3 pr-12 text-text border focus:ring-2 focus:ring-accent focus:border-transparent focus:outline-none transition-colors duration-200 appearance-none cursor-pointer';
	const borderClass = args.hasError ? 'border-red-500' : 'border-gray-300';
	const disabledClasses = args.disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : '';

	const classes = [baseClasses, borderClass, disabledClasses].filter(Boolean).join(' ');

	const options = [
		{ value: '', label: '選択してください' },
		{ value: 'Webサイト制作', label: 'Webサイト制作' },
		{ value: 'LP制作', label: 'LP制作' },
		{ value: 'CMS導入・移行', label: 'CMS導入・移行' },
		{ value: 'コーディング代行', label: 'コーディング代行' },
		{ value: 'その他', label: 'その他' },
	];

	const optionsHtml = options
		.map(
			(opt) =>
				`<option value="${opt.value}" ${args.selectedValue === opt.value ? 'selected' : ''}>${opt.label}</option>`,
		)
		.join('');

	return `
		<div class="w-80">
			<div class="relative">
				<select
					name="${args.name}"
					id="${args.name}"
					${args.disabled ? 'disabled' : ''}
					${args.hasError ? 'aria-invalid="true"' : ''}
					class="${classes}"
				>
					${optionsHtml}
				</select>
				${arrowIcon}
			</div>
			${args.hasError ? '<span class="text-sm text-red-600 mt-1 block">選択してください。</span>' : ''}
		</div>
	`;
};

const meta: Meta<SelectArgs> = {
	title: 'Form/Select',
	render: (args) => createSelect(args),
	argTypes: {
		name: {
			control: 'text',
			description: 'フィールド名',
		},
		disabled: {
			control: 'boolean',
			description: '無効状態',
		},
		hasError: {
			control: 'boolean',
			description: 'エラー状態',
		},
		selectedValue: {
			control: 'select',
			options: ['', 'Webサイト制作', 'LP制作', 'CMS導入・移行', 'コーディング代行', 'その他'],
			description: '選択値',
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
type Story = StoryObj<SelectArgs>;

export const Default: Story = {
	args: {
		name: 'inquiry-type',
		disabled: false,
		hasError: false,
		selectedValue: '',
	},
};

export const Selected: Story = {
	args: {
		name: 'inquiry-type',
		disabled: false,
		hasError: false,
		selectedValue: 'Webサイト制作',
	},
};

export const ErrorState: Story = {
	args: {
		name: 'inquiry-type',
		disabled: false,
		hasError: true,
		selectedValue: '',
	},
};

export const Disabled: Story = {
	args: {
		name: 'inquiry-type',
		disabled: true,
		hasError: false,
		selectedValue: 'LP制作',
	},
};

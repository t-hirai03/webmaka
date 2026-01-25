import type { Meta, StoryObj } from '@storybook/html';

interface ContactProgressArgs {
	currentStep: 1 | 2 | 3;
}

const stepLabels = ['ご入力', 'ご確認', '完了'];

// SVGパス定義
const svgPaths = {
	// 最初のステップ（左角丸、右矢印）
	first: `
		<path d="M0 8C0 3.58172 3.58172 0 8 0H192V50H8C3.58173 50 0 46.4183 0 42V8Z" fill="currentColor"/>
		<path d="M204 25L192 50V0L204 25Z" fill="currentColor"/>
	`,
	// 中間ステップ（直線左、右矢印）
	middle: `
		<path d="M0 0H192V50H0V0Z" fill="currentColor"/>
		<path d="M204 25L192 50V0L204 25Z" fill="currentColor"/>
	`,
	// 最終ステップ（左矢印切り込み、右角丸）
	last: `
		<path d="M183 0C187.418 2.06162e-06 191 3.58172 191 8V42C191 46.4183 187.418 50 183 50H0L12 25L0 0H183Z" fill="currentColor"/>
	`,
};

const createStep = (
	_index: number,
	label: string,
	isActive: boolean,
	position: 'first' | 'middle' | 'last',
): string => {
	const bgColorClass = isActive ? 'text-primary' : 'text-grey-91';
	const textColorClass = isActive ? 'text-white' : 'text-text';

	const widths = {
		first: 'w-[204px]',
		middle: 'w-[204px]',
		last: 'w-[191px]',
	};

	// Figmaレイアウトに合わせた重なり（矢印部分12px）
	const margins = {
		first: '',
		middle: '-ml-3',
		last: '-ml-3',
	};

	// 前のステップの矢印が上に来るようにz-indexを設定
	const zIndex = {
		first: 'z-30',
		middle: 'z-20',
		last: 'z-10',
	};

	const viewBox = position === 'last' ? '0 0 191 50' : '0 0 204 50';

	return `
		<div class="relative ${widths[position]} ${margins[position]} ${zIndex[position]} h-[50px] ${bgColorClass}">
			<svg
				class="absolute inset-0 size-full"
				viewBox="${viewBox}"
				fill="none"
				preserveAspectRatio="none"
				aria-hidden="true"
			>
				${svgPaths[position]}
			</svg>
			<span class="absolute inset-0 flex items-center justify-center text-lg font-medium ${textColorClass}">
				${label}
			</span>
		</div>
	`;
};

const createContactProgress = (args: ContactProgressArgs): string => {
	const steps = stepLabels.map((label, index) => {
		const stepNumber = index + 1;
		const isActive = stepNumber <= args.currentStep;
		const position: 'first' | 'middle' | 'last' =
			index === 0 ? 'first' : index === stepLabels.length - 1 ? 'last' : 'middle';

		return createStep(index, label, isActive, position);
	});

	return `
		<nav aria-label="お問い合わせ進捗" class="rounded-lg bg-grey-91">
			<ol class="flex" role="list">
				${steps.map((step, i) => `<li class="relative" aria-current="${i + 1 === args.currentStep ? 'step' : 'false'}">${step}</li>`).join('')}
			</ol>
		</nav>
	`;
};

const meta: Meta<ContactProgressArgs> = {
	title: 'Form/ContactProgress',
	render: (args) => createContactProgress(args),
	argTypes: {
		currentStep: {
			control: { type: 'range', min: 1, max: 3, step: 1 },
			description: '現在のステップ（1: 入力, 2: 確認, 3: 完了）',
		},
	},
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'white',
			values: [
				{ name: 'white', value: '#FFFFFF' },
				{ name: 'light', value: '#F5F0E8' },
			],
		},
	},
};

export default meta;
type Story = StoryObj<ContactProgressArgs>;

export const Step1Input: Story = {
	name: 'ステップ1: ご入力',
	args: {
		currentStep: 1,
	},
};

export const Step2Confirm: Story = {
	name: 'ステップ2: ご確認',
	args: {
		currentStep: 2,
	},
};

export const Step3Complete: Story = {
	name: 'ステップ3: 完了',
	args: {
		currentStep: 3,
	},
};

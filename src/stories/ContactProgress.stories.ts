import type { Meta, StoryObj } from '@storybook/html';

interface ContactProgressArgs {
	currentStep: 1 | 2 | 3;
}

const stepLabels = ['ご入力', 'ご確認', '完了'];

const createContactProgress = (args: ContactProgressArgs): string => {
	const steps = stepLabels.map((label, index) => {
		const stepNumber = index + 1;
		const isActive = stepNumber <= args.currentStep;
		const activeClass = isActive ? ' active' : '';

		return `<li class="item${activeClass}"><span class="font-medium">STEP.${stepNumber}</span><br>${label}</li>`;
	});

	return `
		<nav aria-label="お問い合わせ進捗" class="w-[600px]">
			<ol class="progressbar">
				${steps.join('')}
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

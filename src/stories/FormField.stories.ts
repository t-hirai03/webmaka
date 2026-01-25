import type { Meta, StoryObj } from '@storybook/html';

interface FormFieldArgs {
  label: string;
  name: string;
  required: boolean;
  inputType: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder: string;
  hasError: boolean;
  errorMessage: string;
}

const createInput = (args: FormFieldArgs): string => {
  const baseClasses =
    'w-full bg-white rounded-lg px-4 py-3 text-text border focus:ring-2 focus:ring-accent focus:border-transparent focus:outline-none transition-colors duration-200';
  const borderClass = args.hasError ? 'border-red-500' : 'border-gray-300';
  const classes = [baseClasses, borderClass].filter(Boolean).join(' ');

  switch (args.inputType) {
    case 'textarea':
      return `<textarea name="${args.name}" id="${args.name}" placeholder="${args.placeholder}" rows="5" ${args.required ? 'required' : ''} ${args.hasError ? 'aria-invalid="true"' : ''} class="${classes} resize-none"></textarea>`;
    case 'select':
      return `<select name="${args.name}" id="${args.name}" ${args.required ? 'required' : ''} class="${classes}">
				<option value="">選択してください</option>
				<option value="website">Webサイト制作</option>
				<option value="lp">LP制作</option>
				<option value="other">その他</option>
			</select>`;
    default:
      return `<input type="${args.inputType}" name="${args.name}" id="${args.name}" placeholder="${args.placeholder}" ${args.required ? 'required' : ''} ${args.hasError ? 'aria-invalid="true"' : ''} class="${classes}" />`;
  }
};

const createFormField = (args: FormFieldArgs): string => {
  const inputHtml = createInput(args);
  const errorHtml = args.hasError
    ? `<span class="text-sm text-red-600 block" role="alert">${args.errorMessage}</span>`
    : '';

  return `
		<div class="w-80 form-field space-y-2">
			<label for="${args.name}" class="block text-sm font-medium text-text">
				${args.label}
				${args.required ? '<span class="text-red-500 ml-1">*</span>' : ''}
			</label>
			${inputHtml}
			${errorHtml}
		</div>
	`;
};

const meta: Meta<FormFieldArgs> = {
  title: 'Form/FormField',
  render: (args) => createFormField(args),
  argTypes: {
    label: {
      control: 'text',
      description: 'ラベルテキスト',
    },
    name: {
      control: 'text',
      description: 'フィールド名',
    },
    required: {
      control: 'boolean',
      description: '必須フィールド',
    },
    inputType: {
      control: 'select',
      options: ['text', 'email', 'tel', 'textarea', 'select'],
      description: '入力タイプ',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダー',
    },
    hasError: {
      control: 'boolean',
      description: 'エラー状態',
    },
    errorMessage: {
      control: 'text',
      description: 'エラーメッセージ',
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
type Story = StoryObj<FormFieldArgs>;

export const TextInput: Story = {
  args: {
    label: '氏名',
    name: 'name',
    required: true,
    inputType: 'text',
    placeholder: '山田 太郎',
    hasError: true,
    errorMessage: 'aaaaa',
  },
};

export const EmailInput: Story = {
  args: {
    label: 'メールアドレス',
    name: 'email',
    required: true,
    inputType: 'email',
    placeholder: 'example@example.com',
    hasError: false,
    errorMessage: '',
  },
};

export const TelInput: Story = {
  args: {
    label: 'お電話番号',
    name: 'phone',
    required: false,
    inputType: 'tel',
    placeholder: '090-1234-5678',
    hasError: false,
    errorMessage: '',
  },
};

export const TextareaField: Story = {
  args: {
    label: 'お問い合わせ内容',
    name: 'message',
    required: true,
    inputType: 'textarea',
    placeholder: 'お問い合わせ内容を入力してください',
    hasError: false,
    errorMessage: '',
  },
};

export const SelectField: Story = {
  args: {
    label: 'お問い合わせ種別',
    name: 'inquiry-type',
    required: false,
    inputType: 'select',
    placeholder: '',
    hasError: false,
    errorMessage: '',
  },
};

export const WithError: Story = {
  args: {
    label: 'メールアドレス',
    name: 'email',
    required: true,
    inputType: 'email',
    placeholder: 'example@example.com',
    hasError: true,
    errorMessage: '正しいメールアドレスを入力してください。',
  },
};

export const Optional: Story = {
  args: {
    label: 'お電話番号',
    name: 'phone',
    required: false,
    inputType: 'tel',
    placeholder: '090-1234-5678',
    hasError: false,
    errorMessage: '',
  },
};

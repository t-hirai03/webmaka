import type { Meta, StoryObj } from '@storybook/html';

interface ColorSwatchArgs {
	category: 'all' | 'brand' | 'neutral' | 'utility';
}

interface ColorItem {
	name: string;
	figmaName: string;
	value: string;
	rgb: string;
	tailwindClass?: string;
}

interface ColorCategory {
	title: string;
	description: string;
	colors: ColorItem[];
}

const colorData: ColorCategory[] = [
	{
		title: 'ブランドカラー',
		description: 'サイトのメインカラーとアクセントカラー',
		colors: [
			{
				name: 'Primary',
				figmaName: 'Viridian',
				value: '#3D8B6E',
				rgb: 'rgb(61, 139, 110)',
				tailwindClass: 'bg-primary',
			},
			{
				name: 'Primary 10%',
				figmaName: 'Viridian 10%',
				value: '#3D8B6E1a',
				rgb: 'rgba(61, 139, 110, 0.1)',
				tailwindClass: 'bg-primary-10',
			},
			{
				name: 'Accent',
				figmaName: 'Tacao',
				value: '#E8A87C',
				rgb: 'rgb(232, 168, 124)',
				tailwindClass: 'bg-accent',
			},
		],
	},
	{
		title: '背景色',
		description: 'ページやセクションの背景に使用',
		colors: [
			{
				name: 'Background',
				figmaName: 'Dawn Pink / Merino',
				value: '#F5F0E8',
				rgb: 'rgb(245, 240, 232)',
				tailwindClass: 'bg-bg-section',
			},
			{
				name: 'White',
				figmaName: 'White',
				value: '#FFFFFF',
				rgb: 'rgb(255, 255, 255)',
				tailwindClass: 'bg-white',
			},
			{
				name: 'White 70%',
				figmaName: 'White 70%',
				value: '#FFFFFFb3',
				rgb: 'rgba(255, 255, 255, 0.7)',
				tailwindClass: 'bg-white-70',
			},
		],
	},
	{
		title: 'テキスト・ニュートラル',
		description: 'テキストやボーダーに使用するグレー系カラー',
		colors: [
			{
				name: 'Text',
				figmaName: 'Oxford Blue',
				value: '#374151',
				rgb: 'rgb(55, 65, 81)',
				tailwindClass: 'text-text',
			},
			{
				name: 'Text Muted',
				figmaName: 'Pale Sky',
				value: '#6B7280',
				rgb: 'rgb(107, 114, 128)',
				tailwindClass: 'text-text-muted',
			},
			{
				name: 'Border',
				figmaName: 'Athens Gray',
				value: '#E5E7EB',
				rgb: 'rgb(229, 231, 235)',
				tailwindClass: 'border-gray-200',
			},
			{
				name: 'Background Light',
				figmaName: 'Athens Gray',
				value: '#F3F4F6',
				rgb: 'rgb(243, 244, 246)',
				tailwindClass: 'bg-gray-100',
			},
		],
	},
	{
		title: 'ユーティリティ',
		description: 'エラーや警告などの状態表示用',
		colors: [
			{
				name: 'Error',
				figmaName: 'Alizarin Crimson',
				value: '#DC2626',
				rgb: 'rgb(220, 38, 38)',
				tailwindClass: 'text-red-600',
			},
		],
	},
];

const createColorSwatch = (color: ColorItem): string => {
	const isTransparent = color.value.length > 7;
	const checkerboardBg = isTransparent
		? 'background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%); background-size: 10px 10px; background-position: 0 0, 0 5px, 5px -5px, -5px 0px;'
		: '';

	return `
		<div style="display: flex; align-items: center; gap: 16px; padding: 16px 0; border-bottom: 1px solid #f3f4f6;">
			<div style="position: relative; width: 72px; height: 72px; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; ${checkerboardBg}">
				<div style="position: absolute; inset: 0; background-color: ${color.value};"></div>
			</div>
			<div style="flex: 1; min-width: 0;">
				<p style="margin: 0 0 4px 0; font-weight: 600; font-size: 14px; color: #374151;">${color.name}</p>
				<p style="margin: 0 0 6px 0; font-size: 12px; color: #9ca3af;">Figma: ${color.figmaName}</p>
				<div style="display: flex; flex-wrap: wrap; gap: 8px; font-size: 12px; font-family: ui-monospace, monospace;">
					<span style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px; color: #374151;">${color.value}</span>
					<span style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px; color: #6b7280;">${color.rgb}</span>
					${color.tailwindClass && color.tailwindClass !== '-' ? `<span style="background: #ecfdf5; padding: 2px 8px; border-radius: 4px; color: #059669;">${color.tailwindClass}</span>` : ''}
				</div>
			</div>
		</div>
	`;
};

const createColorCategory = (category: ColorCategory): string => {
	const swatches = category.colors.map((color) => createColorSwatch(color)).join('');

	return `
		<div style="margin-bottom: 40px;">
			<h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #374151;">
				${category.title}
			</h3>
			<p style="margin: 0 0 16px 0; font-size: 13px; color: #6b7280;">
				${category.description}
			</p>
			<div style="background: white; border-radius: 12px; padding: 8px 16px; border: 1px solid #e5e7eb;">
				${swatches}
			</div>
		</div>
	`;
};

const createColorPalette = (args: ColorSwatchArgs): string => {
	let categories = colorData;

	if (args.category !== 'all') {
		const categoryMap: Record<string, string> = {
			brand: 'ブランドカラー',
			neutral: 'テキスト・ニュートラル',
			utility: 'ユーティリティ',
		};
		if (args.category === 'brand') {
			categories = colorData.filter(
				(cat) => cat.title === 'ブランドカラー' || cat.title === '背景色',
			);
		} else {
			categories = colorData.filter((cat) => cat.title === categoryMap[args.category]);
		}
	}

	const content = categories.map((cat) => createColorCategory(cat)).join('');

	return `
		<div style="padding: 32px; max-width: 640px; font-family: system-ui, -apple-system, sans-serif; background: #fafafa; min-height: 100vh;">
			<h2 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #374151;">
				カラーパレット
			</h2>
			<p style="margin: 0 0 32px 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
				Figmaで定義されたプロジェクトのカラー一覧です。
			</p>
			${content}
		</div>
	`;
};

const meta: Meta<ColorSwatchArgs> = {
	title: 'Design Tokens/Colors',
	render: (args) => createColorPalette(args),
	argTypes: {
		category: {
			control: 'select',
			options: ['all', 'brand', 'neutral', 'utility'],
			description: '表示するカラーカテゴリ',
		},
	},
	parameters: {
		layout: 'fullscreen',
		backgrounds: {
			default: 'light',
		},
	},
};

export default meta;
type Story = StoryObj<ColorSwatchArgs>;

export const All: Story = {
	args: {
		category: 'all',
	},
};

export const Brand: Story = {
	args: {
		category: 'brand',
	},
};

export const Neutral: Story = {
	args: {
		category: 'neutral',
	},
};

export const Utility: Story = {
	args: {
		category: 'utility',
	},
};

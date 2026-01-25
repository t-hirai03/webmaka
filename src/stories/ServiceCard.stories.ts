import type { Meta, StoryObj } from '@storybook/html';

interface ServiceCardArgs {
	device: 'PC' | 'SP';
	label: string;
	pageCount: string;
	priceNumber: string;
	priceUnit: string;
	tagline: string;
	description: string;
	tags: string[];
}

const createServiceCard = (args: ServiceCardArgs): string => {
	const width = args.device === 'PC' ? '320px' : '280px';

	const tagsHtml = args.tags
		.map(
			(tag) =>
				`<span class="rounded border border-grey-91 bg-tag-service px-3 py-1 text-sm text-text-muted">${tag}</span>`,
		)
		.join('\n');

	return `
		<div style="width: ${width};">
			<article class="w-full overflow-hidden rounded-xl bg-white shadow-md">
				<div class="bg-primary px-6 py-3 text-center">
					<span class="text-lg font-bold text-white">${args.label}</span>
				</div>
				<div class="p-6">
					<div class="mb-4 text-center">
						<p class="text-sm text-text-muted">${args.pageCount}</p>
						<p>
							<span class="text-5xl font-bold text-primary">${args.priceNumber}</span>
							<span class="text-xl text-text">${args.priceUnit}</span>
						</p>
						<p class="mt-2 font-bold text-text">${args.tagline}</p>
					</div>
					<hr class="mb-4 border-gray-200" />
					<p class="mb-6 text-sm-plus leading-relaxed-plus text-text-muted">${args.description}</p>
					<div class="flex flex-wrap gap-2">
						${tagsHtml}
					</div>
				</div>
			</article>
		</div>
	`;
};

const meta: Meta<ServiceCardArgs> = {
	title: 'UI/ServiceCard',
	render: (args) => createServiceCard(args),
	argTypes: {
		device: {
			control: 'select',
			options: ['PC', 'SP'],
			description: 'デバイス表示切替',
		},
		label: {
			control: 'text',
			description: 'サービス名（ヘッダー部分）',
		},
		pageCount: {
			control: 'text',
			description: 'ページ数目安',
		},
		priceNumber: {
			control: 'text',
			description: '価格の数字部分',
		},
		priceUnit: {
			control: 'text',
			description: '価格の単位部分',
		},
		tagline: {
			control: 'text',
			description: 'キャッチコピー',
		},
		description: {
			control: 'text',
			description: 'サービス説明文',
		},
		tags: {
			control: 'object',
			description: '技術タグ',
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
type Story = StoryObj<ServiceCardArgs>;

export const Default: Story = {
	args: {
		device: 'PC',
		label: 'Webサイト制作',
		pageCount: '5ページ目安',
		priceNumber: '15',
		priceUnit: '万円〜',
		tagline: 'デザインからコーディングまで一貫対応',
		description:
			'デザイナーと連携し、企画・デザイン・実装まで窓口ひとつで対応します。レスポンシブ対応、表示速度を重視した実装が強みです。',
		tags: ['Astro', 'Next.js', 'WordPress'],
	},
};

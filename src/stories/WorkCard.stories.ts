import type { Meta, StoryObj } from '@storybook/html';

interface WorkCardArgs {
	title: string;
	category: string;
	description: string;
	url: string;
	imageUrl: string;
}

const createWorkCard = (args: WorkCardArgs): string => {
	return `
		<div style="width: 373px;">
			<article class="overflow-hidden rounded-2xl bg-white shadow-card">
				<a href="${args.url}" target="_blank" rel="noopener noreferrer" class="block h-full text-inherit no-underline group">
					<div class="aspect-card overflow-hidden">
						<img
							src="${args.imageUrl}"
							alt="${args.title}"
							class="h-full w-full object-cover object-top"
						/>
					</div>
					<div class="p-6">
						<div class="mb-2 flex items-center justify-between">
							<span class="inline-block rounded-full bg-tag-site px-3 py-1.5 text-xs font-semibold text-primary">
								${args.category}
							</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted transition-colors duration-200 group-hover:text-primary">
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
								<polyline points="15 3 21 3 21 9"></polyline>
								<line x1="10" y1="14" x2="21" y2="3"></line>
							</svg>
						</div>
						<h3 class="mb-1 text-xl font-bold leading-snug text-text">${args.title}</h3>
						<p class="text-sm leading-relaxed text-text-muted">${args.description}</p>
					</div>
				</a>
			</article>
		</div>
	`;
};

const meta: Meta<WorkCardArgs> = {
	title: 'UI/WorkCard',
	render: (args) => createWorkCard(args),
	argTypes: {
		title: {
			control: 'text',
			description: '制作物のタイトル',
		},
		category: {
			control: 'text',
			description: 'サイト種別タグ',
		},
		description: {
			control: 'text',
			description: '制作物の説明',
		},
		url: {
			control: 'text',
			description: '外部リンクURL',
		},
		imageUrl: {
			control: 'text',
			description: 'サムネイル画像URL',
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
type Story = StoryObj<WorkCardArgs>;

export const Default: Story = {
	args: {
		title: 'beyerdynamic',
		category: 'ブランドサイト',
		description:
			'ドイツの高品質オーディオ機器ブランドの日本向けサイト。製品の魅力を伝えるビジュアル重視のデザイン。',
		url: 'https://beyerdynamic.co.jp/',
		imageUrl: 'https://webmaka.com/_astro/beyerdynamic.BYrXdvo3_Bl75y.webp',
	},
};

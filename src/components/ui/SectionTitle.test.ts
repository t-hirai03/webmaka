import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import SectionTitle from './SectionTitle.astro';

describe('SectionTitle', () => {
	it('タイトルをh2要素でレンダリングする', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(SectionTitle, {
			props: { title: 'サービス紹介' },
		});

		expect(result).toContain('<h2');
		expect(result).toContain('サービス紹介');
		expect(result).toContain('</h2>');
	});

	it('subtitleが指定された場合はp要素で表示される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(SectionTitle, {
			props: { title: 'サービス紹介', subtitle: 'Service' },
		});

		expect(result).toContain('<p');
		expect(result).toContain('Service');
	});

	it('subtitleが指定されない場合はp要素が表示されない', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(SectionTitle, {
			props: { title: 'タイトルのみ' },
		});

		expect(result).not.toContain('<p');
	});

	it('タイトルのスタイルクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(SectionTitle, {
			props: { title: 'テスト' },
		});

		expect(result).toContain('font-display');
		expect(result).toContain('font-bold');
		expect(result).toContain('text-text');
	});

	it('subtitleのスタイルクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(SectionTitle, {
			props: { title: 'テスト', subtitle: 'Test' },
		});

		expect(result).toContain('text-text-muted');
		expect(result).toContain('mt-1');
	});

	it('ラッパーがtext-centerクラスを持つ', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(SectionTitle, {
			props: { title: 'テスト' },
		});

		expect(result).toContain('text-center');
	});

	it('カスタムクラスを追加できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(SectionTitle, {
			props: { title: 'テスト', class: 'mb-12' },
		});

		expect(result).toContain('mb-12');
	});
});

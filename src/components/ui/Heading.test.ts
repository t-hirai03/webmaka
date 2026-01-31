import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Heading from './Heading.astro';

describe('Heading', () => {
	it('level=1でh1要素をレンダリングする', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Heading, {
			props: { level: 1 },
			slots: { default: '見出し1' },
		});

		expect(result).toContain('<h1');
		expect(result).toContain('見出し1');
		expect(result).toContain('</h1>');
	});

	it('level=2でh2要素をレンダリングする', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Heading, {
			props: { level: 2 },
			slots: { default: '見出し2' },
		});

		expect(result).toContain('<h2');
		expect(result).toContain('見出し2');
		expect(result).toContain('</h2>');
	});

	it('level=3でh3要素をレンダリングする', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Heading, {
			props: { level: 3 },
			slots: { default: '見出し3' },
		});

		expect(result).toContain('<h3');
		expect(result).toContain('見出し3');
		expect(result).toContain('</h3>');
	});

	it('デフォルトvariant（section）のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Heading, {
			props: { level: 2 },
			slots: { default: 'Section' },
		});

		expect(result).toContain('text-xl');
		expect(result).toContain('font-bold');
		expect(result).toContain('text-text');
	});

	it('variant="page"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Heading, {
			props: { level: 1, variant: 'page' },
			slots: { default: 'Page' },
		});

		expect(result).toContain('text-3xl');
		expect(result).toContain('font-bold');
	});

	it('variant="card"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Heading, {
			props: { level: 3, variant: 'card' },
			slots: { default: 'Card' },
		});

		expect(result).toContain('text-lg');
		expect(result).toContain('font-semibold');
	});

	it('variant="subtle"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Heading, {
			props: { level: 3, variant: 'subtle' },
			slots: { default: 'Subtle' },
		});

		expect(result).toContain('text-sm');
		expect(result).toContain('text-text-muted');
	});

	it('variant="bordered"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Heading, {
			props: { level: 2, variant: 'bordered' },
			slots: { default: 'Bordered' },
		});

		expect(result).toContain('border-b-2');
		expect(result).toContain('border-primary');
		expect(result).toContain('pb-2');
	});

	it('カスタムクラスを追加できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Heading, {
			props: { level: 2, class: 'mt-8 mb-4' },
			slots: { default: 'Custom' },
		});

		expect(result).toContain('mt-8');
		expect(result).toContain('mb-4');
	});
});

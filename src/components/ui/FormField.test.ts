import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import FormField from './FormField.astro';

describe('FormField', () => {
	it('label要素をレンダリングする', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(FormField, {
			props: { label: 'お名前', name: 'name' },
			slots: { default: '<input type="text" />' },
		});

		expect(result).toContain('<label');
		expect(result).toContain('お名前');
	});

	it('labelのfor属性にnameが設定される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(FormField, {
			props: { label: 'メールアドレス', name: 'email' },
			slots: { default: '<input type="email" />' },
		});

		expect(result).toContain('for="email"');
	});

	it('required=trueで必須マーク（*）が表示される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(FormField, {
			props: { label: 'お名前', name: 'name', required: true },
			slots: { default: '<input type="text" />' },
		});

		expect(result).toContain('<span');
		expect(result).toContain('*');
		expect(result).toContain('text-red-500');
	});

	it('required=false（デフォルト）で必須マークが表示されない', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(FormField, {
			props: { label: 'お名前', name: 'name' },
			slots: { default: '<input type="text" />' },
		});

		expect(result).not.toContain('text-red-500');
	});

	it('slotにコンテンツが渡される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(FormField, {
			props: { label: 'テスト', name: 'test' },
			slots: { default: '<input type="text" name="test" />' },
		});

		expect(result).toContain('<input type="text" name="test" />');
	});

	it('ベースクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(FormField, {
			props: { label: 'テスト', name: 'test' },
			slots: { default: '<input />' },
		});

		expect(result).toContain('form-field');
		expect(result).toContain('space-y-2');
	});

	it('labelのスタイルクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(FormField, {
			props: { label: 'テスト', name: 'test' },
			slots: { default: '<input />' },
		});

		expect(result).toContain('block');
		expect(result).toContain('text-sm');
		expect(result).toContain('font-medium');
	});

	it('カスタムクラスを追加できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(FormField, {
			props: { label: 'テスト', name: 'test', class: 'mb-6' },
			slots: { default: '<input />' },
		});

		expect(result).toContain('mb-6');
	});
});

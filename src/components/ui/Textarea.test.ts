import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Textarea from './Textarea.astro';

describe('Textarea', () => {
	it('textarea要素をレンダリングする', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Textarea, {
			props: { name: 'message' },
		});

		expect(result).toContain('<textarea');
		expect(result).toContain('name="message"');
	});

	it('idが指定されない場合はnameがidになる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Textarea, {
			props: { name: 'description' },
		});

		expect(result).toContain('id="description"');
	});

	it('idを明示的に指定できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Textarea, {
			props: { name: 'description', id: 'custom-textarea' },
		});

		expect(result).toContain('id="custom-textarea"');
	});

	it('placeholderを設定できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Textarea, {
			props: { name: 'message', placeholder: 'お問い合わせ内容を入力してください' },
		});

		expect(result).toContain('placeholder="お問い合わせ内容を入力してください"');
	});

	it('デフォルトrows（5）が設定される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Textarea, {
			props: { name: 'message' },
		});

		expect(result).toContain('rows="5"');
	});

	it('rowsをカスタマイズできる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Textarea, {
			props: { name: 'message', rows: 10 },
		});

		expect(result).toContain('rows="10"');
	});

	it('required属性を設定できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Textarea, {
			props: { name: 'message', required: true },
		});

		expect(result).toContain('required');
	});

	it('required=falseの場合はrequired属性が設定されない', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Textarea, {
			props: { name: 'message', required: false },
		});

		expect(result).not.toMatch(/required(?!=)/);
	});

	it('ベースクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Textarea, {
			props: { name: 'test' },
		});

		expect(result).toContain('w-full');
		expect(result).toContain('bg-white');
		expect(result).toContain('rounded-lg');
		expect(result).toContain('border');
		expect(result).toContain('border-gray-300');
		expect(result).toContain('resize-none');
	});

	it('カスタムクラスを追加できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Textarea, {
			props: { name: 'test', class: 'min-h-[200px]' },
		});

		expect(result).toContain('min-h-[200px]');
	});
});

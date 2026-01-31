import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Input from './Input.astro';

describe('Input', () => {
	it('input要素をレンダリングする', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Input, {
			props: { name: 'test' },
		});

		expect(result).toContain('<input');
		expect(result).toContain('name="test"');
	});

	it('デフォルトtype（text）が設定される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Input, {
			props: { name: 'test' },
		});

		expect(result).toContain('type="text"');
	});

	it('type="email"を指定できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Input, {
			props: { name: 'email', type: 'email' },
		});

		expect(result).toContain('type="email"');
	});

	it('type="tel"を指定できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Input, {
			props: { name: 'phone', type: 'tel' },
		});

		expect(result).toContain('type="tel"');
	});

	it('idが指定されない場合はnameがidになる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Input, {
			props: { name: 'username' },
		});

		expect(result).toContain('id="username"');
	});

	it('idを明示的に指定できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Input, {
			props: { name: 'username', id: 'custom-id' },
		});

		expect(result).toContain('id="custom-id"');
	});

	it('placeholderを設定できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Input, {
			props: { name: 'test', placeholder: '入力してください' },
		});

		expect(result).toContain('placeholder="入力してください"');
	});

	it('required属性を設定できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Input, {
			props: { name: 'test', required: true },
		});

		expect(result).toContain('required');
	});

	it('required=falseの場合はrequired属性が設定されない', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Input, {
			props: { name: 'test', required: false },
		});

		expect(result).not.toMatch(/required(?!=)/);
	});

	it('ベースクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Input, {
			props: { name: 'test' },
		});

		expect(result).toContain('w-full');
		expect(result).toContain('bg-white');
		expect(result).toContain('rounded-lg');
		expect(result).toContain('border');
		expect(result).toContain('border-gray-300');
	});

	it('カスタムクラスを追加できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Input, {
			props: { name: 'test', class: 'my-custom-input' },
		});

		expect(result).toContain('my-custom-input');
	});
});

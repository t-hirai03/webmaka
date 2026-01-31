import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Select from './Select.astro';

describe('Select', () => {
	it('select要素をレンダリングする', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Select, {
			props: { name: 'inquiry' },
			slots: { default: '<option value="test">Test</option>' },
		});

		expect(result).toContain('<select');
		expect(result).toContain('name="inquiry"');
	});

	it('idが指定されない場合はnameがidになる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Select, {
			props: { name: 'category' },
			slots: { default: '<option>Option</option>' },
		});

		expect(result).toContain('id="category"');
	});

	it('idを明示的に指定できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Select, {
			props: { name: 'category', id: 'custom-select' },
			slots: { default: '<option>Option</option>' },
		});

		expect(result).toContain('id="custom-select"');
	});

	it('required属性を設定できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Select, {
			props: { name: 'test', required: true },
			slots: { default: '<option>Option</option>' },
		});

		expect(result).toContain('required');
	});

	it('slotに選択肢が渡される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Select, {
			props: { name: 'type' },
			slots: {
				default: `
					<option value="">選択してください</option>
					<option value="a">オプションA</option>
					<option value="b">オプションB</option>
				`,
			},
		});

		expect(result).toContain('選択してください');
		expect(result).toContain('オプションA');
		expect(result).toContain('オプションB');
	});

	it('ベースクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Select, {
			props: { name: 'test' },
			slots: { default: '<option>Option</option>' },
		});

		expect(result).toContain('w-full');
		expect(result).toContain('bg-white');
		expect(result).toContain('rounded-lg');
		expect(result).toContain('border');
		expect(result).toContain('border-gray-300');
		expect(result).toContain('cursor-pointer');
	});

	it('カスタム矢印アイコンがスタイルに設定される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Select, {
			props: { name: 'test' },
			slots: { default: '<option>Option</option>' },
		});

		expect(result).toContain('background-image:');
		expect(result).toContain('svg');
	});

	it('カスタムクラスを追加できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Select, {
			props: { name: 'test', class: 'my-custom-select' },
			slots: { default: '<option>Option</option>' },
		});

		expect(result).toContain('my-custom-select');
	});
});

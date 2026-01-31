import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Badge from './Badge.astro';

describe('Badge', () => {
	it('デフォルトでspan要素をレンダリングする', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Badge, {
			slots: { default: 'バッジ' },
		});

		expect(result).toContain('<span');
		expect(result).toContain('バッジ');
	});

	it('デフォルトvariant（default）のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Badge, {
			slots: { default: 'Default' },
		});

		expect(result).toContain('bg-gray-100');
		expect(result).toContain('text-text-muted');
	});

	it('variant="primary"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Badge, {
			props: { variant: 'primary' },
			slots: { default: 'Primary' },
		});

		expect(result).toContain('bg-primary');
		expect(result).toContain('text-white');
	});

	it('variant="accent"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Badge, {
			props: { variant: 'accent' },
			slots: { default: 'Accent' },
		});

		expect(result).toContain('bg-accent');
		expect(result).toContain('text-white');
	});

	it('デフォルトsize（md）のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Badge, {
			slots: { default: 'Medium' },
		});

		expect(result).toContain('px-3');
		expect(result).toContain('py-1');
		expect(result).toContain('text-sm');
	});

	it('size="sm"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Badge, {
			props: { size: 'sm' },
			slots: { default: 'Small' },
		});

		expect(result).toContain('px-2');
		expect(result).toContain('py-0.5');
		expect(result).toContain('text-xs');
	});

	it('ベースクラスが常に適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Badge, {
			slots: { default: 'Base' },
		});

		expect(result).toContain('inline-flex');
		expect(result).toContain('items-center');
		expect(result).toContain('justify-center');
		expect(result).toContain('rounded-full');
		expect(result).toContain('font-medium');
	});

	it('カスタムクラスを追加できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Badge, {
			props: { class: 'my-custom-class' },
			slots: { default: 'Custom' },
		});

		expect(result).toContain('my-custom-class');
	});
});

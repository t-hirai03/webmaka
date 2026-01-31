import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Button from './Button.astro';

describe('Button', () => {
	it('デフォルトでbutton要素をレンダリングする', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			slots: { default: 'ボタン' },
		});

		expect(result).toContain('<button');
		expect(result).toContain('type="button"');
		expect(result).toContain('ボタン');
	});

	it('hrefが指定された場合はa要素をレンダリングする', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { href: '/contact' },
			slots: { default: 'リンク' },
		});

		expect(result).toContain('<a');
		expect(result).toContain('href="/contact"');
		expect(result).toContain('リンク');
	});

	it('type="submit"を指定できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { type: 'submit' },
			slots: { default: '送信' },
		});

		expect(result).toContain('type="submit"');
	});

	it('variant="primary"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { variant: 'primary' },
			slots: { default: 'Primary' },
		});

		expect(result).toContain('bg-primary');
		expect(result).toContain('text-white');
	});

	it('variant="secondary"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { variant: 'secondary' },
			slots: { default: 'Secondary' },
		});

		expect(result).toContain('bg-accent');
	});

	it('variant="ghost"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { variant: 'ghost' },
			slots: { default: 'Ghost' },
		});

		expect(result).toContain('bg-gray-200');
	});

	it('variant="cta"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { variant: 'cta' },
			slots: { default: 'CTA' },
		});

		expect(result).toContain('bg-cta');
		expect(result).toContain('shadow-button');
	});

	it('variant="gold"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { variant: 'gold' },
			slots: { default: 'Gold' },
		});

		expect(result).toContain('bg-gold');
		expect(result).toContain('border-gold-border');
	});

	it('size="sm"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { size: 'sm' },
			slots: { default: 'Small' },
		});

		expect(result).toContain('px-4');
		expect(result).toContain('py-2');
		expect(result).toContain('text-sm');
	});

	it('size="lg"のクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { size: 'lg' },
			slots: { default: 'Large' },
		});

		expect(result).toContain('px-[clamp');
	});

	it('disabled=trueでdisabled属性が設定される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { disabled: true },
			slots: { default: 'Disabled' },
		});

		expect(result).toContain('disabled');
		expect(result).toContain('opacity-50');
		expect(result).toContain('cursor-not-allowed');
	});

	it('disabled=trueのリンクはaria-disabled属性が設定される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { href: '/test', disabled: true },
			slots: { default: 'Disabled Link' },
		});

		expect(result).toContain('aria-disabled="true"');
		expect(result).not.toContain('href="/test"');
	});

	it('icon="mail"でメールアイコンが表示される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { icon: 'mail' },
			slots: { default: 'メール' },
		});

		expect(result).toContain('<svg');
		expect(result).toContain('aria-hidden="true"');
	});

	it('icon="none"（デフォルト）でアイコンが表示されない', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { icon: 'none' },
			slots: { default: 'No Icon' },
		});

		expect(result).not.toContain('<svg');
	});

	it('カスタムクラスを追加できる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Button, {
			props: { class: 'custom-class' },
			slots: { default: 'Custom' },
		});

		expect(result).toContain('custom-class');
	});
});

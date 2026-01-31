import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import ContactProgress from './ContactProgress.astro';

describe('ContactProgress', () => {
	it('nav要素とol要素でプログレスバーをレンダリングする', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ContactProgress, {
			props: { currentStep: 1 },
		});

		expect(result).toContain('<nav');
		expect(result).toContain('<ol');
		expect(result).toContain('progressbar');
	});

	it('aria-labelでアクセシビリティが確保されている', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ContactProgress, {
			props: { currentStep: 1 },
		});

		expect(result).toContain('aria-label="お問い合わせ進捗"');
	});

	it('3つのステップが表示される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ContactProgress, {
			props: { currentStep: 1 },
		});

		expect(result).toContain('ご入力');
		expect(result).toContain('ご確認');
		expect(result).toContain('完了');
	});

	it('currentStep=1の場合、ステップ1のみがactiveになる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ContactProgress, {
			props: { currentStep: 1 },
		});

		const activeMatches = result.match(/class="[^"]*active[^"]*"/g);
		expect(activeMatches).toHaveLength(1);
	});

	it('currentStep=2の場合、ステップ1と2がactiveになる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ContactProgress, {
			props: { currentStep: 2 },
		});

		const activeMatches = result.match(/class="[^"]*active[^"]*"/g);
		expect(activeMatches).toHaveLength(2);
	});

	it('currentStep=3の場合、全てのステップがactiveになる', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ContactProgress, {
			props: { currentStep: 3 },
		});

		const activeMatches = result.match(/class="[^"]*active[^"]*"/g);
		expect(activeMatches).toHaveLength(3);
	});

	it('各ステップにitemクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ContactProgress, {
			props: { currentStep: 1 },
		});

		const itemMatches = result.match(/class="[^"]*item[^"]*"/g);
		expect(itemMatches).toHaveLength(3);
	});

	it('ラベルにfont-mediumクラスが適用される', async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ContactProgress, {
			props: { currentStep: 1 },
		});

		expect(result).toContain('font-medium');
	});
});

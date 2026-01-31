import { expect, test } from '@playwright/test';

test.describe('お問い合わせフォーム', () => {
	const validFormData = {
		name: 'テスト太郎',
		email: 'test@example.com',
		inquiryType: 'website',
		phone: '090-1234-5678',
		message: 'テストメッセージです。お問い合わせ内容をここに記載します。',
	};

	test.beforeEach(async ({ page }) => {
		// ストレージをクリア
		await page.goto('/contact');
		await page.evaluate(() => {
			sessionStorage.clear();
			localStorage.clear();
		});
	});

	test.describe('入力画面', () => {
		test('フォームが正しく表示される', async ({ page }) => {
			await page.goto('/contact');
			await page.waitForLoadState('domcontentloaded');

			// フォーム要素の存在確認
			await expect(page.locator('#name')).toBeVisible();
			await expect(page.locator('#email')).toBeVisible();
			await expect(page.locator('#inquiry-type')).toBeVisible();
			await expect(page.locator('#phone')).toBeVisible();
			await expect(page.locator('#message')).toBeVisible();
			await expect(page.getByRole('button', { name: '確認する' })).toBeVisible();
		});

		test('必須項目が空白のみの場合エラーが表示される - 氏名', async ({ page }) => {
			await page.goto('/contact');
			await page.waitForLoadState('domcontentloaded');

			// 氏名に空白のみを入力（HTML5バリデーションをパスするため）
			await page.fill('#name', '   ');
			await page.fill('#email', validFormData.email);
			await page.fill('#message', validFormData.message);
			await page.click('button[type="submit"]');

			// エラーメッセージの確認
			await expect(page.locator('#name-error')).toBeVisible();
			await expect(page.locator('#name-error')).toHaveText('氏名を入力してください。');
		});

		test('必須項目が空白のみの場合エラーが表示される - お問い合わせ内容', async ({ page }) => {
			await page.goto('/contact');
			await page.waitForLoadState('domcontentloaded');

			await page.fill('#name', validFormData.name);
			await page.fill('#email', validFormData.email);
			// 空白のみを入力
			await page.fill('#message', '   ');
			await page.click('button[type="submit"]');

			await expect(page.locator('#message-error')).toBeVisible();
			await expect(page.locator('#message-error')).toHaveText(
				'お問い合わせ内容を入力してください。',
			);
		});

		test('不正なメールアドレス形式でエラーが表示される', async ({ page }) => {
			await page.goto('/contact');
			await page.waitForLoadState('domcontentloaded');

			await page.fill('#name', validFormData.name);
			// HTML5バリデーションをパスするが、独自バリデーションで弾かれる形式
			await page.fill('#email', 'test@example');
			await page.fill('#message', validFormData.message);
			await page.click('button[type="submit"]');

			await expect(page.locator('#email-error')).toBeVisible();
			await expect(page.locator('#email-error')).toHaveText(
				'正しいメールアドレスを入力してください。',
			);
		});

		test('有効な入力で確認画面に遷移する', async ({ page }) => {
			await page.goto('/contact');
			await page.waitForLoadState('domcontentloaded');

			// フォーム入力
			await page.fill('#name', validFormData.name);
			await page.fill('#email', validFormData.email);
			await page.selectOption('#inquiry-type', validFormData.inquiryType);
			await page.fill('#phone', validFormData.phone);
			await page.fill('#message', validFormData.message);

			// 送信
			await page.click('button[type="submit"]');

			// 確認画面への遷移確認
			await expect(page).toHaveURL('/contact/confirm');
		});
	});

	test.describe('確認画面', () => {
		test.beforeEach(async ({ page }) => {
			// フォームデータをストレージに設定
			await page.goto('/contact');
			await page.evaluate((data) => {
				const storageData = {
					name: data.name,
					email: data.email,
					inquiryType: data.inquiryType,
					phone: data.phone,
					message: data.message,
					sourceUrl: window.location.href,
				};
				sessionStorage.setItem('contactFormData', JSON.stringify(storageData));
			}, validFormData);
		});

		test('入力内容が正しく表示される', async ({ page }) => {
			await page.goto('/contact/confirm');

			// 各フィールドの値が表示されていることを確認
			await expect(page.getByText(validFormData.name)).toBeVisible();
			await expect(page.getByText(validFormData.email)).toBeVisible();
			await expect(page.getByText('Webサイト制作')).toBeVisible();
			await expect(page.getByText(validFormData.phone)).toBeVisible();
			await expect(page.getByText(validFormData.message)).toBeVisible();
		});

		test('「修正する」ボタンで入力画面に戻る', async ({ page }) => {
			await page.goto('/contact/confirm');

			await page.click('#back-button');

			await expect(page).toHaveURL('/contact');
		});

		test('入力画面に戻った際にデータが復元される', async ({ page }) => {
			await page.goto('/contact/confirm');
			await page.click('#back-button');
			await expect(page).toHaveURL('/contact');

			// 入力値が復元されていることを確認
			await expect(page.locator('#name')).toHaveValue(validFormData.name);
			await expect(page.locator('#email')).toHaveValue(validFormData.email);
			await expect(page.locator('#inquiry-type')).toHaveValue(validFormData.inquiryType);
			await expect(page.locator('#phone')).toHaveValue(validFormData.phone);
			await expect(page.locator('#message')).toHaveValue(validFormData.message);
		});

		test('ストレージにデータがない場合は入力画面にリダイレクトされる', async ({ page }) => {
			// ストレージをクリア
			await page.evaluate(() => {
				sessionStorage.clear();
				localStorage.clear();
			});

			await page.goto('/contact/confirm');

			// 入力画面にリダイレクトされることを確認
			await expect(page).toHaveURL('/contact');
		});

		test('送信成功時に完了画面に遷移する', async ({ page }) => {
			// APIレスポンスをモック
			await page.route('/api/contact', async (route) => {
				await route.fulfill({
					status: 200,
					contentType: 'application/json',
					body: JSON.stringify({ success: true }),
				});
			});

			await page.goto('/contact/confirm');

			// 送信ボタンをクリック
			await page.click('#submit-button');

			// 完了画面への遷移確認
			await expect(page).toHaveURL('/contact/thanks');
		});

		test('送信中はボタンが無効化される', async ({ page }) => {
			// 遅延レスポンスをモック
			await page.route('/api/contact', async (route) => {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				await route.fulfill({
					status: 200,
					contentType: 'application/json',
					body: JSON.stringify({ success: true }),
				});
			});

			await page.goto('/contact/confirm');
			await page.click('#submit-button');

			// ボタンが無効化されていることを確認
			await expect(page.locator('#submit-button')).toBeDisabled();
			await expect(page.locator('#back-button')).toBeDisabled();
			await expect(page.locator('#submit-button')).toHaveText(/送信中|再試行中/);
		});

		test('APIエラー時にエラーメッセージが表示される', async ({ page }) => {
			// エラーレスポンスをモック
			await page.route('/api/contact', async (route) => {
				await route.fulfill({
					status: 400,
					contentType: 'application/json',
					body: JSON.stringify({ success: false, error: '送信に失敗しました。' }),
				});
			});

			await page.goto('/contact/confirm');
			await page.click('#submit-button');

			// エラーメッセージの確認
			await expect(page.locator('#confirm-message')).toBeVisible();
			await expect(page.locator('#confirm-message')).toContainText('送信に失敗しました');

			// ボタンが再度有効化されることを確認
			await expect(page.locator('#submit-button')).toBeEnabled();
		});

		test('レート制限エラー時に適切なメッセージが表示される', async ({ page }) => {
			await page.route('/api/contact', async (route) => {
				await route.fulfill({
					status: 429,
					contentType: 'application/json',
					body: JSON.stringify({ success: false, error: 'レート制限' }),
				});
			});

			await page.goto('/contact/confirm');
			await page.click('#submit-button');

			await expect(page.locator('#confirm-message')).toBeVisible();
			await expect(page.locator('#confirm-message')).toContainText('送信回数の上限');
		});
	});

	test.describe('完了画面', () => {
		test('完了メッセージが表示される', async ({ page }) => {
			await page.goto('/contact/thanks');

			await expect(page.getByText('お問い合わせいただきありがとうございます。')).toBeVisible();
			await expect(page.getByRole('link', { name: 'トップページに戻る' })).toBeVisible();
		});

		test('トップページへのリンクが機能する', async ({ page }) => {
			await page.goto('/contact/thanks');

			await page.click('a:has-text("トップページに戻る")');

			await expect(page).toHaveURL('/');
		});
	});

	test.describe('フロー全体', () => {
		test('入力→確認→送信→完了の一連のフローが正常に動作する', async ({ page }) => {
			// APIレスポンスをモック
			await page.route('/api/contact', async (route) => {
				await route.fulfill({
					status: 200,
					contentType: 'application/json',
					body: JSON.stringify({ success: true }),
				});
			});

			// 1. 入力画面
			await page.goto('/contact');
			await page.fill('#name', validFormData.name);
			await page.fill('#email', validFormData.email);
			await page.selectOption('#inquiry-type', validFormData.inquiryType);
			await page.fill('#phone', validFormData.phone);
			await page.fill('#message', validFormData.message);

			// 2. 確認画面へ遷移
			await page.click('button[type="submit"]');
			await expect(page).toHaveURL('/contact/confirm');

			// 3. 内容確認
			await expect(page.getByText(validFormData.name)).toBeVisible();
			await expect(page.getByText(validFormData.email)).toBeVisible();

			// 4. 送信
			await page.click('#submit-button');

			// 5. 完了画面
			await expect(page).toHaveURL('/contact/thanks');
			await expect(page.getByText('お問い合わせいただきありがとうございます。')).toBeVisible();
		});
	});
});

import { describe, expect, it } from 'vitest';
import {
	escapeHtml,
	getInquiryTypeLabel,
	INQUIRY_TYPE_LABELS,
	isValidContactFormData,
	isValidEmail,
	isValidMessage,
	isValidName,
	validateContactForm,
} from './validation';

describe('isValidEmail', () => {
	it('有効なメールアドレスはtrueを返す', () => {
		expect(isValidEmail('test@example.com')).toBe(true);
		expect(isValidEmail('user.name@domain.co.jp')).toBe(true);
		expect(isValidEmail('user+tag@example.org')).toBe(true);
	});

	it('無効なメールアドレスはfalseを返す', () => {
		expect(isValidEmail('')).toBe(false);
		expect(isValidEmail('invalid')).toBe(false);
		expect(isValidEmail('invalid@')).toBe(false);
		expect(isValidEmail('@example.com')).toBe(false);
		expect(isValidEmail('test@.com')).toBe(false);
		expect(isValidEmail('test @example.com')).toBe(false);
	});
});

describe('isValidName', () => {
	it('有効な名前はtrueを返す', () => {
		expect(isValidName('山田太郎')).toBe(true);
		expect(isValidName('John Doe')).toBe(true);
		expect(isValidName('a')).toBe(true);
	});

	it('空の名前はfalseを返す', () => {
		expect(isValidName('')).toBe(false);
		expect(isValidName('   ')).toBe(false);
		expect(isValidName('\t\n')).toBe(false);
	});
});

describe('isValidMessage', () => {
	it('有効なメッセージはtrueを返す', () => {
		expect(isValidMessage('お問い合わせ内容')).toBe(true);
		expect(isValidMessage('a')).toBe(true);
	});

	it('空のメッセージはfalseを返す', () => {
		expect(isValidMessage('')).toBe(false);
		expect(isValidMessage('   ')).toBe(false);
	});
});

describe('validateContactForm', () => {
	it('有効なデータはvalid: trueを返す', () => {
		const result = validateContactForm({
			name: '山田太郎',
			email: 'test@example.com',
			message: 'お問い合わせ内容です',
		});
		expect(result.valid).toBe(true);
		expect(result.errors).toEqual({});
	});

	it('nullデータは全フィールドエラーを返す', () => {
		const result = validateContactForm(null);
		expect(result.valid).toBe(false);
		expect(result.errors.name).toBeDefined();
		expect(result.errors.email).toBeDefined();
		expect(result.errors.message).toBeDefined();
	});

	it('空の名前はエラーを返す', () => {
		const result = validateContactForm({
			name: '',
			email: 'test@example.com',
			message: 'お問い合わせ内容',
		});
		expect(result.valid).toBe(false);
		expect(result.errors.name).toBe('氏名を入力してください。');
	});

	it('無効なメールアドレスはエラーを返す', () => {
		const result = validateContactForm({
			name: '山田太郎',
			email: 'invalid-email',
			message: 'お問い合わせ内容',
		});
		expect(result.valid).toBe(false);
		expect(result.errors.email).toBe('正しいメールアドレスを入力してください。');
	});

	it('空のメールアドレスはエラーを返す', () => {
		const result = validateContactForm({
			name: '山田太郎',
			email: '',
			message: 'お問い合わせ内容',
		});
		expect(result.valid).toBe(false);
		expect(result.errors.email).toBe('メールアドレスを入力してください。');
	});

	it('空のメッセージはエラーを返す', () => {
		const result = validateContactForm({
			name: '山田太郎',
			email: 'test@example.com',
			message: '',
		});
		expect(result.valid).toBe(false);
		expect(result.errors.message).toBe('お問い合わせ内容を入力してください。');
	});

	it('複数のエラーを同時に返す', () => {
		const result = validateContactForm({
			name: '',
			email: 'invalid',
			message: '',
		});
		expect(result.valid).toBe(false);
		expect(Object.keys(result.errors).length).toBe(3);
	});
});

describe('isValidContactFormData', () => {
	it('有効なデータはtrueを返す', () => {
		expect(
			isValidContactFormData({
				name: '山田太郎',
				email: 'test@example.com',
				inquiryType: 'website',
				phone: '03-1234-5678',
				message: 'お問い合わせ内容',
			}),
		).toBe(true);
	});

	it('無効なデータはfalseを返す', () => {
		expect(isValidContactFormData(null)).toBe(false);
		expect(isValidContactFormData({})).toBe(false);
		expect(isValidContactFormData({ name: '' })).toBe(false);
	});
});

describe('escapeHtml', () => {
	it('特殊文字をエスケープする', () => {
		expect(escapeHtml('&')).toBe('&amp;');
		expect(escapeHtml('<')).toBe('&lt;');
		expect(escapeHtml('>')).toBe('&gt;');
		expect(escapeHtml('"')).toBe('&quot;');
		expect(escapeHtml("'")).toBe('&#039;');
	});

	it('複数の特殊文字を含む文字列をエスケープする', () => {
		expect(escapeHtml('<script>alert("XSS")</script>')).toBe(
			'&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;',
		);
	});

	it('特殊文字を含まない文字列はそのまま返す', () => {
		expect(escapeHtml('Hello World')).toBe('Hello World');
		expect(escapeHtml('こんにちは')).toBe('こんにちは');
	});
});

describe('getInquiryTypeLabel', () => {
	it('既知のお問い合わせ種別のラベルを返す', () => {
		expect(getInquiryTypeLabel('website')).toBe('Webサイト制作');
		expect(getInquiryTypeLabel('lp')).toBe('LP制作');
		expect(getInquiryTypeLabel('cms')).toBe('CMS導入・移行');
		expect(getInquiryTypeLabel('coding')).toBe('コーディング代行');
		expect(getInquiryTypeLabel('other')).toBe('その他');
	});

	it('未知のお問い合わせ種別は「未選択」を返す', () => {
		expect(getInquiryTypeLabel('unknown')).toBe('未選択');
		expect(getInquiryTypeLabel('')).toBe('未選択');
	});
});

describe('INQUIRY_TYPE_LABELS', () => {
	it('全てのお問い合わせ種別が定義されている', () => {
		expect(Object.keys(INQUIRY_TYPE_LABELS)).toHaveLength(5);
		expect(INQUIRY_TYPE_LABELS).toHaveProperty('website');
		expect(INQUIRY_TYPE_LABELS).toHaveProperty('lp');
		expect(INQUIRY_TYPE_LABELS).toHaveProperty('cms');
		expect(INQUIRY_TYPE_LABELS).toHaveProperty('coding');
		expect(INQUIRY_TYPE_LABELS).toHaveProperty('other');
	});
});

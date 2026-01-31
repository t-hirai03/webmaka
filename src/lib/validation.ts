/**
 * お問い合わせフォームのバリデーションと関連ユーティリティ
 */

export interface ContactFormData {
	name: string;
	email: string;
	inquiryType: string;
	phone: string;
	message: string;
	sourceUrl?: string;
}

export const INQUIRY_TYPE_LABELS: Record<string, string> = {
	website: 'Webサイト制作',
	lp: 'LP制作',
	cms: 'CMS導入・移行',
	coding: 'コーディング代行',
	other: 'その他',
};

/** メールアドレスの正規表現（RFC 5322準拠の簡易版） */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * メールアドレスの形式を検証
 */
export function isValidEmail(email: string): boolean {
	return EMAIL_REGEX.test(email);
}

/**
 * 名前の検証（空でないこと）
 */
export function isValidName(name: string): boolean {
	return typeof name === 'string' && name.trim().length > 0;
}

/**
 * メッセージの検証（空でないこと）
 */
export function isValidMessage(message: string): boolean {
	return typeof message === 'string' && message.trim().length > 0;
}

export interface ValidationResult {
	valid: boolean;
	errors: {
		name?: string;
		email?: string;
		message?: string;
	};
}

/**
 * フォームデータの詳細なバリデーション
 * 各フィールドごとのエラーメッセージを返す
 */
export function validateContactForm(data: unknown): ValidationResult {
	const errors: ValidationResult['errors'] = {};

	if (typeof data !== 'object' || data === null) {
		return {
			valid: false,
			errors: {
				name: '氏名を入力してください。',
				email: 'メールアドレスを入力してください。',
				message: 'お問い合わせ内容を入力してください。',
			},
		};
	}

	const { name, email, message } = data as Record<string, unknown>;

	if (typeof name !== 'string' || !isValidName(name)) {
		errors.name = '氏名を入力してください。';
	}

	if (typeof email !== 'string' || email.trim().length === 0) {
		errors.email = 'メールアドレスを入力してください。';
	} else if (!isValidEmail(email)) {
		errors.email = '正しいメールアドレスを入力してください。';
	}

	if (typeof message !== 'string' || !isValidMessage(message)) {
		errors.message = 'お問い合わせ内容を入力してください。';
	}

	return {
		valid: Object.keys(errors).length === 0,
		errors,
	};
}

/**
 * フォームデータが有効かどうかを簡易チェック（型ガード）
 */
export function isValidContactFormData(data: unknown): data is ContactFormData {
	const result = validateContactForm(data);
	return result.valid;
}

/**
 * HTMLエスケープ処理（XSS対策）
 */
export function escapeHtml(text: string): string {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;',
	};
	return text.replace(/[&<>"']/g, (char) => map[char] ?? char);
}

/**
 * お問い合わせ種別のラベルを取得
 */
export function getInquiryTypeLabel(inquiryType: string): string {
	return INQUIRY_TYPE_LABELS[inquiryType] ?? '未選択';
}

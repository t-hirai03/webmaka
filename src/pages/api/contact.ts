import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// レート制限の設定
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1分
const RATE_LIMIT_MAX_REQUESTS = 3; // 1分あたりの最大リクエスト数

// IPアドレスごとのリクエスト記録
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const record = rateLimitMap.get(ip);

	if (!record || now > record.resetTime) {
		rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
		return false;
	}

	if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
		return true;
	}

	record.count++;
	return false;
}

// 定期的に古いレコードをクリーンアップ
function cleanupRateLimitMap() {
	const now = Date.now();
	for (const [ip, record] of rateLimitMap.entries()) {
		if (now > record.resetTime) {
			rateLimitMap.delete(ip);
		}
	}
}

interface ContactFormData {
	name: string;
	email: string;
	inquiryType: string;
	phone: string;
	message: string;
	sourceUrl?: string;
}

const INQUIRY_TYPE_LABELS: Record<string, string> = {
	website: 'Webサイト制作',
	lp: 'LP制作',
	cms: 'CMS導入・移行',
	coding: 'コーディング代行',
	other: 'その他',
};

const FROM_EMAIL = 'うぇぶまか <admin@webmaka.com>';

// メールアドレスの正規表現（RFC 5322準拠の簡易版）
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
	return EMAIL_REGEX.test(email);
}

function isValidContactFormData(data: unknown): data is ContactFormData {
	if (typeof data !== 'object' || data === null) return false;

	const { name, email, message } = data as Record<string, unknown>;

	return (
		typeof name === 'string' &&
		name.trim().length > 0 &&
		typeof email === 'string' &&
		isValidEmail(email) &&
		typeof message === 'string' &&
		message.trim().length > 0
	);
}

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, clientAddress }) => {
	// 古いレコードのクリーンアップ
	cleanupRateLimitMap();

	// レート制限チェック
	const ip = clientAddress || request.headers.get('cf-connecting-ip') || 'unknown';
	if (isRateLimited(ip)) {
		return new Response(
			JSON.stringify({
				success: false,
				error: 'リクエストが多すぎます。しばらく待ってから再度お試しください。',
			}),
			{
				status: 429,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	}

	const runtime = (locals as { runtime?: { env: Record<string, string> } }).runtime;
	const resendApiKey = runtime?.env?.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;
	const contactEmail = runtime?.env?.CONTACT_EMAIL ?? import.meta.env.CONTACT_EMAIL;

	if (!resendApiKey || !contactEmail) {
		return new Response(JSON.stringify({ success: false, error: '環境変数が設定されていません' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	let formData: unknown;
	try {
		formData = await request.json();
	} catch {
		return new Response(JSON.stringify({ success: false, error: '不正なリクエストです' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	if (!isValidContactFormData(formData)) {
		return new Response(JSON.stringify({ success: false, error: '必須項目を入力してください' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const { name, email, inquiryType, phone, message, sourceUrl } = formData;
	const inquiryLabel = INQUIRY_TYPE_LABELS[inquiryType] ?? '未選択';

	const resend = new Resend(resendApiKey);

	try {
		// 管理者への通知メール
		await resend.emails.send({
			from: FROM_EMAIL,
			to: contactEmail,
			subject: `【お問い合わせ】${name}様より`,
			html: `
				<h2>お問い合わせがありました</h2>
				<p style="margin-bottom: 16px; color: #666;">送信元: ${escapeHtml(sourceUrl || '不明')}</p>
				<table style="border-collapse: collapse; width: 100%; max-width: 600px;">
					<tr>
						<th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd; width: 30%;">氏名</th>
						<td style="padding: 8px; border-bottom: 1px solid #ddd;">${escapeHtml(name)}</td>
					</tr>
					<tr>
						<th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">メールアドレス</th>
						<td style="padding: 8px; border-bottom: 1px solid #ddd;">${escapeHtml(email)}</td>
					</tr>
					<tr>
						<th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">お問い合わせ種別</th>
						<td style="padding: 8px; border-bottom: 1px solid #ddd;">${escapeHtml(inquiryLabel)}</td>
					</tr>
					<tr>
						<th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">電話番号</th>
						<td style="padding: 8px; border-bottom: 1px solid #ddd;">${escapeHtml(phone || '未入力')}</td>
					</tr>
					<tr>
						<th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd; vertical-align: top;">お問い合わせ内容</th>
						<td style="padding: 8px; border-bottom: 1px solid #ddd; white-space: pre-wrap;">${escapeHtml(message)}</td>
					</tr>
				</table>
			`,
		});

		// ユーザーへの自動返信メール
		await resend.emails.send({
			from: FROM_EMAIL,
			to: email,
			subject: '【うぇぶまか】お問い合わせありがとうございます',
			html: `
				<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
					<p>${escapeHtml(name)} 様</p>
					<p>この度はお問い合わせいただき、誠にありがとうございます。</p>
					<p>以下の内容でお問い合わせを受け付けました。<br>
					内容を確認の上、担当者より改めてご連絡いたします。</p>
					<hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
					<h3 style="font-size: 16px; margin-bottom: 16px;">お問い合わせ内容</h3>
					<table style="border-collapse: collapse; width: 100%;">
						<tr>
							<th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd; width: 30%;">氏名</th>
							<td style="padding: 8px; border-bottom: 1px solid #ddd;">${escapeHtml(name)}</td>
						</tr>
						<tr>
							<th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">メールアドレス</th>
							<td style="padding: 8px; border-bottom: 1px solid #ddd;">${escapeHtml(email)}</td>
						</tr>
						<tr>
							<th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">お問い合わせ種別</th>
							<td style="padding: 8px; border-bottom: 1px solid #ddd;">${escapeHtml(inquiryLabel)}</td>
						</tr>
						<tr>
							<th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">電話番号</th>
							<td style="padding: 8px; border-bottom: 1px solid #ddd;">${escapeHtml(phone || '未入力')}</td>
						</tr>
						<tr>
							<th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd; vertical-align: top;">お問い合わせ内容</th>
							<td style="padding: 8px; border-bottom: 1px solid #ddd; white-space: pre-wrap;">${escapeHtml(message)}</td>
						</tr>
					</table>
					<hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
					<p style="color: #666; font-size: 14px;">
						※ このメールは自動送信されています。<br>
						※ このメールに心当たりがない場合は、お手数ですが破棄してください。
					</p>
					<p style="margin-top: 24px;">
						━━━━━━━━━━━━━━━━━━━━<br>
						うぇぶまか<br>
						https://webmaka.com<br>
						━━━━━━━━━━━━━━━━━━━━
					</p>
				</div>
			`,
		});

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Resend error:', error);
		return new Response(JSON.stringify({ success: false, error: 'メール送信に失敗しました' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

function escapeHtml(text: string): string {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;',
	};
	return text.replace(/[&<>"']/g, (char) => map[char] ?? char);
}

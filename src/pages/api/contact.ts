import type { APIRoute } from 'astro';
import { Resend } from 'resend';

interface ContactFormData {
	name: string;
	email: string;
	inquiryType: string;
	phone: string;
	message: string;
}

const INQUIRY_TYPE_LABELS: Record<string, string> = {
	website: 'Webサイト制作',
	lp: 'LP制作',
	cms: 'CMS導入・移行',
	coding: 'コーディング代行',
	other: 'その他',
};

function isValidContactFormData(data: unknown): data is ContactFormData {
	if (typeof data !== 'object' || data === null) return false;

	const { name, email, message } = data as Record<string, unknown>;

	return (
		typeof name === 'string' &&
		name.trim().length > 0 &&
		typeof email === 'string' &&
		email.includes('@') &&
		typeof message === 'string' &&
		message.trim().length > 0
	);
}

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
	const runtime = (locals as { runtime?: { env: Record<string, string> } }).runtime;
	const resendApiKey = runtime?.env?.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;
	const contactEmail = runtime?.env?.CONTACT_EMAIL ?? import.meta.env.CONTACT_EMAIL;

	if (!resendApiKey || !contactEmail) {
		return new Response(
			JSON.stringify({ success: false, error: '環境変数が設定されていません' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}

	let formData: unknown;
	try {
		formData = await request.json();
	} catch {
		return new Response(
			JSON.stringify({ success: false, error: '不正なリクエストです' }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}

	if (!isValidContactFormData(formData)) {
		return new Response(
			JSON.stringify({ success: false, error: '必須項目を入力してください' }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}

	const { name, email, inquiryType, phone, message } = formData;
	const inquiryLabel = INQUIRY_TYPE_LABELS[inquiryType] ?? '未選択';

	const resend = new Resend(resendApiKey);

	try {
		await resend.emails.send({
			from: 'お問い合わせフォーム <onboarding@resend.dev>',
			to: contactEmail,
			subject: `【お問い合わせ】${name}様より`,
			html: `
				<h2>お問い合わせがありました</h2>
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

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Resend error:', error);
		return new Response(
			JSON.stringify({ success: false, error: 'メール送信に失敗しました' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
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

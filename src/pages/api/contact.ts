import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { RateLimiter } from '../../lib/rate-limit';
import {
	escapeHtml,
	getInquiryTypeLabel,
	isValidContactFormData,
	validateContactForm,
} from '../../lib/validation';

const rateLimiter = new RateLimiter();
const FROM_EMAIL = 'うぇぶまか <admin@webmaka.com>';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, clientAddress }) => {
	rateLimiter.cleanup();

	const ip = clientAddress || request.headers.get('cf-connecting-ip') || 'unknown';
	if (rateLimiter.isLimited(ip)) {
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

	const validation = validateContactForm(formData);
	if (!validation.valid) {
		return new Response(
			JSON.stringify({
				success: false,
				error: '必須項目を入力してください',
				errors: validation.errors,
			}),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	}

	if (!isValidContactFormData(formData)) {
		return new Response(JSON.stringify({ success: false, error: '不正なデータです' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const { name, email, inquiryType, phone, message, sourceUrl } = formData;
	const inquiryLabel = getInquiryTypeLabel(inquiryType);

	const resend = new Resend(resendApiKey);

	try {
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

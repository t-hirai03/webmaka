import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RateLimiter } from './rate-limit';

describe('RateLimiter', () => {
	let rateLimiter: RateLimiter;

	beforeEach(() => {
		vi.useFakeTimers();
		rateLimiter = new RateLimiter({ windowMs: 60000, maxRequests: 3 });
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('最初のリクエストは許可される', () => {
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
	});

	it('制限内のリクエストは許可される', () => {
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
	});

	it('制限を超えたリクエストは拒否される', () => {
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(true);
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(true);
	});

	it('異なるIPは別々にカウントされる', () => {
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(true);

		// 別のIPは制限されていない
		expect(rateLimiter.isLimited('192.168.1.2')).toBe(false);
	});

	it('ウィンドウ期間後はリセットされる', () => {
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(true);

		// 1分経過
		vi.advanceTimersByTime(60001);

		// リセットされているので許可される
		expect(rateLimiter.isLimited('192.168.1.1')).toBe(false);
	});

	it('cleanupで期限切れのレコードが削除される', () => {
		rateLimiter.isLimited('192.168.1.1');
		rateLimiter.isLimited('192.168.1.2');
		expect(rateLimiter.size).toBe(2);

		// 1分経過
		vi.advanceTimersByTime(60001);

		rateLimiter.cleanup();
		expect(rateLimiter.size).toBe(0);
	});

	it('clearで全レコードが削除される', () => {
		rateLimiter.isLimited('192.168.1.1');
		rateLimiter.isLimited('192.168.1.2');
		expect(rateLimiter.size).toBe(2);

		rateLimiter.clear();
		expect(rateLimiter.size).toBe(0);
	});

	it('カスタム設定でインスタンス化できる', () => {
		const customLimiter = new RateLimiter({ windowMs: 1000, maxRequests: 1 });

		expect(customLimiter.isLimited('192.168.1.1')).toBe(false);
		expect(customLimiter.isLimited('192.168.1.1')).toBe(true);

		vi.advanceTimersByTime(1001);
		expect(customLimiter.isLimited('192.168.1.1')).toBe(false);
	});
});

/**
 * レート制限のユーティリティ
 */

export interface RateLimitConfig {
	windowMs: number;
	maxRequests: number;
}

export interface RateLimitRecord {
	count: number;
	resetTime: number;
}

export const DEFAULT_RATE_LIMIT_CONFIG: RateLimitConfig = {
	windowMs: 60 * 1000, // 1分
	maxRequests: 3, // 1分あたりの最大リクエスト数
};

/**
 * レート制限マネージャー
 * テスト可能な形でレート制限を管理
 */
export class RateLimiter {
	private records = new Map<string, RateLimitRecord>();
	private config: RateLimitConfig;

	constructor(config: RateLimitConfig = DEFAULT_RATE_LIMIT_CONFIG) {
		this.config = config;
	}

	/**
	 * レート制限をチェック
	 * @returns true: 制限中、false: 許可
	 */
	isLimited(key: string): boolean {
		const now = Date.now();
		const record = this.records.get(key);

		if (!record || now > record.resetTime) {
			this.records.set(key, { count: 1, resetTime: now + this.config.windowMs });
			return false;
		}

		if (record.count >= this.config.maxRequests) {
			return true;
		}

		record.count++;
		return false;
	}

	/**
	 * 期限切れのレコードをクリーンアップ
	 */
	cleanup(): void {
		const now = Date.now();
		for (const [key, record] of this.records.entries()) {
			if (now > record.resetTime) {
				this.records.delete(key);
			}
		}
	}

	/**
	 * 全レコードをクリア（テスト用）
	 */
	clear(): void {
		this.records.clear();
	}

	/**
	 * 現在のレコード数を取得（テスト用）
	 */
	get size(): number {
		return this.records.size;
	}
}

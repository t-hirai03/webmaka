/** @type {import('@lhci/cli').Config} */
export default {
	ci: {
		collect: {
			staticDistDir: './dist',
			url: ['/', '/about/', '/contact/'],
			numberOfRuns: 3,
		},
		assert: {
			// presetを使わず、カテゴリスコアのみをチェック
			assertions: {
				// カテゴリスコア（CI環境では閾値を緩和）
				'categories:performance': ['warn', { minScore: 0.5 }],
				'categories:accessibility': ['error', { minScore: 0.9 }],
				'categories:best-practices': ['warn', { minScore: 0.8 }],
				'categories:seo': ['warn', { minScore: 0.9 }],
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};

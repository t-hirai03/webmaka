module.exports = {
	ci: {
		collect: {
			staticDistDir: './dist',
			url: ['/', '/about', '/contact'],
		},
		assert: {
			assertions: {
				// ローカル環境での計測のため、パフォーマンスは緩めに設定
				'categories:performance': ['warn', { minScore: 0.5 }],
				'categories:accessibility': ['error', { minScore: 0.9 }],
				'categories:best-practices': ['error', { minScore: 0.9 }],
				'categories:seo': ['error', { minScore: 0.9 }],
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};

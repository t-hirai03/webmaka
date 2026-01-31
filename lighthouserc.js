/** @type {import('@lhci/cli').Config} */
export default {
	ci: {
		collect: {
			staticDistDir: './dist',
			url: ['/', '/about/', '/contact/'],
			numberOfRuns: 3,
		},
		assert: {
			preset: 'lighthouse:no-pwa',
			assertions: {
				'categories:performance': ['warn', { minScore: 0.9 }],
				'categories:accessibility': ['error', { minScore: 0.9 }],
				'categories:best-practices': ['warn', { minScore: 0.9 }],
				'categories:seo': ['warn', { minScore: 0.9 }],
				// 静的サイトで発生しやすい警告を緩和
				'unused-css-rules': 'off',
				'unused-javascript': 'off',
				'unminified-css': 'off',
				'unminified-javascript': 'off',
				'network-dependency-tree-insight': 'off',
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};

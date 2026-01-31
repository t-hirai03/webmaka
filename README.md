# うぇぶまか

Webサイト制作・LP制作サービスのポートフォリオサイト

## URL

<https://webmaka.com/>

## 開発

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド（型チェック含む）
npm run build

# lint/format チェック
npm run lint

# lint/format 自動修正
npm run lint:fix

# Storybook起動
npm run storybook

# Storybookビルド
npm run build-storybook
```

## Storybook

UIコンポーネントのカタログ・ドキュメント

<https://storybook.webmaka.com/>

- mainブランチへのマージで自動デプロイ
- ローカルでは `npm run storybook` で起動（localhost:6006）

## 技術スタック

| 項目 | 技術 |
| --- | --- |
| フレームワーク | Astro 5 |
| CSS | Tailwind CSS v4 |
| Linter/Formatter | Biome |
| UIカタログ | Storybook 10 |
| ホスティング | Cloudflare Pages |
| CI | GitHub Actions |
| Node.js | v22 |

## サイト構成

| ページ | パス | 内容 |
| --- | --- | --- |
| トップ | `/` | サービス説明、制作フロー、実績、お問い合わせ |
| About | `/about` | 運営者プロフィール、スキル |
| お問い合わせ | `/contact` | フォーム入力 → 確認 → 送信完了 |
| サンプル集 | `/samples` | UIコンポーネントのサンプル一覧 |
| 404 | `/404` | カスタム404ページ |

## ディレクトリ構成

```text
src/
├── assets/          # 画像（Astro Image最適化対象）
├── components/      # Astroコンポーネント
│   └── ui/          # 再利用可能なUIコンポーネント
├── layouts/         # レイアウト
├── pages/           # ページ（ファイルベースルーティング）
│   ├── api/         # APIエンドポイント（お問い合わせ送信）
│   └── contact/     # お問い合わせフロー
├── stories/         # Storybookストーリー
└── styles/          # Tailwind CSS設定
```

## UIコンポーネント

`src/components/ui/` に再利用可能なコンポーネントを配置

| コンポーネント | 用途 |
| --- | --- |
| Button | ボタン（variant: primary/secondary/outline） |
| Badge | バッジ・タグ表示 |
| SectionTitle | セクションタイトル |
| Heading | 見出し（h1〜h6） |
| ServiceCard | サービス紹介カード |
| FlowCard | 制作フローカード |
| WorkCard | 実績カード |
| SkillItem | スキル項目 |
| ContactProgress | お問い合わせステップ表示 |
| FormField | フォームフィールドラッパー |
| Input | テキスト入力 |
| Textarea | テキストエリア |
| Select | セレクトボックス |

## デザイン

### カラースキーム

| 用途 | カラーコード |
| --- | --- |
| 背景（メイン） | `#F7F4E9` |
| 背景（セクション） | `#F5F0E8` |
| メインカラー | `#3D8B6E` |
| アクセント | `#E8A87C` |
| テキスト | `#374151` |
| サブテキスト | `#6B7280` |

### 特徴

- 温かみのある背景色
- 落ち着いた緑をメインに使用
- 柔らかく、相談しやすい雰囲気

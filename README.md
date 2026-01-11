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
```

## 技術スタック

| 項目 | 技術 |
| --- | --- |
| フレームワーク | Astro 5 |
| CSS | Tailwind CSS v4 |
| Linter/Formatter | Biome |
| ホスティング | Cloudflare Pages |
| CI | GitHub Actions |
| Node.js | v22 |

## サイト構成

| ページ | パス | 内容 |
| --- | --- | --- |
| トップ | `/` | サービス説明、制作フロー、実績、お問い合わせ |
| About | `/about` | 運営者プロフィール、スキル |
| お問い合わせ | `/contact` | フォーム入力 → 確認 → 送信完了 |

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
└── styles/          # Tailwind CSS設定
```

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

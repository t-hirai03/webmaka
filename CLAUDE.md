# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

```bash
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

- **フレームワーク**: Astro（静的出力）
- **CSS**: Tailwind CSS v4
- **Linter/Formatter**: Biome
- **ホスティング**: Cloudflare Pages
- **CI**: GitHub Actions（lint, typecheck, build, lighthouse）

## アーキテクチャ

```text
src/
├── assets/          # 画像（Astro Image最適化対象）
├── components/      # Astroコンポーネント
│   └── ui/          # 再利用可能なUIコンポーネント
├── layouts/         # レイアウト（Layout.astro）
├── pages/           # ページ（ファイルベースルーティング）
│   ├── api/         # APIエンドポイント
│   └── contact/     # お問い合わせフロー
└── styles/          # tailwind.css
```

## CSS規約

### Tailwind CSS

- カスタム値は `[値]` 形式（arbitrary values）を避け、`@theme` で定義して使用する
- `@theme` で定義した変数は用途コメントを付ける
- Tailwind標準にないユーティリティは `@utility` で定義する

```css
/* 良い例 */
@theme {
  --spacing-15: 60px; /* aboutページのセクション余白 */
}

/* 悪い例: arbitrary values */
class="py-[60px]"
```

### @theme定義場所

`src/styles/tailwind.css` に全てのカスタムプロパティを集約

## Biome設定

- インデント: タブ
- 行幅: 100文字
- クォート: シングルクォート
- セミコロン: あり
- import自動整理: 有効

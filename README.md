# アマガミ銚子巡礼ガイド

更新しやすさを優先した、静的な紹介サイトです。Decap CMS を使って `data/site-data.json` を編集できます。

## 変更しやすい場所

- `data/site-data.json`
  - 巡礼スポット
  - モデルコース
  - 銚子の魅力
  - 巡礼マナー
- `styles.css`
  - 見た目とレイアウト
- `app.js`
  - JSON を読んで画面に描画する処理
- `admin/config.yml`
  - Decap CMS の編集対象とフォーム定義
- `admin/index.html`
  - CMS 管理画面の入口

## 開き方

ブラウザで `index.html` を開くか、ローカルサーバーで配信してください。

## CMS の使い方

1. `admin/config.yml` の `backend.repo` を実際の GitHub リポジトリに変更します。
2. `/admin/` を開くと Decap CMS の編集画面が表示されます。
3. 変更は `data/site-data.json` に保存され、トップページに反映されます。

## メモ

Decap CMS の読み込みにはネット接続が必要です。フォントもネット接続がない場合は代替表示になります。

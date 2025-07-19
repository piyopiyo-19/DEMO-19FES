# MNTKFES! Website

本リポジトリは非公式webオンリー(宗拓フェス！) の特設サイトのソースコードです。
HTML/CSS/JavaScript のみで構成された静的サイトとなります。

## 構成

- `index.html` — トップページ
- `howto.html` — 参加方法の案内
- `guideline.html` — サークル参加者向けガイドライン
- `faq.html` — よくある質問
- `links.html` — お役立ちリンク集
- `song_forms.html` — イメソンアンケートフォーム
- `thanks.html` — 送信完了ページ
- `includes/` — 共通ヘッダー・フッターのテンプレート
- `css/` — ページごとのスタイルシート
- `js/` — ページごとのスクリプト
- `images/` — 画像

ヘッダー(`includes/header.html`) とフッター(`includes/footer.html`) は `js/common.js` で `fetch()` して読み込む仕組みになっています。
ブラウザで直接 `file://` を開くと同一生成元制限により読み込みが失敗するためローカル環境で確認する際は簡易サーバーから接続お願いします。

```bash
# 例: Python を使う場合
python3 -m http.server 8000
```

その後ブラウザ上で `http://localhost:8000/` を開くと閲覧できます。

## ライセンス

本リポジトリは非公式ファン活動目的のサンプルとなります。

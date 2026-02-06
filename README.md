# 🌸 ALL Tab URL Exporter

<p align="center">
  <img src="icons/icon128.png" alt="ALL Tab URL Exporter Icon" width="128" height="128">
</p>

<p align="center">
  <strong>現在のウィンドウで開いているすべてのタブURLを一括取得するChrome拡張機能</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#license">License</a>
</p>

---

## ✨ Features

| 機能 | 説明 |
|------|------|
| 🎯 **ウィンドウ単位取得** | 拡張機能を実行したウィンドウのタブのみを取得 |
| 📋 **クリップボードコピー** | ワンクリックでURL一覧をコピー |
| 💾 **テキストファイル保存** | タイムスタンプ付き.txtファイルでダウンロード |
| 📝 **テキストボックス表示** | ポップアップ上でURL一覧を確認・編集可能 |

## 📥 Installation

1. このリポジトリをクローンまたはダウンロード
   ```bash
   git clone https://github.com/investorx/ALL-Tab-URL-Exporter.git
   ```

2. Chromeで `chrome://extensions/` を開く

3. 右上の **「デベロッパーモード」** をON

4. **「パッケージ化されていない拡張機能を読み込む」** をクリック

5. ダウンロードした `ALL-Tab-URL-Exporter` フォルダを選択

## 🚀 Usage

1. Chromeツールバーの拡張機能アイコン 🌸 をクリック
2. 現在のウィンドウのタブURL一覧が自動表示されます
3. お好みの方法でエクスポート:
   - **🔄 再取得** - URLリストを更新
   - **📋 コピー** - クリップボードにコピー
   - **💾 ダウンロード** - `tab-urls_YYYY-MM-DD_HH-MM-SS.txt` として保存

## 🎨 Design

桜ピンク (#ff6b9d) をメインカラー、ネオンブルー (#00d4ff) をアクセントとしたモダンなUIデザイン。

## 📁 File Structure

```
ALL-Tab-URL/
├── manifest.json      # Chrome拡張機能マニフェスト (Manifest V3)
├── popup.html         # ポップアップUI
├── popup.css          # スタイルシート
├── popup.js           # 機能実装
├── icons/
│   ├── icon16.png     # 16x16 アイコン
│   ├── icon48.png     # 48x48 アイコン
│   └── icon128.png    # 128x128 アイコン
└── README.md
```

## 🍣 License

```
            ___
           /   \
          | 🍣 |
           \___/
     
  SUSHIWARE LICENSE

  This software is provided "as is", without warranty of any kind.
  
  If you meet the author and you like this software,
  you can buy them a sushi as a token of appreciation. 🍣
  
  © 2026 ALL Tab URL Exporter
```

---

<p align="center">
  Made with 💖 and 🍣
</p>

/**
 * ALL Tab URL Exporter - Popup Script
 * 現在のウィンドウのすべてのタブURLを取得・エクスポートする機能を提供
 */

/**
 * DOM要素の参照
 * @type {Object}
 */
const elements = {
    urlList: document.getElementById('urlList'),
    tabCount: document.getElementById('tabCount'),
    refreshBtn: document.getElementById('refreshBtn'),
    copyBtn: document.getElementById('copyBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    notification: document.getElementById('notification'),
};

/**
 * 通知を表示する
 * @param {string} message - 表示するメッセージ
 * @param {string} type - 通知タイプ ('success' | 'error')
 * @param {number} duration - 表示時間（ミリ秒）
 * @returns {void}
 */
function showNotification(message, type = 'success', duration = 2500) {
    elements.notification.textContent = message;
    elements.notification.className = `notification ${type}`;

    // 表示アニメーション
    setTimeout(() => {
        elements.notification.classList.remove('hidden');
    }, 10);

    // 自動で非表示
    setTimeout(() => {
        elements.notification.classList.add('hidden');
    }, duration);
}

/**
 * 現在のウィンドウのすべてのタブURLを取得する
 * @returns {Promise<string[]>} タブURLの配列
 * @throws {Error} タブ取得に失敗した場合
 */
async function getAllTabUrls() {
    try {
        // 現在のウィンドウのタブのみを取得
        const tabs = await chrome.tabs.query({ currentWindow: true });

        // URLのみを抽出（chrome://などの内部ページも含む）
        const urls = tabs.map(tab => tab.url).filter(url => url);

        return urls;
    } catch (error) {
        console.error('タブURLの取得に失敗しました:', error);
        throw new Error('タブURLの取得に失敗しました');
    }
}

/**
 * URLリストをテキストエリアに表示し、タブ数を更新する
 * @returns {Promise<void>}
 */
async function displayUrls() {
    try {
        const urls = await getAllTabUrls();

        // テキストエリアに表示（1行1URL）
        elements.urlList.value = urls.join('\n');

        // タブ数を更新
        elements.tabCount.textContent = urls.length;

    } catch (error) {
        elements.urlList.value = '';
        elements.tabCount.textContent = '0';
        showNotification(error.message, 'error');
    }
}

/**
 * URLリストをクリップボードにコピーする
 * @returns {Promise<void>}
 */
async function copyToClipboard() {
    const text = elements.urlList.value;

    if (!text.trim()) {
        showNotification('コピーするURLがありません', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        showNotification('✓ クリップボードにコピーしました！', 'success');
    } catch (error) {
        console.error('クリップボードへのコピーに失敗しました:', error);

        // フォールバック: 古い方法でコピー
        try {
            elements.urlList.select();
            document.execCommand('copy');
            showNotification('✓ クリップボードにコピーしました！', 'success');
        } catch (fallbackError) {
            showNotification('コピーに失敗しました', 'error');
        }
    }
}

/**
 * URLリストをテキストファイルとしてダウンロードする
 * @returns {void}
 */
function downloadAsTextFile() {
    const text = elements.urlList.value;

    if (!text.trim()) {
        showNotification('ダウンロードするURLがありません', 'error');
        return;
    }

    // 現在の日時をファイル名に含める
    const now = new Date();
    const timestamp = now.toISOString()
        .replace(/[:.]/g, '-')
        .replace('T', '_')
        .slice(0, 19);
    const filename = `tab-urls_${timestamp}.txt`;

    // Blob作成
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    // ダウンロードリンク作成・クリック
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.style.display = 'none';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // URL解放
    URL.revokeObjectURL(url);

    showNotification(`✓ ${filename} をダウンロードしました！`, 'success');
}

/**
 * URLリストを再取得する
 * @returns {Promise<void>}
 */
async function refreshUrls() {
    elements.refreshBtn.disabled = true;
    elements.urlList.placeholder = 'URLを取得中...';

    await displayUrls();

    elements.refreshBtn.disabled = false;
    showNotification('✓ URLリストを更新しました！', 'success');
}

/**
 * イベントリスナーを設定する
 * @returns {void}
 */
function setupEventListeners() {
    elements.refreshBtn.addEventListener('click', refreshUrls);
    elements.copyBtn.addEventListener('click', copyToClipboard);
    elements.downloadBtn.addEventListener('click', downloadAsTextFile);
}

/**
 * 初期化処理
 * @returns {void}
 */
function init() {
    setupEventListeners();
    displayUrls();
}

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', init);

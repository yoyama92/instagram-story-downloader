const butonId = "download-button";

if (document.getElementById(butonId) == null) {
  /**
   * ボタンを追加する。
   */
  function appendButton() {
    const el = document.querySelector("div._8p8kF");
    if (el == null) {
      // ボタンを追加するノードがなければ、1秒待ってから再実行する。
      setTimeout(appendButton, 1000);
      return;
    }

    if (document.getElementById(butonId) == null) {
      const downloadButton = createDownloadButton()
      el.appendChild(downloadButton);
    }
  }

  appendButton();
}


/**
 * ダウンロードボタンのelementを生成する。
 * @returns ダウンロードボタン
 */
function createDownloadButton() {
  const button = document.createElement("button");
  button.innerText = "保存";
  button.id = butonId
  button.addEventListener("click", () => {
    const url = getUrl();
    // 末尾を取得してファイル名にする。
    const filename = url.pathname.split("/").slice(-1)[0];

    // ユーザー名はURLから取得する。
    const username = location.pathname.split("/")[2];
    downloadFromUrl(url, `${username}_${filename}`);
  });
  return button;
}

/**
 * 対象URLのファイルをダウンロードする。
 * @param {*} url ダウンロードするファイルのURL
 * @param {*} fileName ダウンロードするファイルに設定する名前
 */
function downloadFromUrl(url, fileName) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function (e) {
    if (this.status == 200) {
      const url = (window.URL || window.webkitURL).createObjectURL(this.response);
      const download = document.createElement('a');
      download.href = url;
      download.download = fileName;
      download.click();
      (window.URL || window.webkitURL).revokeObjectURL(url);
    }
  };
  xhr.send();
}

/**
 * ストーリーのURLを取得する。
 * @returns ストーリーのURL
 */
function getUrl() {
  // ストーリーが動画の場合の対応。
  const video = document.querySelector("video.y-yJ5");
  if (video) {
    return new URL(video.children[0].src)
  } else {
    return new URL(document.querySelector("img.y-yJ5").src);
  }
}

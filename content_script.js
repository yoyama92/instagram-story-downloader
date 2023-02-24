(() => {
  const buttonId = "download-button";

  /**
   * ボタンを追加する。
   */
  const appendDownloadButton = () => {
    const el = document.querySelector("div._ac0m");
    if (el == null) {
      // ボタンを追加するノードがなければ、1秒待ってから再実行する。
      setTimeout(appendDownloadButton, 1000);
      return;
    }

    if (document.getElementById(buttonId) == null) {
      const downloadButton = createDownloadButtonElement();
      el.appendChild(downloadButton);
    }
  };

  /**
   * ダウンロードボタンのelementを生成する。
   * @returns ダウンロードボタン
   */
  const createDownloadButtonElement = () => {
    const button = document.createElement("button");
    button.innerText = "保存";
    button.id = buttonId;
    button.addEventListener("click", async () => {
      const url = getUrl();
      if (!url) {
        alert("ファイルを取得できませんでした。");
        return;
      }
      // 末尾を取得してファイル名にする。
      const filename = url.pathname.split("/").slice(-1)[0];

      // ユーザー名はURLから取得する。
      const username = location.pathname.split("/")[2];
      await downloadFromUrl(url, `${username}_${filename}`);
    });
    return button;
  };

  /**
   * 対象URLのファイルをダウンロードする。
   * @param {*} url ダウンロードするファイルのURL
   * @param {*} fileName ダウンロードするファイルに設定する名前
   */
  const downloadFromUrl = async (url, fileName) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = (window.URL || window.webkitURL).createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.setAttribute("href", blobUrl);
    anchor.setAttribute("download", fileName);
    anchor.click();
    (window.URL || window.webkitURL).revokeObjectURL(blobUrl);
  };

  /**
   * ストーリーのURLを取得する。
   * @returns ストーリーのURL
   */
  const getUrl = () => {
    // ストーリーが動画の場合の対応。
    const video = document.querySelector("video._aa63");
    if (video) {
      return new URL(video.children[0].src);
    } else {
      return new URL(document.querySelector("img._aa63").src);
    }
  };

  if (document.getElementById(buttonId) == null) {
    appendDownloadButton();
  }
})();

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  if (tab.url == null) {
    return;
  }

  if (info.status === "complete" && tab.url.indexOf("https://www.instagram.com/stories") > -1) {
    chrome.scripting.executeScript({
      target: {
        tabId: tabId
      },
      files: ['content_script.js'],
    });
  }
});
chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  if (tab.url == null) {
    return;
  }

  const isComplate = (status) => {
    return status === "complete";
  };

  const isStoriesPage = (url) => {
    if (url == null) {
      return false;
    }
    return url.indexOf("https://www.instagram.com/stories") > -1;
  };

  if (isComplate(info.status) && isStoriesPage(tab.url)) {
    chrome.scripting.executeScript({
      target: {
        tabId: tabId,
      },
      files: ["content_script.js"],
    });
  }
});

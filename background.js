const isCompleted = (status) => {
  return status === "complete";
};

const isStoriesPage = (url) => {
  if (url == null) {
    return false;
  }
  return url.indexOf("https://www.instagram.com/stories") > -1;
};

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (!isCompleted(info.status)) {
    return;
  }

  if (!isStoriesPage(tab.url)) {
    return;
  }

  chrome.scripting.executeScript({
    target: {
      tabId: tabId,
    },
    files: ["content_script.js"],
  });
});

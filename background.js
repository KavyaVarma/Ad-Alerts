chrome.runtime.onInstalled.addListener(() => {
  sponsorship_results = {}
  chrome.storage.sync.set({ sponsorship_results })
});


chrome.runtime.onMessage.addListener(
  function(sponsorship_result, sender, sendResponse) {
    chrome.storage.sync.get("sponsorship_results", ({ sponsorship_results }) => {
      sponsorship_results[sender.tab.url] = sponsorship_result
      // console.log(sender)
      chrome.storage.sync.set({ sponsorship_results })
    });
    sendResponse({});
  }
);
chrome.runtime.onMessage.addListener(
  (message: { type: string; tabId: number }, _sender, _sendResponse) => {
    if (message.type === "ACTIVATE") {
      console.log('ACTIVATE')
      chrome.scripting.executeScript({
        target: { tabId: message.tabId },
        files: ["content.js"] // will be built from content.ts
      });
    }
  }
);
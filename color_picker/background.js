let color = '#3aa757';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color }, function () {
    console.log('The color is green.');
  });
});
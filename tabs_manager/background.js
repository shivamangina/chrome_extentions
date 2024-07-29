chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log('request: ', request);
    if(request.message === "getTabs"){
        chrome.tabs.query({}, function(tabs){
            sendResponse(tabs);
        });
        return true;
    }
});
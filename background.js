'use strict';
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        return {redirectUrl: chrome.extension.getURL('index.html')};
    },
    {
        urls: [
            "*://*.baidu.com/*"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);



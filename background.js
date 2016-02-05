'use strict';

var EVIL_RULES = JSON.parse(localStorage.getItem('EVIL_RULES')) || [],
    i = 0,
    len= EVIL_RULES.length,
    rules = [];

for(i= 0; i< len; i+=1){
    rules.push(EVIL_RULES[i].value);
}

console.log(rules,"rules")
if(rules.length){
    chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            console.log(details,"details")
            return {redirectUrl: chrome.extension.getURL('index.html')};
        },
        {
            urls: rules,
            types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
        },
        ["blocking"]
    );
}




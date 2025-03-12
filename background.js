chrome.runtime.onInstalled.addListener(() => {
    console.log("AI Career Mapping Tool Installed Successfully!");
});
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        console.log("Intercepted request:", details.url);
        return { cancel: false };
    },
    { urls: ["https://*.wscubetech.com/*"] },
    ["blocking"]
);

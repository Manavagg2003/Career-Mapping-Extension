chrome.runtime.onInstalled.addListener(() => {
    console.log("AI Career Mapping Tool Extension Installed!");
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: injectCareerMappingButton
    });
});

function injectCareerMappingButton() {
    const careerButton = document.createElement("button");
    careerButton.innerText = "Discover Your Ideal Tech Career";
    careerButton.id = "ai-career-mapping-button";

    careerButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 16px;
        background-color: #007bff;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        font-weight: bold;
        z-index: 9999;`;

    careerButton.onclick = function () {
        window.open("https://your-extension-url.com", "_blank");
    };

    document.body.appendChild(careerButton);
}

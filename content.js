document.addEventListener("DOMContentLoaded", function () {
    function waitForElement(selector, callback, interval = 500, maxAttempts = 10) {
        let attempts = 0;
        const checkExist = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(checkExist);
                callback(element);
            } else if (++attempts >= maxAttempts) {
                clearInterval(checkExist);
                console.warn(`⚠️ Element '${selector}' not found after ${maxAttempts} attempts.`);
            }
        }, interval);
    }

    // Start Career Analysis
    waitForElement("#start-career-analysis", (button) => {
        button.addEventListener("click", function () {
            console.log("🎯 Start Career Analysis button clicked!");
            window.open(chrome.runtime.getURL("career_analysis.html"), "_blank");
        });
    });

    // Launch Tool
    waitForElement("#launch-career-tool", (button) => {
        button.addEventListener("click", function () {
            console.log("🚀 Launch Career Tool button clicked!");
            window.open(chrome.runtime.getURL("career_tool.html"), "_blank");
        });
    });

    console.log("✅ Event listeners added for Career Analysis and Launch Tool buttons.");
});

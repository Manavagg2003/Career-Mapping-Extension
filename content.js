document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Content script loaded successfully!");

    // Utility function to wait for elements
    function waitForElement(selector, callback, interval = 500, maxAttempts = 20) {
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

    // ✅ Fix for "Start Career Analysis"
    waitForElement("#start-career-analysis", (button) => {
        button.addEventListener("click", function () {
            console.log("🎯 Start Career Analysis button clicked!");
            window.open(chrome.runtime.getURL("career_tool.html"), "_blank");
        });
    });
    waitForElement("#launch-career-tool", (button) => {
        button.addEventListener("click", function () {
            console.log("🚀 Launch Tool button clicked!");
            window.open(chrome.runtime.getURL("quiz.html"), "_blank");
        });
    });    

    // ✅ Fix for "Video Consultancy"
    waitForElement("#video-consultancy", (button) => {
        button.addEventListener("click", function () {
            console.log("📹 Video Consultancy button clicked!");
            window.open("https://meet.google.com", "_blank"); // Example URL for demo purposes
        });
    });

    console.log("✅ All event listeners added successfully.");
});

document.getElementById("startAnalysis").addEventListener("click", async () => {
    const response = await fetch("https://your-backend-api.com/analyze-career");
    const data = await response.json();
    document.getElementById("results").innerHTML = `<p>Suggested Career: ${data.career}</p>`;
});

document.getElementById("liveConsultation").addEventListener("click", () => {
    window.open("https://meet.jit.si/AICareerConsultation", "_blank");
});
document.getElementById("openCareerMapping").addEventListener("click", function () {
    try {
        window.open("https://your-extension-url.com", "_blank");
    } catch (error) {
        console.error("Failed to open career mapping tool:", error);
    }
});

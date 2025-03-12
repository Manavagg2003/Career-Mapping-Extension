const API_KEY = "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"; // 🔹 Replace with your OpenAI API Key

const questions = [
    { question: "Which technical domain excites you the most?", options: ["Web Development", "Data Science", "AI/ML", "Cybersecurity", "Cloud Computing"] },
    { question: "How would you describe your coding skills?", options: ["Below Average", "Average", "Above Average"] },
    { question: "Do you prefer hands-on coding or data analysis?", options: ["Coding", "Data Analysis", "Both", "Neither"] },
    { question: "Which work environment suits you best?", options: ["Startups", "Corporate", "Freelancing", "Remote Work", "Research Labs"] },
    { 
        question: "What soft skills do you excel at?", 
        options: ["Problem-solving", "Design", "Communication", "Arithmetic Reasoning", "Teamwork", "Others"] 
    },
    { question: "How comfortable are you with learning new programming languages?", options: ["Very Comfortable", "Somewhat Comfortable", "Not Comfortable"] }
];

let userAnswers = [];
let currentQuestionIndex = 0;

function displayQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    const questionData = questions[currentQuestionIndex];

    let optionsHTML = questionData.options.map(option => {
        if (option === "Others") {
            return `
                <div>
                    <input type="checkbox" name="answer" value="Others" id="others-checkbox" class="option-checkbox">
                    <label for="others-checkbox">Others</label>
                    <textarea id="other-text" style="display:none; width: 100%; height: 50px;" placeholder="Enter your soft skills (max 100 words)" maxlength="600"></textarea>
                </div>`;
        }
        return `
            <div>
                <input type="checkbox" name="answer" value="${option}" class="option-checkbox">
                <label>${option}</label>
            </div>`;
    }).join("");

    quizContainer.innerHTML = `
        <div class="question">
            <p>${questionData.question}</p>
            ${optionsHTML}
        </div>
        <button id="next-question">${currentQuestionIndex === questions.length - 1 ? "Get Career Path" : "Next"}</button>
    `;

    document.getElementById("next-question").addEventListener("click", submitQuiz);

    // Fix for showing/hiding the text box
    const othersCheckbox = document.getElementById("others-checkbox");
    if (othersCheckbox) {
        othersCheckbox.addEventListener("change", function () {
            const otherTextBox = document.getElementById("other-text");
            otherTextBox.style.display = this.checked ? "block" : "none";
        });
    }
}

async function submitQuiz() {
    const selectedOptions = Array.from(document.querySelectorAll('input[name="answer"]:checked'))
                                .map(input => input.value);

    if (selectedOptions.length === 0) {
        alert("Please select at least one option before proceeding.");
        return;
    }

    // Get the custom text if "Others" is selected
    if (selectedOptions.includes("Others")) {
        const otherText = document.getElementById("other-text").value.trim();
        if (otherText.length > 0) {
            selectedOptions[selectedOptions.indexOf("Others")] = `Others: ${otherText}`;
        }
    }

    userAnswers.push(selectedOptions.join(", "));

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        document.getElementById("quiz-container").innerHTML = "<p>Analyzing responses...</p>";
        await getCareerSuggestion();
    }
}

async function getCareerSuggestion() {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a career advisor." },
                    { role: "user", content: `Based on these responses: ${userAnswers.join(", ")}, suggest the best tech career path.` }
                ],
                max_tokens: 300
            })
        });

        const data = await response.json();
        let result = data.choices?.[0]?.message?.content || "Software Engineer (Default) - A versatile career with great opportunities!";

        showLiveConsultationOption(result);
    } catch (error) {
        showLiveConsultationOption("Software Engineer (Default) - A versatile career with great opportunities!");
    }
}

function showLiveConsultationOption(careerPath) {
    document.getElementById("quiz-container").innerHTML = `
        <p><strong>Suggested Career Path:</strong> ${careerPath}</p>
        <p>Do you want to go for a live video consultancy?</p>
        <button id="video-consult-yes">Yes</button>
        <button id="video-consult-no">No</button>
    `;

    document.getElementById("video-consult-yes").addEventListener("click", startVideoCall);
    document.getElementById("video-consult-no").addEventListener("click", showSuccessMessage);
}

function startVideoCall() {
    const uniqueMeetingID = `career_consult_${Math.random().toString(36).substr(2, 9)}`;
    const jitsiMeetURL = `https://meet.jit.si/${uniqueMeetingID}`;

    window.open(jitsiMeetURL, "_blank", "width=800,height=600");
    
    document.getElementById("quiz-container").innerHTML = `
        <p><strong>Your video consultation has started in a new window.</strong></p>
        <p>If the window didn't open, <a href="${jitsiMeetURL}" target="_blank">click here</a> to join manually.</p>
    `;
}

function showSuccessMessage() {
    document.getElementById("quiz-container").innerHTML = `
        <p><strong>Congratulations on securing your career path at WsCube!</strong></p>
        <p>We look forward to working with you.</p>
    `;
}

document.getElementById("launch-quiz").addEventListener("click", function () {
    document.getElementById("quiz-container").style.display = "block";
    displayQuestion();
});
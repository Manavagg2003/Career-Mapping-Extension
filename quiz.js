const API_KEY = "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"; 

const questions = [
    {
        question: "Which tech area interests you the most?",
        options: ["Web Development", "Data Science", "AI/ML", "Cybersecurity", "Cloud Computing"]
    },
    {
        question: "Do you prefer hands-on coding or data analysis?",
        options: ["Coding", "Data Analysis", "Both", "Neither"]
    },
    {
        question: "Which work environment suits you best?",
        options: ["Startups", "Corporate", "Freelancing", "Remote Work", "Research Labs"]
    },
    {
        question: "What skill do you excel at?",
        options: ["Problem-solving", "Design", "Communication", "Mathematics", "Teamwork"]
    },
    {
        question: "How comfortable are you with learning new programming languages?",
        options: ["Very Comfortable", "Somewhat Comfortable", "Not Comfortable"]
    }
];

let userAnswers = [];
let currentQuestionIndex = 0;

function displayQuestion() {
    const quizContent = document.getElementById("quiz-content");
    const questionData = questions[currentQuestionIndex];

    let optionsHTML = questionData.options.map(option =>
        `<div>
            <input type="radio" name="answer" value="${option}" id="${option}">
            <label for="${option}">${option}</label>
        </div>`
    ).join("");

    quizContent.innerHTML = `
        <div class="question">
            <p>${questionData.question}</p>
            ${optionsHTML}
            <button id="submit-quiz" class="btn">Submit Answer</button>
        </div>
    `;

    document.getElementById("submit-quiz").addEventListener("click", submitQuiz);
}
async function submitQuiz() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedOption) {
        alert("Please select an answer before proceeding.");
        return;
    }

    userAnswers.push(selectedOption.value);

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        await getCareerSuggestion();
    }
}
async function getCareerSuggestion() {
    const quizContent = document.getElementById("quiz-content");

    const promptText = `
        Based on these responses: ${userAnswers.join(", ")},
        Suggest the most suitable career path with reasoning.
    `;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,  
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a career advisor." },
                    { role: "user", content: promptText }
                ],
                max_tokens: 300
            })
        });

        const data = await response.json();
        const result = data.choices[0]?.message?.content || "We couldn't determine a suitable career. Please try again.";

        quizContent.innerHTML = `
            <p><strong>Suggested Career Path:</strong> ${result}</p>
        `;
    } catch (error) {
        quizContent.innerHTML = `<p>Error in fetching details due to insufficient data or lack of APIs. Please check the code.</p>`;
    }
}
displayQuestion();

// script.js

const questions = [
    { question: "What is 5 + 7?", answers: [
        { text: "10", correct: false },
        { text: "11", correct: false },
        { text: "12", correct: true },
        { text: "13", correct: false }
    ]},
    { question: "What is 9 × 6?", answers: [
        { text: "52", correct: false },
        { text: "54", correct: true },
        { text: "60", correct: false },
        { text: "63", correct: false }
    ]},
    { question: "What is 16 ÷ 4?", answers: [
        { text: "2", correct: false },
        { text: "3", correct: false },
        { text: "4", correct: true },
        { text: "5", correct: false }
    ]},
    { question: "What is 15 + 25?", answers: [
        { text: "30", correct: false },
        { text: "40", correct: true },
        { text: "45", correct: false },
        { text: "50", correct: false }
    ]},
    { question: "What is 8 × 7?", answers: [
        { text: "54", correct: false },
        { text: "56", correct: true },
        { text: "60", correct: false },
        { text: "63", correct: false }
    ]}
];

let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let timer;
let timeLeft = 30;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    const questionText = document.getElementById("question-text");
    const answerOptions = document.querySelector(".answer-options");
    const timerElement = document.getElementById("timer");

    questionText.textContent = question.question;
    answerOptions.innerHTML = ''; // Clear previous answers

    question.answers.forEach((answer, index) => {
        const label = document.createElement("label");
        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = `question-${currentQuestionIndex}`;
        radioButton.value = index;
        label.appendChild(radioButton);
        label.appendChild(document.createTextNode(answer.text));
        answerOptions.appendChild(label);
    });

    // Reset timer for this question
    timeLeft = 30;
    timerElement.textContent = `Time left: ${timeLeft} seconds`;

    // Start the timer countdown
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

    // Show Submit button only on the last question
    const submitButton = document.querySelector(".submit-btn");
    if (currentQuestionIndex === questions.length - 1) {
        submitButton.classList.remove("hidden");
        document.querySelector(".next-btn").classList.add("hidden");
    } else {
        submitButton.classList.add("hidden");
        document.querySelector(".next-btn").classList.remove("hidden");
    }
}

function updateTimer() {
    const timerElement = document.getElementById("timer");
    timeLeft--;

    if (timeLeft <= 0) {
        clearInterval(timer);
        nextQuestion();
    } else {
        timerElement.textContent = `Time left: ${timeLeft} seconds`;
    }
}

function nextQuestion() {
    const form = document.getElementById("quiz-form");
    const formData = new FormData(form);
    const selectedAnswer = formData.get(`question-${currentQuestionIndex}`);
    
    if (selectedAnswer !== null) {
        userAnswers[currentQuestionIndex] = selectedAnswer;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        submitQuiz();
    }
}

function submitQuiz() {
    let score = 0;

    userAnswers.forEach((answer, index) => {
        if (questions[index].answers[answer].correct) {
            score++;
        }
    });

    document.getElementById("score").textContent = `You scored ${score} out of ${questions.length}.`;
    document.getElementById("quiz-form").classList.add("hidden");
    document.getElementById("score-container").classList.remove("hidden");
}

function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    document.getElementById("quiz-form").classList.remove("hidden");
    document.getElementById("score-container").classList.add("hidden");
    loadQuestion();
}

loadQuestion();

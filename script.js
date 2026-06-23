const quizData = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    id: 2,
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    id: 3,
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: "Django"
  },
  {
    id: 4,
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//"
  },
  {
    id: 5,
    question: "What is the output of 2 + '2' in JavaScript?",
    options: ["4", "22", "NaN", "Error"],
    answer: "22"
  },
  {
    id: 6,
    question: "Which method is used to fetch API data?",
    options: ["getData()", "fetch()", "request()", "apiCall()"],
    answer: "fetch()"
  },
  {
    id: 7,
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Apple"],
    answer: "Netscape"
  },
  {
    id: 8,
    question: "Which keyword is used to declare a variable in JS?",
    options: ["var", "let", "const", "All of the above"],
    answer: "All of the above"
  },
  {
    id: 9,
    question: "What is DOM?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Digital Output Mode",
      "Desktop Oriented Mode"
    ],
    answer: "Document Object Model"
  },
  {
    id: 10,
    question: "Which HTML tag is used for images?",
    options: ["<img>", "<image>", "<pic>", "<src>"],
    answer: "<img>"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let userAnswers = [];

const questionEl = document.getElementById("question");
const questionNumberEl = document.getElementById("questionNumber");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restartBtn");
const timeEl = document.getElementById("time");
const quizContainer = document.getElementById("quiz");

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];

  quizContainer.classList.remove("hidden");
  resultEl.classList.add("hidden");
  restartBtn.classList.add("hidden");

  showQuestion();
}

function showQuestion() {
  clearInterval(timer);

  timeLeft = 30;
  timeEl.textContent = timeLeft;

  const q = quizData[currentQuestion];

  questionNumberEl.textContent =
    `Question ${currentQuestion + 1} of ${quizData.length}`;

  questionEl.textContent = q.question;

  choicesEl.innerHTML = "";

  q.options.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;

    btn.addEventListener("click", () => selectAnswer(choice));

    choicesEl.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(selected) {
  clearInterval(timer);

  const correctAnswer = quizData[currentQuestion].answer;

  userAnswers[currentQuestion] = selected;

  if (selected === correctAnswer) {
    score++;
  }

  Array.from(choicesEl.children).forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = "0.5";
  });

  setTimeout(() => {
    nextQuestion();
  }, 500);
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  showResult();
}

function showResult() {
  quizContainer.classList.add("hidden");

  resultEl.innerHTML = `
    <h2>Your Score: ${score}/${quizData.length}</h2>
  `;

  quizData.forEach((q, index) => {
    const userAns = userAnswers[index] || "Not Attempted";

    const div = document.createElement("div");

    div.innerHTML = `
      <h4>${index + 1}. ${q.question}</h4>
      <p>Correct: ${q.answer}</p>
      <p>Your: ${userAns}</p>
      <hr>
    `;

    resultEl.appendChild(div);
  });

  resultEl.classList.remove("hidden");
  restartBtn.classList.remove("hidden");
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

restartBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);

startQuiz();
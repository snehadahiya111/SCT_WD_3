const questions = [
  {
    question: "1. Which HTML tag is used to define JavaScript?",
    options: ["<script>", "<js>", "<javascript>", "<code>"],
    correct: 0
  },
  {
    question: "2. Which CSS property is used to change text color?",
    options: ["font-color", "color", "text-color", "background-color"],
    correct: 1
  },
  {
    question: "3. Which company developed JavaScript?",
    options: ["Google", "Microsoft", "Netscape", "Apple"],
    correct: 2
  },
  {
    question: "4. Which method is used to print something in console?",
    options: ["print()", "log()", "console.log()", "display()"],
    correct: 2
  },
  {
    question: "5. What does CSS stand for?",
    options: [
      "Colorful Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Computer Style Syntax"
    ],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");

function loadQuestion() {
  feedbackEl.textContent = "";
  answered = false;
  nextBtn.disabled = true;

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.onclick = () => selectAnswer(btn, index);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(button, index) {
  if (answered) return;
  answered = true;

  const correctIndex = questions[currentQuestion].correct;
  const optionButtons = document.querySelectorAll(".option-btn");

  optionButtons.forEach((btn, i) => {
    if (i === correctIndex) btn.classList.add("correct");
    else if (i === index) btn.classList.add("wrong");
    btn.disabled = true;
  });

  if (index === correctIndex) {
    score++;
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "Wrong!";
  }

  nextBtn.disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  scoreEl.textContent = `You scored ${score} / ${questions.length}`;
}

nextBtn.addEventListener("click", nextQuestion);

// Load first question automatically
loadQuestion();

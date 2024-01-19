const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: [
      "Charles Dickens",
      "Jane Austen",
      "William Shakespeare",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctAnswer: "Tokyo",
  },
];

let currentQuestion = 0;
let score = 0;
let timer = 90;
const selectedAnswers = new Array(questions.length).fill(null);

function startQuiz() {
  displayQuestion();
  setInterval(updateTimer, 1000);
}

function displayQuestion() {
  const current = questions[currentQuestion];
  document.getElementById("question").innerHTML = current.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  current.options.forEach((option, index) => {
    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "options";
    radioBtn.value = index;
    radioBtn.id = "option" + index;
    radioBtn.classList.add("option");
    radioBtn.checked = selectedAnswers[currentQuestion] === index;
    optionsContainer.appendChild(radioBtn);

    const label = document.createElement("label");
    label.htmlFor = "option" + index;
    label.innerText = option;
    optionsContainer.appendChild(label);

    optionsContainer.appendChild(document.createElement("br"));
  });

  document.getElementById("question-container").style.display = "block";
}

function checkAnswer() {
  const selectedOption = document.querySelector(
    'input[name="options"]:checked'
  );
  if (selectedOption) {
    selectedAnswers[currentQuestion] = parseInt(selectedOption.value, 10);
  }
}

function prevQuestion() {
  checkAnswer();
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion();
  }
}

function nextQuestion() {
  checkAnswer();
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion();
  }
}

function finishQuiz() {
  checkAnswer();
  calculateScore();
  showResult();
}

function calculateScore() {
  for (let i = 0; i < questions.length; i++) {
    if (
      selectedAnswers[i] !== null &&
      questions[i].correctAnswer === questions[i].options[selectedAnswers[i]]
    ) {
      score++;
    }
  }
}

function showResult() {
  clearInterval(updateTimer);
  document.getElementById("question-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";
  document.getElementById("score").innerText =
    score + " out of " + questions.length;
}

function updateTimer() {
  timer--;
  document.getElementById("timer").innerText = timer;

  if (timer <= 0) {
    finishQuiz();
  }
}

startQuiz();

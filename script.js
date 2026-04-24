// Perguntas do quiz
const questions = [
  {
    question: "Qual número completa a sequência? 3, 6, 12, 24, ?",
    options: ["36", "48", "30", "60"],
    answer: "48"
  },
  {
    question: "Se Maria é mais alta que João e João é mais alto que Ana, quem é o mais baixo?",
    options: ["Maria", "João", "Ana", "Não é possível saber"],
    answer: "Ana"
  },
  {
    question: "Qual figura não pertence ao grupo? 🔺, ⚪, 🟦, 🟩",
    options: ["🔺", "⚪", "🟦", "🟩"],
    answer: "⚪"
  },
  {
    question: "Se hoje é terça-feira, que dia será daqui a 100 dias?",
    options: ["Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    answer: "Quinta-feira"
  },
  {
    question: "Um pato tem 2 patas. Quantas patas têm 5 patos?",
    options: ["5", "10", "15", "20"],
    answer: "10"
  },
  {
    question: "Se todos os quadrados são retângulos e alguns retângulos são azuis, podemos afirmar:",
    options: [
      "Todos os quadrados são azuis",
      "Alguns quadrados podem ser azuis",
      "Nenhum quadrado é azul",
      "Todos os retângulos são quadrados"
    ],
    answer: "Alguns quadrados podem ser azuis"
  },
  {
    question: "Qual número falta? 1, 4, 9, 16, ?",
    options: ["20", "25", "30", "36"],
    answer: "25"
  },
  {
    question: "Se 2 + 2 = 4 e 4 + 4 = 8, então 8 + 8 = ?",
    options: ["12", "14", "16", "18"],
    answer: "16"
  }
];

// Variáveis globais
let score = 0;
let currentQuestion = 0;
let timer;
let timeLeft = 15;
let playerName = "";

// Elementos DOM
const quizContainer = document.getElementById("quiz-container");
const scoreDisplay = document.getElementById("score");
const rankingDisplay = document.getElementById("ranking");
const timerDisplay = document.getElementById("timer");

// Início do jogo
function startGame() {
  playerName = document.getElementById("playerName").value.trim();
  if (!playerName) {
    alert("Digite seu nome para começar!");
    return;
  }
  document.getElementById("player-setup").style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
}

// Exibir pergunta
function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  updateTimer();

  quizContainer.innerHTML = "";
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    const questionEl = document.createElement("h2");
    questionEl.textContent = q.question;
    quizContainer.appendChild(questionEl);

    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(opt);
      quizContainer.appendChild(btn);
    });

    timer = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) {
        clearInterval(timer);
        currentQuestion++;
        showQuestion();
      }
    }, 1000);

  } else {
    quizContainer.innerHTML = "<h2>Fim do Quiz!</h2>";
    updateRanking();
    timerDisplay.textContent = "";
  }
}

// Atualizar timer
function updateTimer() {
  timerDisplay.textContent = "Tempo restante: " + timeLeft + "s";
}

// Verificar resposta
function checkAnswer(selected) {
  clearInterval(timer);
  if (selected === questions[currentQuestion].answer) {
    score++;
    scoreDisplay.textContent = "Pontuação: " + score;
  }
  currentQuestion++;
  showQuestion();
}

// Atualizar ranking
function updateRanking() {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ name: playerName, score: score });

  ranking.sort((a, b) => b.score - a.score);
  ranking = ranking.slice(0, 5);

  localStorage.setItem("ranking", JSON.stringify(ranking));

  rankingDisplay.innerHTML = "";
  ranking.forEach((player, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${player.name} - ${player.score} pontos`;
    rankingDisplay.appendChild(li);
  });
}

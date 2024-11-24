let score = 0;
let currentQuestion = 0;
let currentLevel = 1;
const totalQuestions = 10; // Total de perguntas por nível
const questionsPerLevel = totalQuestions / 6;  // Dividido igualmente por 6 níveis

// Elementos da tela
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const questionElement = document.getElementById('question');
const cardsContainer = document.getElementById('cards-container');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const finalScoreElement = document.getElementById('final-score');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const pauseBtn = document.getElementById('pause-btn');
const pauseMenu = document.getElementById('pause-menu');
const resumeBtn = document.getElementById('resume-btn');
const homeBtn = document.getElementById('home-btn');

// Função para iniciar o jogo
function startGame() {
  score = 0;
  currentQuestion = 0;
  currentLevel = 1;
  scoreElement.textContent = `Pontuação: ${score}`;
  levelElement.textContent = `Nível: ${currentLevel}`;
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  generateQuestion();
}

// Função para gerar uma pergunta de acordo com o nível
function generateQuestion() {
  let num1, num2, operator, questionText, correctAnswer;

  // Ajustar os números com base no nível
  if (currentLevel === 1 || currentLevel === 2) {
    num1 = Math.floor(Math.random() * 5) + 1;  // Números de 1 a 5
    num2 = Math.floor(Math.random() * 5) + 1;  // Números de 1 a 5
  } else if (currentLevel === 3 || currentLevel === 4) {
    num1 = Math.floor(Math.random() * 5) + 6;  // Números de 6 a 10
    num2 = Math.floor(Math.random() * 5) + 6;  // Números de 6 a 10
  } else {
    num1 = Math.floor(Math.random() * 5) + 11; // Números de 11 a 15
    num2 = Math.floor(Math.random() * 5) + 11; // Números de 11 a 15
  }

  // Escolhe aleatoriamente entre soma e subtração
  operator = Math.random() > 0.5 ? '+' : '-';

  // Cria a pergunta e trata para evitar resultados negativos
  if (operator === '+') {
    questionText = `João tem ${num1} pirulitos e ganha mais ${num2} pirulitos. Quantos pirulitos João tem agora?`;
    correctAnswer = num1 + num2;
  } else {
    // Aqui, garantimos que a resposta não seja negativa
    correctAnswer = Math.max(0, num1 - num2);  // Evita que o resultado seja negativo
    questionText = `João tem ${num1} pirulitos e come ${num2} pirulitos. Quantos pirulitos João tem agora?`;
  }

  questionElement.textContent = questionText;

  // Gera 3 respostas erradas
  const answers = [correctAnswer];
  while (answers.length < 4) {
    const wrongAnswer = Math.floor(Math.random() * 20) + 1;
    if (!answers.includes(wrongAnswer)) {
      answers.push(wrongAnswer);
    }
  }

  // Embaralha as respostas
  answers.sort(() => Math.random() - 0.5);

  // Cria as cartas de resposta
  cardsContainer.innerHTML = '';
  answers.forEach(answer => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = answer;
    card.onclick = () => checkAnswer(answer, correctAnswer, card);
    cardsContainer.appendChild(card);
  });
}

// Função para checar a resposta e dar feedback
function checkAnswer(answer, correctAnswer, card) {
  if (answer === correctAnswer) {
    card.classList.add('correct');
    feedbackElement.textContent = 'Resposta Correta!';
    score += 10;
    scoreElement.textContent = `Pontuação: ${score}`;
    currentQuestion++;
  } else {
    card.classList.add('incorrect');
    feedbackElement.textContent = 'Resposta Errada!';
  }

  // Verifica se o jogador terminou o nível
  if (currentQuestion >= questionsPerLevel) {
    currentLevel++;
    currentQuestion = 0;
    levelElement.textContent = `Nível: ${currentLevel}`;
    generateQuestion();
  }
}

// Função para pausar o jogo
function pauseGame() {
  gameScreen.style.display = 'none';
  pauseMenu.style.display = 'block';
}

// Função para continuar o jogo
function resumeGame() {
  pauseMenu.style.display = 'none';
  gameScreen.style.display = 'block';
}

// Função para voltar à tela inicial
function goToHome() {
  pauseMenu.style.display = 'none';
  gameScreen.style.display = 'none';
  startScreen.style.display = 'block';
}

// Função para reiniciar o jogo
function restartGame() {
  score = 0;
  currentLevel = 1;
  scoreElement.textContent = `Pontuação: ${score}`;
  levelElement.textContent = `Nível: ${currentLevel}`;
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  generateQuestion();
}

// Eventos dos botões
startBtn.onclick = startGame;
restartBtn.onclick = restartGame;
pauseBtn.onclick = pauseGame;
resumeBtn.onclick = resumeGame;
homeBtn.onclick = goToHome;

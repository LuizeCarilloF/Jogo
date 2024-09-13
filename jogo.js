const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.framework;

  if (!hasFlippedCard) {
    // First card clicked
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Second card clicked
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    firstCard.textContent = '';
    secondCard.classList.remove('flipped');
    secondCard.textContent = '';

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Shuffle the cards
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

// Seleciona o elemento de áudio e o botão de controle
const music = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');

// Estado inicial: música pausada
let isPlaying = false;

// Função para alternar entre tocar e pausar
function togglePlayPause() {
  if (isPlaying) {
    music.pause();
    playPauseBtn.textContent = 'Play Música'; // Troca o texto do botão
  } else {
    music.play();
    playPauseBtn.textContent = 'Pausar Música'; // Troca o texto do botão
  }
  isPlaying = !isPlaying; // Inverte o estado
}

// Adiciona o evento de clique ao botão
playPauseBtn.addEventListener('click', togglePlayPause);

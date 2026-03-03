let randomNumber = null;
let guessesLeft = 0;
let running = false;

const difficultyEl = document.getElementById("difficulty");
const btnStart = document.getElementById("btnStart");
const gameEl = document.getElementById("game");
const statusEl = document.getElementById("status");
const attemptsLeftEl = document.getElementById("attemptsLeft");
const guessInput = document.getElementById("guessInput");
const btnGuess = document.getElementById("btnGuess");
const btnAgain = document.getElementById("btnAgain");

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setStatus(text) {
  statusEl.textContent = text;
}

function updateAttemptsText() {
  attemptsLeftEl.textContent = `You have ${guessesLeft} attempts to guess the number`;
}

function startGame() {
  randomNumber = randint(1, 100);
  guessesLeft = (difficultyEl.value === "easy") ? 10 : 5;
  running = true;

  gameEl.classList.remove("hidden");
  btnGuess.disabled = false;
  guessInput.disabled = false;

  guessInput.value = "";
  guessInput.focus();

  setStatus("Game started! Make a guess.");
  updateAttemptsText();

  // Se quiser “cheat” igual seu print, descomente:
  // console.log("Shhhh... I'm guessing the number:", randomNumber);
}

function endGame(message) {
  running = false;
  setStatus(message);
  btnGuess.disabled = true;
  guessInput.disabled = true;
}

function handleGuess() {
  if (!running) return;

  const value = Number(guessInput.value);

  if (!Number.isInteger(value) || value < 1 || value > 100) {
    setStatus("Type a valid number between 1 and 100.");
    return;
  }

  if (value === randomNumber) {
    endGame("You guessed the right number. You won the game!!!");
    return;
  }

  // errou: perde tentativa
  guessesLeft -= 1;

  if (guessesLeft <= 0) {
    endGame(`You took all the guesses and didn't get the right number. You lost!!! (Number was ${randomNumber})`);
    return;
  }

  if (value < randomNumber) {
    setStatus(`Too low, you guessed: ${value}`);
  } else {
    setStatus(`Too high, you guessed: ${value}`);
  }

  updateAttemptsText();
  guessInput.select();
}

btnStart.addEventListener("click", startGame);
btnGuess.addEventListener("click", handleGuess);
btnAgain.addEventListener("click", startGame);

guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleGuess();
});

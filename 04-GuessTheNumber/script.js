let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevGuess = [];
let numGuess = 1;
let playGame = true;
//First check if I am qualified to play the game or not

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault(); //prevent yo send the value to server
    const guess = parseInt(userInput.value); //Take the user Input
    console.log(guess);
    validateGuess(guess); //Call the validateGuess() with a parameter
  });
}

function validateGuess(guess) {
  //Check if we give the number correctly or not
  if (isNaN(guess)) {
    alert("Please Enter a valid Number");
  } else if (guess < 1) {
    alert("Enter a number, which is greater than 1");
  } else if (guess > 100) {
    alert("Please enter a number which is less than 100");
  } else {
    prevGuess.push(guess);
    if (numGuess === 11) {
      displayGuess(guess);
      displayMessage(`Game Over. Your Random guess is ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}
function checkGuess(guess) {
  //Here we check where the guess value is higher ,lower or equal to the random value
  if (guess === randomNumber) {
    displayMessage(`You guess the right Number`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Your guess number is too low`);
  } else if (guess > randomNumber) {
    displayMessage(`Your guess number is too high`);
  }
}
function displayGuess(guess) {
  //
  userInput.value = " ";
  guessSlot.innerHTML += `${guess} ,`;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
}
function displayMessage(message) {
  //All DOM Manipulation logic goes here.
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  //
  userInput.value = ""; //clear the value
  userInput.setAttribute("disabled", ""); // set an attribute in key-value pair
  p.classList.add("button");
  p.innerHTML = `<h2 id = "newGame">Start new Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  //
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1); //Generate new randomNumber for new Game
    prevGuess = []; // Clear the all previous guess
    numGuess = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    playGame = true;
  });
}

const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 30,
    lastRandomNumber: -1,
    timerValue: 1000,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = state.values.lastRandomNumber;

  while (randomNumber === state.values.lastRandomNumber) {
    randomNumber = Math.floor(Math.random() * 9);
  }

  state.values.lastRandomNumber = randomNumber;
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if(square.id === state.values.hitPosition) {
        state.values.result++
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        state.values.timerValue -= 12;

        randomSquare();
        clearInterval(state.actions.timerId);
        state.actions.timerId = setInterval(randomSquare, state.values.timerValue);
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
}

initialize();
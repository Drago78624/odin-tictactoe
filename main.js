import "./style.css";

const boxes = document.querySelectorAll(".ttt-box");
const playagainBtn = document.querySelector(".playagain-btn");
const score1 = document.querySelector(".score1");
const score2 = document.querySelector(".score2");


const Player = (name, marker)=>{
  let score = 0
  const getName = ()=> name
  const getMarker = ()=> marker
  const getScore = ()=> score
  const increaseScore = () => score++
  return { getName, getMarker, getScore, increaseScore }
}

const playerOne = Player("Player 1", "X")
const playerTwo = Player("Player 2", "O")

const GameBoard = (() => {
  let gameboard = ["X", "", "", "", "", "", "", "", ""];
  let sign = playerOne.getMarker();
  return {gameboard, sign}
})();

score1.innerText = JSON.parse(sessionStorage.getItem("player1Score"));
score2.innerText = JSON.parse(sessionStorage.getItem("player2Score"));

const Controller = (()=>{
  const player = document.querySelector(".player");
  const overlay = document.querySelector(".overlay");
  const winningPlayer = document.querySelector(".winning-player");
  const draw = document.querySelector(".draw");
  const win = document.querySelector(".win");

  let {gameboard, sign} = GameBoard
  const playAgain = () => {
    boxes.forEach((box, i) => {
      gameboard = ["", "", "", "", "", "", "", "", ""]
      box.innerText = gameboard[i];
      box.style.pointerEvents = "auto";
    });
    overlay.classList.remove("flex");
    overlay.classList.add("hidden");
  }
  function makeMove() {
    gameboard[parseInt(this.dataset.id)] = sign
    console.log(gameboard);
    this.innerText = gameboard[parseInt(this.dataset.id)];
    this.style.pointerEvents = "none";
    sign = sign == playerOne.getMarker() ? playerTwo.getMarker() : playerOne.getMarker();
    onWin();
    player.innerText = player.innerText == "1" ? "2" : "1";
  }

  const setScore = () => {
    sessionStorage.setItem("player1Score", JSON.stringify(playerOne.getScore()));
    sessionStorage.setItem("player2Score", JSON.stringify(playerTwo.getScore()));
    score1.innerText = JSON.parse(sessionStorage.getItem("player1Score"));
    score2.innerText = JSON.parse(sessionStorage.getItem("player2Score"));
  }

  function onWin() {
    if (
      (gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2] && gameboard[0]) ||
      (gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5] && gameboard[3]) ||
      (gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8] && gameboard[6]) ||
      (gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6] && gameboard[0]) ||
      (gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7] && gameboard[1]) ||
      (gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8] && gameboard[2]) ||
      (gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8] && gameboard[0]) ||
      (gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6] && gameboard[2])
    ) {
      winningPlayer.innerText = player.innerText;
      win.classList.remove("hidden");
      win.classList.add("block");
      draw.classList.add("hidden");
      overlay.classList.remove("hidden");
      overlay.classList.add("flex");
      // console.log(player.innerText);
      // console.log(winningPlayer.innerText);
      if (winningPlayer.innerText == "1") {
        playerOne.increaseScore();
        setScore();
      } else if (winningPlayer.innerText == "2") {
        playerTwo.increaseScore();
        setScore();
      }
      console.log(`${player.innerText} wins`);
    } else if (
      gameboard[0] != "" &&
      gameboard[1] != "" &&
      gameboard[2] != "" &&
      gameboard[3] != "" &&
      gameboard[4] != "" &&
      gameboard[5] != "" &&
      gameboard[6] != "" &&
      gameboard[7] != "" &&
      gameboard[8] != ""
    ) {
      console.log("draw");
      win.classList.add("hidden");
      draw.classList.remove("hidden");
      overlay.classList.remove("hidden");
      overlay.classList.add("flex");
    }
  }

  return { playAgain, makeMove }
})()

playagainBtn.addEventListener("click", Controller.playAgain);

boxes.forEach((box) => {
  box.addEventListener("click", Controller.makeMove);
});



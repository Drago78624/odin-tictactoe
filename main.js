import './style.css';

const boxes = document.querySelectorAll('.ttt-box');
const box1 = document.querySelector('.ttt-box-1');
const box2 = document.querySelector('.ttt-box-2');
const box3 = document.querySelector('.ttt-box-3');
const box4 = document.querySelector('.ttt-box-4');
const box5 = document.querySelector('.ttt-box-5');
const box6 = document.querySelector('.ttt-box-6');
const box7 = document.querySelector('.ttt-box-7');
const box8 = document.querySelector('.ttt-box-8');
const box9 = document.querySelector('.ttt-box-9');
const player = document.querySelector('.player');
const overlay = document.querySelector('.overlay');
const winningPlayer = document.querySelector('.winning-player');
const playagainBtn = document.querySelector('.playagain-btn');
const score1 = document.querySelector('.score1');
const score2 = document.querySelector('.score2');
const draw = document.querySelector('.draw');
const win = document.querySelector('.win');

let sign = 'X';

let p1Score = 0;
let p2Score = 0;

score1.innerText = JSON.parse(sessionStorage.getItem('player1Score'));
score2.innerText = JSON.parse(sessionStorage.getItem('player2Score'));

function setScore() {
  sessionStorage.setItem('player1Score', JSON.stringify(p1Score));
  sessionStorage.setItem('player2Score', JSON.stringify(p2Score));
  score1.innerText = JSON.parse(sessionStorage.getItem('player1Score'));
  score2.innerText = JSON.parse(sessionStorage.getItem('player2Score'));
}

playagainBtn.addEventListener('click', () => {
  boxes.forEach((box) => {
    box.innerText = '';
    box.style.pointerEvents = 'auto';
  });
  overlay.classList.remove('flex');
  overlay.classList.add('hidden');
});

boxes.forEach((box) => {
  box.addEventListener('click', onCheck);
});

function onCheck() {
  this.innerText = sign;
  this.style.pointerEvents = 'none';
  sign = sign == 'X' ? 'O' : 'X';
  onWin();
  player.innerText = player.innerText == '1' ? '2' : '1';
}

function onWin() {
  console.log('onWin function started');
  if (
    (box1.innerText == 'X' && box2.innerText == 'X' && box3.innerText == 'X') ||
    (box1.innerText == 'O' && box2.innerText == 'O' && box3.innerText == 'O') ||
    (box1.innerText == 'X' && box5.innerText == 'X' && box9.innerText == 'X') ||
    (box1.innerText == 'O' && box5.innerText == 'O' && box9.innerText == 'O') ||
    (box1.innerText == 'X' && box4.innerText == 'X' && box7.innerText == 'X') ||
    (box1.innerText == 'O' && box4.innerText == 'O' && box7.innerText == 'O') ||
    (box2.innerText == 'X' && box5.innerText == 'X' && box8.innerText == 'X') ||
    (box2.innerText == 'O' && box5.innerText == 'O' && box8.innerText == 'O') ||
    (box2.innerText == 'X' && box5.innerText == 'X' && box8.innerText == 'X') ||
    (box2.innerText == 'O' && box5.innerText == 'O' && box8.innerText == 'O') ||
    (box3.innerText == 'X' && box6.innerText == 'X' && box9.innerText == 'X') ||
    (box3.innerText == 'O' && box6.innerText == 'O' && box9.innerText == 'O') ||
    (box3.innerText == 'X' && box6.innerText == 'X' && box9.innerText == 'X') ||
    (box3.innerText == 'O' && box6.innerText == 'O' && box9.innerText == 'O') ||
    (box3.innerText == 'X' && box5.innerText == 'X' && box7.innerText == 'X') ||
    (box3.innerText == 'O' && box5.innerText == 'O' && box7.innerText == 'O') ||
    (box3.innerText == 'X' && box5.innerText == 'X' && box7.innerText == 'X') ||
    (box3.innerText == 'O' && box5.innerText == 'O' && box7.innerText == 'O') ||
    (box4.innerText == 'X' && box5.innerText == 'X' && box6.innerText == 'X') ||
    (box4.innerText == 'O' && box5.innerText == 'O' && box6.innerText == 'O') ||
    (box4.innerText == 'X' && box5.innerText == 'X' && box6.innerText == 'X') ||
    (box4.innerText == 'O' && box5.innerText == 'O' && box6.innerText == 'O') ||
    (box7.innerText == 'X' && box8.innerText == 'X' && box9.innerText == 'X') ||
    (box7.innerText == 'O' && box8.innerText == 'O' && box9.innerText == 'O') ||
    (box7.innerText == 'X' && box8.innerText == 'X' && box9.innerText == 'X') ||
    (box7.innerText == 'O' && box8.innerText == 'O' && box9.innerText == 'O')
  ) {
    winningPlayer.innerText = player.innerText;
    win.classList.remove('hidden');
    win.classList.add('block');
    draw.classList.add('hidden');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    console.log(player.innerText);
    console.log(winningPlayer.innerText);
    if (winningPlayer.innerText == '1') {
      p1Score++;
      setScore();
    } else if (winningPlayer.innerText == '2') {
      p2Score++;
      setScore();
    }
    console.log(`${player.innerText} wins`);
  } else if (
    box1.innerText != '' &&
    box2.innerText != '' &&
    box3.innerText != '' &&
    box4.innerText != '' &&
    box5.innerText != '' &&
    box6.innerText != '' &&
    box7.innerText != '' &&
    box8.innerText != '' &&
    box9.innerText != ''
  ) {
    console.log('draw');
    win.classList.add('hidden');
    draw.classList.remove('hidden');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
  }
}

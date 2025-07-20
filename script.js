const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const pvpBtn = document.getElementById('pvp');
const aiBtn = document.getElementById('ai');

let cells = [];
let currentPlayer = 'X';
let gameOver = false;
let vsAI = false;

function createBoard() {
  board.innerHTML = '';
  cells = [];
  gameOver = false;
  currentPlayer = 'X';
  statusDiv.textContent = `Turn: ${currentPlayer}`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(e) {
  const cell = e.target;
  if (cell.textContent !== '' || gameOver) return;

  cell.textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    statusDiv.textContent = `${currentPlayer} Wins! 🎉`;
    gameOver = true;
    return;
  }

  if (cells.every(cell => cell.textContent !== '')) {
    statusDiv.textContent = 'Draw 🤝';
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDiv.textContent = vsAI && currentPlayer === 'O' ? 'Computer Thinking...' : `Turn: ${currentPlayer}`;

  if (vsAI && currentPlayer === 'O' && !gameOver) {
    setTimeout(() => aiMove(), 600);
  }
}

function aiMove() {
  const availableCells = cells.filter(c => c.textContent === '');
  if (availableCells.length === 0) return;
  const move = availableCells[Math.floor(Math.random() * availableCells.length)];
  move.textContent = 'O';

  if (checkWinner('O')) {
    statusDiv.textContent = 'Computer Wins! 🤖';
    gameOver = true;
    return;
  }

  if (cells.every(cell => cell.textContent !== '')) {
    statusDiv.textContent = 'Draw 🤝';
    gameOver = true;
    return;
  }

  currentPlayer = 'X';
  statusDiv.textContent = `Turn: ${currentPlayer}`;
}

function checkWinner(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern => pattern.every(i => cells[i].textContent === player));
}

restartBtn.addEventListener('click', createBoard);

pvpBtn.addEventListener('click', () => {
  vsAI = false;
  createBoard();
});

aiBtn.addEventListener('click', () => {
  vsAI = true;
  createBoard();
});

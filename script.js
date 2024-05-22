let currentPlayer = 'X';
let gameActive = true;
const cells = document.querySelectorAll('.cell');
const currentPlayerLabel = document.querySelector('.current-player');
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', cellClicked));
document.querySelector('.reset-btn').addEventListener('click', resetGame);

function cellClicked(event) {
  const clickedCell = event.target;

  if (!gameActive || clickedCell.textContent !== '') return;

  clickedCell.textContent = currentPlayer;
  checkWin();
  togglePlayer();
  updateTurnLabel();
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      gameActive = false;
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
      showWinMessage(cells[a].textContent);
      break;
    }
  }

  if (!gameActive) {
    cells.forEach(cell => {
      cell.removeEventListener('click', cellClicked);
    });
  }
}

function showWinMessage(winner) {
  const resultMessage = `${winner} wins!`;
  const popup = document.querySelector('.popup');
  popup.innerHTML = `<div class="win-popup">
                      <p>${resultMessage}</p>
                      <button class="new-game-btn" onclick="newGame()">New Game</button>
                    </div>`;
  centerPopup();
}

function centerPopup() {
  const popup = document.querySelector('.win-popup');
  const board = document.querySelector('.board');
  const rect = board.getBoundingClientRect();
  const boardCenterX = rect.left + rect.width / 2;
  const boardCenterY = rect.top + rect.height / 2;
  const popupWidth = popup.offsetWidth;
  const popupHeight = popup.offsetHeight;
  
  popup.style.left = `${boardCenterX - popupWidth / 2}px`;
  popup.style.top = `${boardCenterY - popupHeight / 2}px`;
}

function updateTurnLabel() {
  currentPlayerLabel.textContent = currentPlayer;
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
  currentPlayer = 'X';
  gameActive = true;
  currentPlayerLabel.textContent = currentPlayer;
  cells.forEach(cell => {
    cell.addEventListener('click', cellClicked);
  });
}

function newGame() {
  resetGame();
  const popup = document.querySelector('.popup');
  popup.innerHTML = '';
}

const board = document.getElementById('board');
const rollButton = document.getElementById('rollButton');
const message = document.getElementById('message');
const player1PositionText = document.getElementById('player1Position');
const player2PositionText = document.getElementById('player2Position');

let player1Position = 0;
let player2Position = 0;
let currentPlayer = 1;

function createBoard() {
    for (let i = 100; i >= 1; i--) {
        const cell = document.createElement('div');
        cell.innerText = i;
        cell.classList.add('cell');
        board.appendChild(cell);
    }
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function updatePosition(roll) {
    const currentPlayerPosition = currentPlayer === 1 ? player1Position : player2Position;
    const newPosition = currentPlayerPosition + roll;
    if (newPosition > 100) return;

    const currentCell = board.children[100 - currentPlayerPosition];
    const newCell = board.children[100 - newPosition];

    // Move the player in UI
    currentCell.classList.remove('active');
    newCell.classList.add('active');

    setTimeout(() => {
        if (currentPlayer === 1) {
            player1Position = newPosition;
            player1PositionText.innerText = player1Position;
            currentPlayer = 2;
        } else {
            player2Position = newPosition;
            player2PositionText.innerText = player2Position;
            currentPlayer = 1;
        }
        checkWin();
    }, 1000);
}

function checkWin() {
    if (player1Position === 100) {
        message.innerText = 'Player 1 Wins!';
        resetGame();
    } else if (player2Position === 100) {
        message.innerText = 'Player 2 Wins!';
        resetGame();
    }
}

function resetGame() {
    player1Position = 0;
    player2Position = 0;
    player1PositionText.innerText = player1Position;
    player2PositionText.innerText = player2Position;
    const cells = board.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.classList.remove('active');
    }
}

rollButton.addEventListener('click', () => {
    const roll = rollDice();
    updatePosition(roll);
});

createBoard();
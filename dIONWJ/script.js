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
        board.appendChild(cell);
    }
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function updatePosition(roll) {
    if (currentPlayer === 1) {
        player1Position += roll;
        if (player1Position > 100) player1Position = 100;
        player1PositionText.innerText = player1Position;
        currentPlayer = 2;
    } else {
        player2Position += roll;
        if (player2Position > 100) player2Position = 100;
        player2PositionText.innerText = player2Position;
        currentPlayer = 1;
    }
    checkWin();
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
}

rollButton.addEventListener('click', () => {
    const roll = rollDice();
    updatePosition(roll);
});

createBoard();
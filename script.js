const cells = document.querySelectorAll('.cell');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const startOverButton = document.getElementById('startOver');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let scores = { X: 0, O: 0 };

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        if (!gameState[index]) {
            gameState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWin()) {
                scores[currentPlayer]++;
                updateScores();
                alert(`${currentPlayer} wins!`);
                resetGame();
            } else if (gameState.every(cell => cell)) {
                alert('Draw!');
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

startOverButton.addEventListener('click', resetGame);

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => gameState[index] === currentPlayer);
    });
}

function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function resetGame() {
    gameState = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

// Initialize Firebase
const firebaseConfig = {
    // Your Firebase config here
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
const gameState = Array(9).fill(null);

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        if (!gameState[index]) {
            gameState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            database.ref('gameState').set(gameState);
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

database.ref('gameState').on('value', snapshot => {
    const state = snapshot.val();
    if (state) {
        state.forEach((value, index) => {
            cells[index].textContent = value;
        });
    }
});

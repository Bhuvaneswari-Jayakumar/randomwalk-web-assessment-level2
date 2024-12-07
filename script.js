// Initialize variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let scores = { X: 0, O: 0 };
let gameActive = true;

// DOM Elements
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const resetButton = document.getElementById("reset");

// Winning patterns
const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// Handle click on a cell
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");
        checkResult();
    }
}

// Check for a winner or draw
function checkResult() {
    // Check for a win
    for (const pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            message.textContent = `Player ${currentPlayer} Wins!`;
            updateScore(currentPlayer);
            return;
        }
    }

    // Check for a draw
    if (!board.includes("")) {
        gameActive = false;
        message.textContent = "It's a Draw!";
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s Turn`;
}

// Update the score
function updateScore(player) {
    scores[player]++;
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

// Restart the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    message.textContent = "Player X's Turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
}

// Attach event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

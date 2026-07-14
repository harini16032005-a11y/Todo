// function makeBotMove() {
//     // Find all empty cells
//     const emptyCells = [];

//     gameState.forEach((cell, index) => {
//         if (cell === "") {
//             emptyCells.push(index);
//         }
//     });

//     // If no moves are available
//     if (emptyCells.length === 0) {
//         return;
//     }

//     // Select a random empty cell
//     const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];

//     // Update game state
//     gameState[randomMove] = currentPlayer;

//     // Update UI
//     cells[randomMove].textContent = currentPlayer;

//     // Check game result
//     checkWinner();
// }

function makeBotMove() {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === "") {
            gameState[i] = "O";

            let score = minimax(gameState, 0, false);

            gameState[i] = "";

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    gameState[bestMove] = "O";
    cells[bestMove].textContent = "O";

    currentPlayer = "O";
    checkWinner();
}


function minimax(board, depth, isMaximizing) {
    let result = checkWinnerForMinimax(board);

    if (result !== null) {
        return result;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "O";

                let score = minimax(board, depth + 1, false);

                board[i] = "";

                bestScore = Math.max(score, bestScore);
            }
        }

        return bestScore;
    } else {
        let bestScore = Infinity;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "X";

                let score = minimax(board, depth + 1, true);

                board[i] = "";

                bestScore = Math.min(score, bestScore);
            }
        }

        return bestScore;
    }
}

function checkWinnerForMinimax(board) {

    for (let condition of winningConditions) {

        const [a, b, c] = condition;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            if (board[a] === "O") return 10;
            if (board[a] === "X") return -10;
        }
    }

    if (!board.includes("")) {
        return 0;
    }

    return null;
}
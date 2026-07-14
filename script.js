const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const mode = document.getElementById('mode');
const change_mode = document.getElementById('change_mode');

let currentPlayer = "X";
// user can change the mode
let gameMode = "player";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const chagemode = (e)=>{
    if(gameMode == "player"){
        gameMode = "bot"
    }else{
        gameMode=("player")
    }
    mode.innerText=gameMode
    
    change_mode.innerText = gameMode=="bot"?"play with PLAYER":"play with BOT"
    
    restartGame();
    
}
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
});

function cellClicked() {
    const index = this.getAttribute("data-index");

    if (gameState[index] !== "" || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();

   if (gameMode === "bot" && currentPlayer === "O" && gameActive) {
        setTimeout(makeBotMove, 300);
    }
}

function checkWinner() {
    let roundWon = false;

    for (let condition of winningConditions) {
        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];

        if (a === "" || b === "" || c === "") continue;

        if (a === b && b === c) {
            roundWon = true;
            // Highlight the winning cells
                condition.forEach(index => {
                    cells[index].classList.add("winner");
                });
            break;
        }
    }


    if (roundWon) {
      party.confetti(document.body, {
    count: party.variation.range(80, 120),
    spread: 60,
});
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "Game Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["","","","","","","","",""];

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner")
    });
}
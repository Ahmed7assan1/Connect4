var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var cols = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {
            // JS
            row.push(' ');
            // HTML 
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece); // Add click event
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // Drop the piece to the lowest available row in the selected column
    r = findLowestRow(c);
    if (r === -1) {
        // Column is full
        return;
    }

    board[r][c] = currPlayer; // Place the piece in the board array
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    checkWinner();
}

function findLowestRow(c) {
    for (let r = rows - 1; r >= 0; r--) {
        if (board[r][c] == ' ') {
            return r;
        }
    }
    return -1; // If the column is full
}

function checkWinner() {
    checkHorizontal();
    checkVertical();
    checkDiagonal();

    if (gameOver) {
        let winner = currPlayer == playerRed ? "Yellow" : "Red";
        document.getElementById("Winner").innerText = winner + " Wins!";
    }
}

function checkHorizontal() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if (board[r][c] != ' ' && board[r][c] == board[r][c+1] && board[r][c] == board[r][c+2] && board[r][c] == board[r][c+3]) {
                gameOver = true;
                return;
            }
        }
    }
}

function checkVertical() {
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ' && board[r][c] == board[r+1][c] && board[r][c] == board[r+2][c] && board[r][c] == board[r+3][c]) {
                gameOver = true;
                return;
            }
        }
    }
}

function checkDiagonal() {
    // Check diagonal from bottom-left to top-right
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if (board[r][c] != ' ' && board[r][c] == board[r+1][c+1] && board[r][c] == board[r+2][c+2] && board[r][c] == board[r+3][c+3]) {
                gameOver = true;
                return;
            }
        }
    }

    // Check diagonal from top-left to bottom-right
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if (board[r][c] != ' ' && board[r][c] == board[r-1][c+1] && board[r][c] == board[r-2][c+2] && board[r][c] == board[r-3][c+3]) {
                gameOver = true;
                return;
            }
        }
    }
}

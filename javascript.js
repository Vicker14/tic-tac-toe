const GameBoard = (() => {

    const board = [
        "-", "-", "-",
        "-", "-", "-",
        "-", "-", "-"
    ]
    const getBoard = () => board;
    const printBoard = () => {console.log(
        `
        ${board[0]} || ${board[1]} || ${board[2]} \n
        ${board[3]} || ${board[4]} || ${board[5]} \n
        ${board[6]} || ${board[7]} || ${board[8]}
        `
    )}

    const setCell = (index, mark) => {
        if (board[index] === "-") {
            board[index] = mark;
        }
    }

    const reset = () => {
        for (let index = 0; index < board.length; index++) {
            board[index] = "-";
        }
    }

    return {getBoard, setCell, reset, printBoard};

})();

const Player = (pName, mark) => { 
    const playerWins = 0;
    return {pName, mark, playerWins}
};

const GameController = (() => {

    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");

    let currentPlayer = player1;

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const playRound = (index) => {

        if (GameBoard.getBoard()[index] === "-") {

            GameBoard.setCell(index, currentPlayer.mark);
            GameBoard.printBoard();

            if (hasWinner()) {
                console.log(`The winner is ${currentPlayer.pName}`)
                currentPlayer.playerWins++;
                displayPlayers();
                GameController.resetGame();
            } else switchTurn();
        }
        else console.log("Jugada invalida");
    }

    const resetGame = () => {
        GameBoard.reset();
        currentPlayer = player1;
    }

    const hasWinner = () => {
        const board = GameBoard.getBoard();
        if (
            board[0] === board[1] && board[0] === board[2] && board[0] !== "-" ||
            board[3] === board[4] && board[3] === board[5] && board[3] !== "-" ||
            board[6] === board[7] && board[6] === board[8] && board[6] !== "-" ||
        // Check lines
            board[0] === board[3] && board[0] === board[6] && board[0] !== "-" ||
            board[1] === board[4] && board[1] === board[7] && board[1] !== "-" ||
            board[2] === board[5] && board[2] === board[8] && board[2] !== "-" ||
        // Check columns
            board[0] === board[4] && board[0] === board[8] && board[0] !== "-" ||
            board[2] === board[4] && board[2] === board[6] && board[2] !== "-"
        // Check diagonal
        ) return true;

        return false;
    }

    const displayPlayers = () => {
        const p1 = document.querySelector("#player1")
        const p2 = document.querySelector("#player2")
        
        p1.textContent = `${player1.mark} ${player1.pName}: ${player1.playerWins}`
        p2.textContent = `${player2.mark} ${player2.pName}: ${player2.playerWins}`
    }

    return {playRound, resetGame, displayPlayers}
}) ();

GameController.displayPlayers();
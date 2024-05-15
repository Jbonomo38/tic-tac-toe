// Creates playerOne who uses 'X' as their marker
const playerOne = (function() {
    const marker = 'X';
    const getMarker = () => marker;
    return { getMarker };
})();

const playerTwo = (function() {
    const marker = 'O';
    const getMarker = () => marker;
    return { getMarker };
})();

const gameBoard = (function(){
    const board = [null, null, null, null, null, null, null, null, null];
    const setBoard = (index, player) => {
        board[index] === null ? board[index] = player.getMarker() : board[index];
        return board[index];
    };
    const playerMarks = (player) => {
        const toReturn = [];
        for(let i = 0; i < board.length; i++) {
            if(board[i] === player.getMarker()) toReturn.push(i);
        }
        return toReturn;
    };
    return { board, setBoard, playerMarks };
})();

const referee = (function() {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = (gameBoard) => {
        const player1Marks = gameBoard.playerMarks(playerOne);
        const player2Marks = gameBoard.playerMarks(playerTwo);

        for(let i = 0; i < winCombos.length; i++) {
            const combo = winCombos[i];
            if(player1Marks.includes(combo[0]) && player1Marks.includes(combo[1]) && player1Marks.includes(combo[2])) return 'Player One Wins!';
            if(player2Marks.includes(combo[0]) && player2Marks.includes(combo[1]) && player2Marks.includes(combo[2])) return 'Player Two Wins!';
        }
        return 'Tie Game!';
    };

    return { checkWin };
})();

if(!gameBoard.board.includes(null)) {
    console.log(referee.checkWin(gameBoard));
}

let currentPlayer = playerOne;
let inGame = true;

document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('click', (event) => {
    if(inGame) {
        if(cell.textContent === '') {
            cell.textContent = currentPlayer.getMarker();
            gameBoard.setBoard(cell.dataset.index, currentPlayer);
            console.log(gameBoard.board);
            if(referee.checkWin(gameBoard) !== 'Tie Game!' || !gameBoard.board.includes(null)) {
                if(referee.checkWin(gameBoard) === 'Tie Game!') {
                    document.getElementById('current-player').textContent = `Tie Game!`;
                    inGame = false;
                } else {
                    document.getElementById('current-player').textContent = `${currentPlayer.getMarker()} Wins!`
                    inGame = false;
                }
            } else {
                if(currentPlayer === playerOne) {
                currentPlayer = playerTwo;
                } else {   
                currentPlayer = playerOne;
                }
                document.getElementById('current-player').textContent = `Current Player: ${currentPlayer.getMarker()}`
            }
            console.log(referee.checkWin(gameBoard));
        }
    }
    
}));

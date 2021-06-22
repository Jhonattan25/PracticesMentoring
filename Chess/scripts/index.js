let start = document.getElementById('start');
start.addEventListener('click', startGame);

let chessBoard;

let selectedCell = null;
let selectedCellX;
let selectedCellY;

let turn;

function startGame(){
    let rows = parseInt((document.getElementById('rows')).value);
    let columns = parseInt((document.getElementById('columns')).value);
    turn = document.form.piece.value;

    if(rows >= 4 && columns >= 8 && rows % 2 === 0 && columns % 2 === 0){
        (document.getElementById('contentBoard').children)[0].remove();

        chessBoard = buildChessBoard(rows, columns);
        paintChessBoard(chessBoard);
        console.log(chessBoard);
    }else{
        alert('ERROR:\n- El numero de filas o columnas son menor a 8\n- Los numeros no son pares');
    }
}

function buildChessBoard(rows, columns){
    let board = Array(rows);
    let piecesB = ['&#x265C;', '&#x265E;', '&#x265D;', '&#x265B;', '&#x265A;', '&#x265D;', '&#x265E;', '&#x265C;'];
    let piecesW = ['&#x2656;', '&#x2658;', '&#x2657;', '&#x2655;', '&#x2654;', '&#x2657;', '&#x2658;', '&#x2656;'];

    for(let i = 0; i < rows / 2; i++){
        board[i] = [];
        board[rows - i - 1] = [];

        if( i === 0 || i === 1 ){

            for(let j = 0; j < columns; j++){

                if( (j >= (columns / 2) - 4) && (j <= (columns / 2) + 3)){
                    if(i === 0){
                        board[i] = board[i].concat(piecesB);
                        board[rows - i - 1] = board[rows - i - 1].concat(piecesW);
                        j = (columns / 2) + 3;
                    }else{
                        board[i] = board[i].concat(',&#x265F;,&#x265F;'.repeat(4).split(','));
                        board[i].splice(0, 1);
                        board[rows - i - 1] = board[rows - i - 1].concat((',&#x2659;,&#x2659;'.repeat(4).split(',')));
                        board[rows - i - 1].splice(0, 1);
                        j = (columns / 2) + 3;
                    }
                }else{
                    board[i].push('');
                    board[rows - i - 1].push('');
                }
            }
        }else{
            board[i] = (','.repeat(columns-1).split(','));
            board[rows - i - 1] = (','.repeat(columns-1).split(','));
        }
    }
    return board;
}

function paintChessBoard(board){
    let boardHTML = document.getElementById('contentBoard');
    let elementRow;
    let elementColumn;
    let flag = true ;

    for (let i = 0; i < board.length; i++) {
        elementRow = document.createElement('div');
        elementRow.setAttribute('class', 'row');
        boardHTML.appendChild(elementRow);

        for (let j = 0; j < board[0].length; j++) {
            elementColumn = document.createElement('div');
            elementColumn.setAttribute('id', `${i}${j}`);
            elementColumn.setAttribute('class', 'column');

            if(flag)
                elementColumn.setAttribute('class', 'column dark');

            if(board[i][j] != ''){
                elementColumn.setAttribute('onclick', `selectCell(${i}, ${j})`);
            }else{
                elementColumn.setAttribute('onclick', `movePiece(${i}, ${j})`);
            }
            
            elementColumn.innerHTML = board[i][j];
            elementRow.appendChild(elementColumn);
            flag = !flag;
        }
        flag = !flag;
    }
}

function selectCell(x, y){
    if(selectedCell != null){
        selectedCell.style.backgroundColor = null;
    }

    let character = chessBoard[x][y].charAt(chessBoard[x][y].length-2);

    if((turn === 'B' &&  (character.charCodeAt(0) > 64 && character.charCodeAt(0) < 71)) || (turn === 'W' && (character.charCodeAt(0) > 51 && character.charCodeAt(0) < 58))){

        selectedCellX = x;
        selectedCellY = y;
        selectedCell = document.getElementById(`${x}${y}`);
        selectedCell.style.backgroundColor = '#0000ff';
    }
}

function movePiece(x, y){

    if(selectedCell != null){
        let item = document.getElementById(`${x}${y}`);
        item.innerHTML = selectedCell.innerHTML;
        selectedCell.innerHTML = '';

        chessBoard[x][y] = chessBoard[selectedCellX][selectedCellY];
        chessBoard[selectedCellX][selectedCellY] = '';

        selectedCell.style.backgroundColor = null;
        selectedCell.setAttribute('onclick', `movePiece(${selectedCellX}, ${selectedCellY})`);
        selectedCell = null;
        item.setAttribute('onclick', `selectCell(${x}, ${y})`);
        
        turn = turn === 'B' ? 'W' : 'B';
        console.log(chessBoard);
    }
}
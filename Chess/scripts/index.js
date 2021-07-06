let start = document.getElementById('start');
start.addEventListener('click', startGame);

let chessBoard;

let selectedCell = null;
let selectedCellX;
let selectedCellY;

let turn;

/* Funcion que inicia el juego, en el cual se valida el numero de filas y columnas.
Si los datos ingresados son los correctos se llama a la funcion que genera la matriz del tamaño indicado con sus fichas.
Luego pinta la matriz en el documento HTML.
En caso de que las filas y las columnas no sean numeros pares mayor de 7, el programa muestra una alerta indicando que se tuvo un error indicnado que pudo ser alguno de esos dos casos. */
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

// Funcion que genera la matriz del tamaño indicado con las fichas del ajedrez.
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

//Funcion que pinta el table de ajedrez en el documento HTML.
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

// Funcion que selecciona una celda de la tabla del ajedrez, la condicion es que debe tener como elemento una ficha y que sea el turno del color de la ficha
function selectCell(x, y){
    if(selectedCell != null){
        selectedCell.setAttribute('class', selectedCell.getAttribute('class').replace(' flicker', ''));
        selectedCell.style.backgroundColor = null;
    }

    let character = chessBoard[x][y].charAt(chessBoard[x][y].length-2);

    if((turn === 'B' &&  (character.charCodeAt(0) > 64 && character.charCodeAt(0) < 71)) || (turn === 'W' && (character.charCodeAt(0) > 51 && character.charCodeAt(0) < 58))){

        selectedCellX = x;
        selectedCellY = y;
        selectedCell = document.getElementById(`${x}${y}`);
        selectedCell.style.backgroundColor = '#005eff';
        selectedCell.setAttribute('class', `${selectedCell.getAttribute('class')} flicker`);
    }
}

//Funcion que sirve para mover la pieza seleccionada, se debe verificar que las filas o columnas a mover sean las permitifas segun la ficha seleccionada
function movePiece(x, y){

    if(selectedCell != null && checkMovement(x, y)){

        let item = document.getElementById(`${x}${y}`);
        item.innerHTML = selectedCell.innerHTML;
        selectedCell.innerHTML = '';

        chessBoard[x][y] = chessBoard[selectedCellX][selectedCellY];
        chessBoard[selectedCellX][selectedCellY] = '';

        selectedCell.setAttribute('class', selectedCell.getAttribute('class').replace(' flicker', ''));
        selectedCell.style.backgroundColor = null;
        selectedCell.setAttribute('onclick', `movePiece(${selectedCellX}, ${selectedCellY})`);
        selectedCell = null;
        item.setAttribute('onclick', `selectCell(${x}, ${y})`);
        
        turn = turn === 'B' ? 'W' : 'B';
        console.log(chessBoard);
    }
}

function checkMovement(x, y){
    switch (chessBoard[selectedCellX][selectedCellY]) {
        case '&#x2659;':
        case '&#x265F;':
            return checkMovementPawn(x, y);
        case '&#x265E;':
        case '&#x2658;':
            return checkMovementKnight(x, y);
        case '&#x2657;':
        case '&#x265D;':
            return checkMovementBishop(x, y);
        case '&#x2656;':
        case '&#x265C;':
            return checkMovementRook(x, y);
        case '&#x265A;':
        case '&#x2654;':
            return checkMovementKing(x, y);
        case '&#x2655;':
        case '&#x265B;':
            return checkMovementQueen(x, y);
        default:
            return false;
    }
}

//Peon
function checkMovementPawn(x, y){
    let differenceX = x - selectedCellX;
    let differenceY = y - selectedCellY;
    if(chessBoard[selectedCellX][selectedCellY] === '&#x265F;'){
        console.log();
        if((( selectedCellX === 1 && differenceX === 2 ) || differenceX === 1) && differenceY === 0)
        return true;
    }else{
        if((( selectedCellX === (chessBoard.length - 2) && differenceX === -2 ) || differenceX === -1) && differenceY === 0)
        return true;
    }
    return false;
}

// Caballo
function checkMovementKnight(x, y){
    let differenceX = x - selectedCellX;
    let differenceY = y - selectedCellY;

    if((differenceX === 2 || differenceX === -2) && (differenceY === 1 || differenceY === -1))
        return true;

    if((differenceY === 2 || differenceY === -2) && (differenceX === 1 || differenceX === -1))
        return true;

    return false;
}

// Alfil
function checkMovementBishop(x, y){
    let differenceX = x - selectedCellX;
    let differenceY = y - selectedCellY;

    if( differenceX - differenceY === 0 || differenceX + differenceY === 0 )
        return true;

    return false;
}

//Torre
function checkMovementRook(x, y){
    let differenceX = x - selectedCellX;
    let differenceY = y - selectedCellY;

    if((differenceX != 0 || differenceY != 0) && (differenceY === 0 || differenceX === 0))
        return true;

    return false;
}

//Rey
function checkMovementKing(x, y){
    let differenceX = x - selectedCellX;
    let differenceY = y - selectedCellY;

    console.log(differenceX, differenceY);

    if( differenceX > 1 || differenceX < -1 || differenceY > 1 || differenceY < -1 )
        return false;

    return true;
}

//Reina
function checkMovementQueen(x, y){
    if(checkMovementBishop(x, y) || checkMovementRook(x, y))
        return true;

    return false;
}
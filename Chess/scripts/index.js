let chessBoard = buildChessBoard(8, 8);
paintChessBoard(chessBoard);
console.log(chessBoard);

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
            elementColumn.setAttribute('class', 'column');

            if(flag){
                elementColumn.setAttribute('class', 'column dark');
            }
            elementColumn.innerHTML = board[i][j];
            elementRow.appendChild(elementColumn);
            flag = !flag;
        }
        flag = !flag;
    }
}
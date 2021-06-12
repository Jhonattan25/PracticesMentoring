let chessBoard = buildChessBoard(8, 20);
console.log(chessBoard);

function buildChessBoard(rows, columns){
    let board = Array(rows);
    let piecesB = ['B-T', 'B-N', 'B-P', 'B-K', 'B-Q', 'B-P', 'B-N', 'B-T'];
    let piecesW = ['W-T', 'W-N', 'W-P', 'W-K', 'W-Q', 'W-P', 'W-N', 'W-T'];

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
                        board[i] = board[i].concat(',B-P,B-P'.repeat(4).split(','));
                        board[i].splice(0, 1);
                        board[rows - i - 1] = board[rows - i - 1].concat((',W-P,W-P'.repeat(4).split(',')));
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
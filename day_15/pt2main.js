const utils = require('../utilities/js/Utils.js');
const easyStar = require('easystarjs');

//let content = utils.getLineDelimitedFileContent('./sample.txt');
let content = utils.getLineDelimitedFileContent('./input.txt');

let inputBoard = content.map( o => o.split('').map( n => Number(n)));

let board = utils.createGrid(inputBoard.length * 5, inputBoard[0].length * 5);

for (let i = 0; i < board.length; i++)
{
    for (let j = 0; j < board[i].length; j++)
    {
        let modifierY = Math.floor(i / inputBoard.length);
        let modifierX = Math.floor(j / inputBoard[0].length);

        let value = (inputBoard[i % inputBoard.length][j % inputBoard[0].length] + modifierX + modifierY);
        if (value > 9)
        {
            value %= 9;
        }
        board[i][j] = value;
    }
}

let finder = new easyStar.js();

finder.setGrid(board);

let tileTypes = [0,1,2,3,4,5,6,7,8,9];

finder.setAcceptableTiles(tileTypes);

tileTypes.forEach(tile => finder.setTileCost(tile, tile));

finder.findPath(0,0,board[0].length-1,board.length-1,function(path){
    console.log(utils.sumArr(path.map( o => board[o.y][o.x])) - board[0][0]);
});

finder.calculate();
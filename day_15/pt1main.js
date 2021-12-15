const utils = require('../utilities/js/Utils.js');
const easyStar = require('easystarjs');

console.log(easyStar);

//let content = utils.getLineDelimitedFileContent('./sample.txt');
let content = utils.getLineDelimitedFileContent('./input.txt');

let board = content.map( o => o.split('').map( n => Number(n)));

let finder = new easyStar.js();

finder.setGrid(board);

let tileTypes = [0,1,2,3,4,5,6,7,8,9];

finder.setAcceptableTiles(tileTypes);

finder.disableDiagonals();

for (tile of tileTypes)
{
    finder.setTileCost(tile, tile);
}

finder.findPath(0,0,board[0].length-1,board.length-1,function(path){
    console.log(path);
    console.log(utils.sumArr(path.map( o => board[o.y][o.x])) - board[0][0]);
});

finder.calculate();
const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample.txt');
let content = utils.getLineDelimitedFileContent('./input.txt');

let delimit =  content.indexOf('');
let coords = new Set(content.slice(0, delimit));
let instructions = content.slice(delimit + 1, content.length);

for (let inst of instructions)
{
    let parts = inst.split('fold along ')[1].split('=');

    fold(coords, Number(parts[1]), parts[0]);
}

printMap(coords);

function fold(coords, foldLine, axis)
{
    let toFold = [...coords].map(o => utils.strToCoord(o)).filter( o => o[axis] > foldLine );

    for (let coord of toFold)
    {
        coords.delete(utils.coordToStr(coord));
        coord[axis] = foldLine - (coord[axis] - foldLine);
        coords.add( utils.coordToStr(coord) );
    }
}

function printMap(coordSet)
{
    let coords = [...coordSet].map( o => utils.strToCoord(o));
    let sizeX = Math.max(...coords.map( o => o.x)) + 1;
    let sizeY = Math.max(...coords.map( o => o.y)) + 1;

    let grid = ' '.repeat(sizeY).split('').map( o => o.repeat(sizeX).split(''));

    coords.forEach( c => grid[c.y][c.x] = '#');

    console.log(grid.map( row => row.join('')).join('\n'));
}
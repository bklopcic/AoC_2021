const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample.txt');
let content = utils.getLineDelimitedFileContent('./input.txt');

let delimit =  content.indexOf('');
let coords = new Set(content.slice(0, delimit));
let instructions = content.slice(delimit + 1, content.length);

for (let inst of instructions)
{
    let parts = inst.split('fold along ')[1].split('=');
    let axis = parts[0];
    let value = Number(parts[1]);

    if (axis == 'x')
    {
        foldX(coords, value);
    }
    else 
    {
        foldY(coords, value);
    }
}

printMap(coords);

function foldX(coords, foldLine)
{
    let toFold = [...coords].filter( o => Number(o.split(',')[0]) > foldLine );

    for (let coord of toFold)
    {
        coords.delete(coord);
        let x = Number(coord.split(',')[0]);
        coords.add( (foldLine - (x - foldLine)).toString() + ',' + coord.split(',')[1]);
    }
}

function foldY(coords, foldLine)
{
    let toFold = [...coords].filter( o => Number(o.split(',')[1]) > foldLine );

    for (let coord of toFold)
    {
        coords.delete(coord);
        let y = Number(coord.split(',')[1]);
        coords.add( coord.split(',')[0] + ',' + (foldLine - (y - foldLine)).toString());
    }
}

function printMap(coordSet)
{
    let coords = [...coordSet].map( o => {return {x:Number(o.split(',')[0]), y:Number(o.split(',')[1])}});
    let sizeX = Math.max(...coords.map( o => o.x)) + 1;
    let sizeY = Math.max(...coords.map( o => o.y)) + 1;

    let grid = ' '.repeat(sizeY).split('').map( o => o.repeat(sizeX).split(''));

    coords.forEach( c => grid[c.y][c.x] = '#');

    console.log(grid.map( row => row.join('')).join('\n'));
    console.log('---------------');
}
const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample.txt');
let content = utils.getLineDelimitedFileContent('./input.txt');

let delimit =  content.indexOf('');
let coords = new Set(content.slice(0, delimit));
let instructions = content.slice(delimit + 1, content.length);

let parts = instructions[0].split('fold along ')[1].split('=');

fold(coords, Number(parts[1]), parts[0]);

console.log(coords.size);

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
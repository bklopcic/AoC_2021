const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample.txt');
let content = utils.getLineDelimitedFileContent('./input.txt');

let map = content.map( o => o.split('').map( n => Number(n)));

let basinSizes = [];
for (let row = 0; row < map.length; row++)
{
    for (let col = 0; col < map[row].length; col++)
    {
        let basin = findBasin(map, row, col, []);

        basinSizes.push(basin.length);
    }
}

console.log(basinSizes)
console.log(basinSizes.sort( (a,b) => a -b)[basinSizes.length-3] * basinSizes.sort((a,b) => a -b)[basinSizes.length-2] * basinSizes.sort((a,b) => a -b)[basinSizes.length-1]);

function findBasin(map, row, col, beenChecked)
{
    let basin = [];
    if (typeof map[row] === 'undefined' || typeof map[row][col] === 'undefined' || map[row][col] >= 9 || beenChecked.includes(`${row},${col}`))
    {
        return basin;
    }
    else
    {
        beenChecked.push(`${row},${col}`);
        basin.push(map[row][col]);
    }
    if (row > 0)
    {
        if (  map[row - 1][col] > map[row][col])
        {
            //basin.push(map[row - 1][col]);
            basin = basin.concat(findBasin(map, row - 1, col, beenChecked));
        }
    }
    if (col > 0)
    {
        if ( map[row][col - 1] > map[row][col])
        {
            //basin.push(map[row][col - 1]);
            basin = basin.concat(findBasin(map, row, col - 1, beenChecked));
        }
    }
    if (row < map.length-1)
    {
        if (map[row + 1][col] > map[row][col])
        {
            //basin.push(map[row + 1][col]);
            basin = basin.concat(findBasin(map, row + 1, col, beenChecked));
        }
    }
    if (col < map[row].length-1)
    {
        if (map[row][col + 1] > map[row][col])
        {
            //basin.push(map[row][col + 1]);
            basin = basin.concat(findBasin(map, row, col + 1, beenChecked));
        }
    }
    return basin;
}
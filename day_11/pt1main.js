const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample.txt').map( o => o.split(''));
let content = utils.getLineDelimitedFileContent('./input.txt');

let grid = [];
let allTiles = [];

for (let i = 0; i < content.length; i++)
{
    grid[i] = [];
    for (let j = 0; j < content[i].length; j++)
    {
        grid[i][j] = {
            x: j,
            y: i,
            energy: Number(content[i][j])
        };
        allTiles.push(grid[i][j]);
    }
}

let stepCount = 100;
let flashCount = 0
printMap(grid);
for (let  i = 0; i < stepCount; i++)
{
    for (let tile of allTiles)
    {
        tile.energy++;
    }
    flashCount += calcFlashes(allTiles, grid);

    printMap(grid);
}

console.log(flashCount);

function calcFlashes(tiles, map)
{
    let flashes = 0;
    for (let tile of tiles)
    {
        if(tile.energy > 9)
        {
            flashes++;
            tile.energy = 0;
            let neighbors = getNeighbors(tile, map);
            for(let neighbor of neighbors)
            {
                if (neighbor.energy != 0)
                {
                    neighbor.energy++;
                    flashes += calcFlashes(neighbors, map);
                }
            }
        }
    }
    return flashes;
}

function getNeighbors(coord, map)
{
    let deltas = [
        {x:-1, y:-1},{x:0, y:-1},{x:1, y:-1},
        {x:-1, y:0},             {x:1, y:0},
        {x:-1, y:1}, {x:0, y:1}, {x:1, y:1}
    ];

    let neighbors = deltas.filter( delta => typeof map[coord.y + delta.y] !== 'undefined' && typeof map[coord.y + delta.y][coord.x + delta.x] !== 'undefined')
    .map( delta => map[coord.y + delta.y][coord.x + delta.x]);

    return neighbors;
}

function printMap(map)
{
    let grid = "";
    for (let i = 0; i < map.length; i++)
    {
        grid += '\n';
        for (let j = 0; j < map[i].length; j++)
        {
            grid += map[i][j].energy;
        }
    }
    console.log(grid);
}
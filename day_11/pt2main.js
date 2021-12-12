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

let flashCount = 0
count = 0;
while (true)
{
    count++;
    for (let tile of allTiles)
    {
        tile.energy++;
    }
    let flashCount = calcFlashes(allTiles, grid);
    if (flashCount == allTiles.length)
    {
        console.log(count);
        break;
    }

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

    let neighbors = deltas.filter( delta => map[coord.y + delta.y] && map[coord.y + delta.y][coord.x + delta.x])
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


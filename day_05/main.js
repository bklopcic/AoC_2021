const utils = require('../utilities/js/Utils.js');

//content = utils.getLineDelimitedFileContent('./sample.txt');
content = utils.getLineDelimitedFileContent('./input.txt');

const map = {};
for (let row of content)
{
    let split = row.split(' -> ');
    let start = parseCoord(split[0]);
    let end = parseCoord(split[1]);

    for(let c of getDeltaCoords(start, end))
    {
        let coordStr = coordToStr(c);
        if (typeof map[coordStr] == 'undefined')
        {
            map[coordStr] = 0;
        }
        map[coordStr]++;
    }
}

let count = 0;
for(let prop in map)
{
    if (map[prop] > 1)
    {
        count++;
    }
}
console.log(count);

function parseCoord(str)
{
    return { x: Number(str.split(',')[0]), y: Number(str.split(',')[1])};
}

function coordToStr(coord)
{
    return `${coord.x},${coord.y}`;
}

function getDeltaCoords(coord1, coord2)
{
    let deltaX = getDeltaRange(coord1.x, coord2.x);
    let deltaY = getDeltaRange(coord1.y, coord2.y);

    let coords = [];
    for(let i = 0; i < Math.max(deltaX.length, deltaY.length); i++)
    {
        coords.push({ x : deltaX.length > 1 ? deltaX[i] : coord1.x, y : deltaY.length > 1 ? deltaY[i] : coord1.y });
    }
    return coords;
}

function getDeltaRange(n1, n2)
{
    let range = [];
    let delta = n1 - n2;
    let deltaDirection = delta < 0 ? 1 : -1;

    for(let i = 0; i <= Math.abs(delta); i++)
    {
        range.push(n1 + i * deltaDirection);
    }
    return range;
}
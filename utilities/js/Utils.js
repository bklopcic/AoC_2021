const fs = require('fs');
const path = require('path');

function getFileContent(filePath)
{
    return fs.readFileSync(path.resolve(filePath), 'utf8');
}

function getLineDelimitedFileContent(filePath)
{
    return getFileContent(filePath).split('\r\n');
}

function getObjectValues(obj)
{
    const ret = [];
    for (let prop in obj)
    {
        if (obj.hasOwnProperty(prop))
        {
            ret.push(obj[prop]);
        }
    }
    return ret;
}

function getObjectKeys(obj)
{
    const ret = [];
    for (let prop in obj)
    {
        ret.push(prop);
    }
    return ret;
}

function arrFromRange(min, max)
{
    const ret = [];
    for(let i = min; i <= max; i++)
    {
        ret.push(i);
    }
    return ret;
}

function distinct(arr)
{
    return [...new Set(arr)]
}

function flipObject(obj)
{
    let ret = {};
    for (let prop in obj)
    {
        ret[obj[prop]] = prop;
    }
    return ret;
}

function objectToKeyValues(obj)
{
    let ret = [];
    for (let prop in obj)
    {
        ret.push({ key: prop, value: obj[prop] });
    }
    return ret;
}

function sumArr(arr)
{
    return arr.reduce((tot, curr) => tot + curr, 0);
}

function median(arr)  
{
    const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

function copyObj(obj)
{
    return JSON.parse(JSON.stringify(obj));
}

function copyArr(arr)
{
    return arr.map(o => o);
}

function strToCoord(str)
{
    const split = str.split(',');
    return {
        x: Number(split[0]),
        y: Number(split[1])
    };
}

function coordToStr(coord)
{
    return `${coord.x},${coord.y}`;
}

function createGrid(rowCount, colCount, value)
{
    if (typeof value === 'undefined')
    {
        value = 0;
    }
    let grid = [];
    for (let i = 0; i < rowCount; i++)
    {
        grid.push([]);
        for (let j = 0; j < colCount; j++)
        {
            grid[i][j] = value;
        }
    }
    return grid;
}

function prettyPrint(obj)
{
    console.log(JSON.stringify(obj, null, 2));
}

function hexToBinary(hex){
    return hex.split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('');
}

function binaryToDecimal(bin)
{
    if (Array.isArray(bin))
    {
        bin = bin.map(o => o.toString()).join('');
    }
    return parseInt(bin,2);
}


function checkInBounds(coord, topLeft, botRight)
{
    return coord.x >= topLeft.x &&
    coord.x <= botRight.x &&
    coord.y <= topLeft.y &&
    coord.y >= botRight.y;
}

module.exports = {
    getFileContent,
    getLineDelimitedFileContent,
    getObjectKeys,
    getObjectValues,
    arrFromRange,
    flipObject,
    distinct,
    objectToKeyValues,
    sumArr,
    median,
    copyObj,
    copyArr,
    strToCoord,
    coordToStr,
    createGrid,
    prettyPrint,
    hexToBinary,
    binaryToDecimal,
    checkInBounds
}
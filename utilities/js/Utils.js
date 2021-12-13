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
    coordToStr
}
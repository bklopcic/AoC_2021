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
    return arr.reduce((curr, tot) => curr + tot, 0);
}

module.exports = {
    getFileContent,
    getLineDelimitedFileContent,
    getObjectValues,
    arrFromRange,
    flipObject,
    distinct,
    objectToKeyValues,
    sumArr
}
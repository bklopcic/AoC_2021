const { stringify } = require('querystring');
const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample1.txt').map( o => JSON.parse(o));
//let content = utils.getLineDelimitedFileContent('./sample2.txt').map( o => JSON.parse(o));
let content = utils.getLineDelimitedFileContent('./input.txt').map( o => JSON.parse(o));


let curr = content[0];

for(let i = 1; i < content.length; i++)
{
    console.log('\n  ' + JSON.stringify(curr));
    console.log('+ ' + JSON.stringify(content[i]));
    curr = addArrs(curr, content[i]);
    console.log('= ' + JSON.stringify(curr));
}

console.log(scoreArr(curr));

function addArrs(arr1, arr2)
{
    let added = [arr1, arr2];
    console.log('~ ' + JSON.stringify(added));
    while (reduce(added)){
        
    }

    return added;
}

function reduce(arr)
{
    if (checkExplode(arr))
    {
        console.log('exploded: ' + JSON.stringify(arr));
        return true;
    }
    else if (checkSplit(arr))
    {
        console.log('split:    ' + JSON.stringify(arr));
        return true;
    }
    return false;
}

function checkSplit(node)
{
    for (let i = 0; i < 2; i++)
    {
        if (Array.isArray(node[i]))
        {
            if(checkSplit(node[i]))
            {
                return true;
            }
        }
        else if (node[i] >= 10)
        {
            node[i] = [Math.floor(node[i]/2), Math.ceil(node[i]/2)];
            return true;
        }
    }
    return false;
}

function checkExplode(node, path=[], root=null)
{
    if (root == null)
    {
        root = node;
    }
    if (path.length > 3)
    {
        let leftPath = getPathOfNumToLeft(root, [...path, 0]);
        if (leftPath != null)
        {
            let leftValue = getNodeAt(root, leftPath);
            setPosition(root, leftPath, leftValue + node[0]);
        }

        let rightPath = getPathOfNumToRight(root, [...path, 1]);
        if (rightPath != null)
        {
            let rightValue = getNodeAt(root, rightPath);
            setPosition(root, rightPath, rightValue + node[1]);
        }
        
        setPosition(root, path, 0);

        return true;
    }
    for (let i = 0; i < 2; i++)
    {
        if (Array.isArray(node[i]))
        {
            if (checkExplode(node[i], [...path, i], root))
            {
                return true;
            }
        }
    }
    return false;
}

function getPathOfNumToLeft(root, origPath)
{
    let asStr = JSON.stringify(root);
    let idx = getIdxFromPath(asStr, origPath);

    for (let i = idx; i > 0; i--)
    {
        if (!isNaN(asStr[i]))
        {
            return getPathFromIdx(asStr, i);
        }
    }
    return null;
}

function getPathOfNumToRight(root, origPath)
{
    let asStr = JSON.stringify(root);
    let idx = getIdxFromPath(asStr, origPath) + getNodeAt(root, origPath).toString().length + 1;
    for (let i = idx; i < asStr.length; i++)
    {
        if (!isNaN(asStr[i]))
        {
            return getPathFromIdx(asStr, i);
        }
    }
    return null;
}

function getPathFromIdx(rootStr, idx)
{
    let path = [];
    for (let i = 0; i < idx; i++)
    {
        switch(rootStr[i])
        {
            case '[':
                path.push(0);
                break;
            case ',':
                path.splice(path.length-1, 1, 1);
                break;
            case ']':
                path.pop();
        }
    }
    return path;
}

function getIdxFromPath(rootStr, path)
{
    let traversed = [];
    for (let i = 0; i < rootStr.length; i++)
    {
        switch(rootStr[i])
        {
            case '[':
                traversed.push(0);
                break;
            case ',':
                traversed.splice(traversed.length-1, 1, 1);
                break;
            case ']':
                traversed.pop();
        }
        if (utils.arrEquals(traversed, path))
        {
            return i;
        }
    }
    return -1;
}

function getNodeAt(root, path)
{
    let pointer = root;
    for (let i = 0; i < path.length; i++)
    {
        pointer = pointer[path[i]];
    }
    return pointer;
}

function setPosition(root, path, newContent)
{
    let parent = getNodeAt(root, path.slice(0, path.length-1));
    parent[path[path.length-1]] = newContent;
}

function scoreArr(arr)
{
    return (3 * (Array.isArray(arr[0]) ? scoreArr(arr[0]) : arr[0])) +
    (2 * (Array.isArray(arr[1]) ? scoreArr(arr[1]) : arr[1]));
}
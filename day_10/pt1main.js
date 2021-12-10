const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample.txt');
let content = utils.getLineDelimitedFileContent('./input.txt');

let braceMatch = {
    ']' : '[',
    ')' : '(',
    '>' : '<',
    '}' : '{',
}

let scores = {
    ')' : 3,
    ']' : 57,
    '}' : 1197,
    '>' : 25137
};

let closures = utils.getObjectKeys(braceMatch);

let invalid = content.map(o => validateChunk(o.split(''))).filter(o=>o!=null);
console.log(utils.sumArr(utils.getObjectKeys(scores).map( char => invalid.filter( o => o == char).length * scores[char])));

function validateChunk(chunk)
{    
    let closeIdx = chunk.findIndex( o => closures.includes(o));

    if (closeIdx == -1)
    {
        return null;
    }
    let close = chunk[closeIdx];

    if (braceMatch[close] == chunk[closeIdx-1])
    {
        chunk.splice(closeIdx,1);
        chunk.splice(closeIdx-1,1);
        return validateChunk(chunk);
    }
    return close;
}
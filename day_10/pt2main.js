const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample.txt');
let content = utils.getLineDelimitedFileContent('./input.txt');

let braceMatch = {
    '{' : '}',
    '<' : '>',
    '(' : ')',
    '[' : ']',
    ']' : '[',
    ')' : '(',
    '>' : '<',
    '}' : '{',
}

let scores = {
    ')' : 1,
    ']' : 2,
    '}' : 3,
    '>' : 4
};

let closures = utils.getObjectKeys(scores);

console.log(utils.median(content.map( o => validateChunk(o.split('')) ).filter(o => o != null).map( o => o.reverse().reduce( (tot, brace) => tot * 5 + scores[braceMatch[brace]] , 0))));

function validateChunk(chunk)
{    
    let closeIdx = chunk.findIndex( o => closures.includes(o));

    if (closeIdx == -1)
    {
        return chunk;
    }
    let close = chunk[closeIdx];

    if (braceMatch[close] == chunk[closeIdx-1])
    {
        chunk.splice(closeIdx,1);
        chunk.splice(closeIdx-1,1);
        return validateChunk(chunk);
    }
    return null;
}
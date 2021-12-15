const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample.txt');
let content = utils.getLineDelimitedFileContent('./input.txt');

let sequence = content[0];

let instructions = content.splice(2, content.length).reduce( (map, curr) => {
    let split = curr.split(' -> ')
    map[split[0]] = split[1];
    return map;
}, {});

let currEdgeCounts = utils.getObjectKeys(instructions).reduce( (obj, curr) => {obj[curr] = 0; return obj;}, {});
let letterCounts = utils.getObjectKeys(instructions).reduce( (obj, curr) => {
        obj[curr[0]] = 0;
        obj[curr[1]] = 0; 
        return obj;
    }, 
{});
console.log(letterCounts);

for (let i = 0; i < sequence.length; i++)
{
    if ( i < sequence.length - 1 )
    {
        let toCheck = sequence[i] + sequence[i+1];
        currEdgeCounts[toCheck[0]+instructions[toCheck]]++;
        currEdgeCounts[instructions[toCheck]+toCheck[1]]++;
        letterCounts[instructions[toCheck]] += 1;
    }
    letterCounts[sequence[i]]++;
}

for (let i = 0; i < 39; i++)
{
    let nextEdgeCounts = utils.getObjectKeys(instructions).reduce( (obj, curr) => {obj[curr] = 0; return obj;}, {});;
    for (let edge in currEdgeCounts)
    {
        nextEdgeCounts[edge[0] + instructions[edge]] += currEdgeCounts[edge];
        nextEdgeCounts[instructions[edge] + edge[1]] += currEdgeCounts[edge];
        letterCounts[instructions[edge]] += currEdgeCounts[edge];
    }
    currEdgeCounts = nextEdgeCounts;
}

console.log(currEdgeCounts);
console.log(letterCounts);

console.log(Math.max(...utils.getObjectValues(letterCounts)) - Math.min(...utils.getObjectValues(letterCounts)));

const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample.txt');
let content = utils.getLineDelimitedFileContent('./input.txt');

let crabPositions = content[0].split(',').map( o => Number(o));

let potentialCoords = utils.arrFromRange(Math.min(...crabPositions), Math.max(...crabPositions));

let allSteps = {};
for(let coord of potentialCoords)
{
    allSteps[coord] = 0;
    for (let crab of crabPositions)
    {
        let distance = Math.abs(crab - coord);
        allSteps[coord] += distance * (distance + 1) / 2;
    }
}

console.log(Math.min(...utils.getObjectValues(allSteps)));
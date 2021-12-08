const utils = require('../utilities/js/Utils.js');

//content = utils.getLineDelimitedFileContent('./sample.txt');
content = utils.getLineDelimitedFileContent('./input.txt');

let allFish = content[0].split(',').map( o => Number(o));

let fishMap = {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0
}

for (let fish of allFish)
{
    fishMap[fish]++;
}

console.log(fishMap);

for (let i = 0; i < 256; i++)
{
    let newFishMap = {};

    newFishMap['8'] = fishMap['0'];
    newFishMap['7'] = fishMap['8'];
    newFishMap['6'] = fishMap['7'] + fishMap['0'];
    newFishMap['5'] = fishMap['6'];
    newFishMap['4'] = fishMap['5'];
    newFishMap['3'] = fishMap['4'];
    newFishMap['2'] = fishMap['3'];
    newFishMap['1'] = fishMap['2'];
    newFishMap['0'] = fishMap['1'];
    
    fishMap = newFishMap;
}
console.log(fishMap);
console.log(utils.sumArr(utils.getObjectValues(fishMap)));
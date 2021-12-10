const utils = require('../utilities/js/Utils.js');

content = utils.getLineDelimitedFileContent('./input.txt');

let hor = 0;
let depth = 0;
let aim = 0;

for(let row of content)
{
    const split = row.split(' ');
    const direction = split[0];
    const value = Number(split[1]);
    if (direction == 'forward')
    {
        hor += value;
        depth += aim * value;
    }
    else if (direction == 'up')
    {
        aim -= value;
    }
    else if (direction == 'down')
    {
        aim += value;
    }
}

console.log(hor * depth);
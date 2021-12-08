const utils = require('../utilities/js/Utils.js');

content = utils.getLineDelimitedFileContent('./input.txt');

console.log(content.length);

let count = 0;
let lastNum = Number(content[0]);
for (let num of content)
{
    if (Number(num) > lastNum)
    {
        count++;
    }
    lastNum = Number(num);
}

console.log(count);
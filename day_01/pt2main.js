const utils = require('../utilities/js/Utils.js');

content = utils.getLineDelimitedFileContent('./input.txt');

let windows = [];
for (let i = 0; i < content.length; i++)
{
    if (i+2 < content.length)
    {
        windows.push(Number(content[i]) + Number(content[i+1]) + Number(content[i+2]));
    }
}

let count = 0;
let lastNum = windows[0];
for (let i = 1; i < windows.length; i++)
{
    let num = windows[i];
    if (num > lastNum)
    {
        count++;
    }
    lastNum = num;
}
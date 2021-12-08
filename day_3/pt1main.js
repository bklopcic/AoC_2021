const utils = require('../utilities/js/Utils.js');

//content = utils.getLineDelimitedFileContent('./sample.txt');
content = utils.getLineDelimitedFileContent('./input.txt');

const bitCounts = [1,0,1,1,0,0,1,0,0,0,1,1];

for(let row of content)
{
    const bits = row.split('');
    console.log(bits);
    for (let i = 0; i < bits.length; i++)
    {
        bitCounts[i] += bits[i] == "1" ? 1 : 0;
    }
}
console.log(bitCounts);
let gammaBits = "";
let epBits = "";
for (let i = 0; i < bitCounts.length; i++)
{
    if (bitCounts[i] > content.length/2)
    {
        gammaBits += "1";
        epBits += "0";
    }
    else
    {
        gammaBits += "0";
        epBits += "1";
    }
}
console.log(gammaBits, epBits);
const ep = parseInt(epBits, 2);
const gam = parseInt(gammaBits, 2);

console.log(ep * gam);
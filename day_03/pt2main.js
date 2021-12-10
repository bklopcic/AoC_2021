const utils = require('../utilities/js/Utils.js');

//content = utils.getLineDelimitedFileContent('./sample.txt');
content = utils.getLineDelimitedFileContent('./input.txt');

function countBitsOxy(arr)
{
    const bitCounts = [];
    let ret = "";
    for(let i = 0; i < arr[0].length; i++)
    {
        bitCounts.push(0);
        const count = arr.filter( o => o[i] == "1").length;

        ret += count >= arr.length/2 ? "1" : "0";
    }
    return ret;
}

let oxyMatches = content;
let idx = 0;
console.log(oxyMatches);
while (oxyMatches.length > 1)
{
    let bitCounts = countBitsOxy(oxyMatches);

    console.log("counts " + bitCounts);

    let oxyTempMatches = [];
    for (let i = 0; i < oxyMatches.length; i++)
    {
        if (oxyMatches[i][idx] == bitCounts[idx])
        {
            console.log(oxyMatches[i]);
            oxyTempMatches.push(oxyMatches[i]);
        }
    }

    oxyMatches = oxyTempMatches;

    idx++;
}

function countBitsCO2(arr)
{
    const bitCounts = [];
    let ret = "";
    for(let i = 0; i < arr[0].length; i++)
    {
        bitCounts.push(0);
        const count = arr.filter( o => o[i] == "1").length;

        ret += count < arr.length/2 ? "1" : "0";
    }
    return ret;
}

let co2Matches = content;
idx = 0;
console.log(co2Matches);
while (co2Matches.length > 1)
{
    let bitCounts = countBitsCO2(co2Matches);

    console.log("counts " + bitCounts);

    let co2TempMatches = [];
    for (let i = 0; i < co2Matches.length; i++)
    {
        if (co2Matches[i][idx] == bitCounts[idx])
        {
            console.log(co2Matches[i]);
            co2TempMatches.push(co2Matches[i]);
        }
    }

    co2Matches = co2TempMatches;

    idx++;
}

let oxy = parseInt(oxyMatches,2);
let co2 = parseInt(co2Matches,2);

console.log(oxy);
console.log(co2);

console.log(oxy * co2);
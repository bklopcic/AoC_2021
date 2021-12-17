const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample.txt')[0];
let content = utils.getLineDelimitedFileContent('./input.txt')[0];

content = content.slice(12, content.length);
let split = content.split(',');

let topLeft = {
    x: Number(split[0].split('=')[1].split('..')[0]),
    y: Number(split[1].split('=')[1].split('..')[1])
};
let botRight = {
    x: Number(split[0].split('=')[1].split('..')[1]),
    y: Number(split[1].split('=')[1].split('..')[0])
};

let successes = [];

for (let y = botRight.y; y < 1000; y++)
{
    for (let x = 1; x < 1000; x++)
    {
        let trialResult = performTrial(x, y, topLeft, botRight);
        if ( trialResult !== null)
        {
            successes.push(trialResult);
        }
    }
}

console.log('Max height: ' + Math.max(...successes));
console.log('Num potential trajectories: ' + successes.length);

function performTrial(vx, vy, topLeft, botRight)
{
    let probe = {
        x: 0,
        y: 0,
        vx: vx,
        vy: vy
    };

    let maxY = probe.y;
    while(probe.y > botRight.y)
    {
        calcStep(probe);

        maxY = Math.max(probe.y, maxY);

        if (utils.checkInBounds(probe, topLeft, botRight))
        {
            return maxY;
        }
    }
    return null;
}


function calcStep(probe)
{
    probe.x += probe.vx;
    probe.y += probe.vy;
    probe.vx += probe.vx > 0 ? -1 : probe.vx < 0 ? 1 : 0;
    probe.vy -= 1;
}

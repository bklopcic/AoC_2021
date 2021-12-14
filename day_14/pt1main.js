const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample.txt');
let content = utils.getLineDelimitedFileContent('./input.txt');

let sequence = content[0];

let instructions = content.splice(2, content.length).map( o => {
    let split = o.split(' -> ')
    return {
        start: split[0].split('')[0],
        end: split[0].split('')[1],
        insert: split[1]
    }
});

for (let i = 0; i < 100; i++)
{
    let arr = sequence.split('').map(o => { return {char: o, include: true}});

    for (let inst of instructions)
    {

    }
}


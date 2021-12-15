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

console.log(sequence);
console.log(instructions);
for (let i = 0; i < 10; i++)
{
    let arr = sequence.split('').map(o => { return {char: o, include: true}});

    for (let inst of instructions)
    {
        for (let  j = 0; j < arr.length-1; j++)
        {
            if (arr[j].include && arr[j].char == inst.start && arr.slice(j+1, arr.length).find( o => o.include).char == inst.end)
            {
                arr.splice(j+1, 0, {char: inst.insert, include: false});
                j++;
            }
        }
    }
    sequence = arr.map(o => o.char).join('');
}

console.log(maxCount(sequence)[0][1] - minCount(sequence)[0][1]);

function maxCount(input) {
    const {max, ...counts} = (input || '').split('').reduce(
        (a, c) => {
            a[c] = a[c] ? a[c] + 1 : 1;
            a.max = a.max < a[c] ? a[c] : a.max;
            return a;
        },
        { max: 0 }
    );

    return Object.entries(counts).filter(([k, v]) => v === max);
}

function minCount(input) {
    const {...counts} = (input || '').split('').reduce(
        (a, c) => {
            a[c] = a[c] ? a[c] + 1 : 1;
            return a;
        },
        {}
    );
    const min = Math.min(...utils.getObjectValues(counts));
    return Object.entries(counts).filter(([k, v]) => v === min);
}

const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample.txt');
let content = utils.getLineDelimitedFileContent('./input.txt');

let nums = content.map( o => {
    let sampleAndCode = o.split(' | ');
    let solution = getSolution(sampleAndCode[0].split(' '));
    console.log(solution);

    let digitStr = sampleAndCode[1].split(' ').map( o => findDigitMatch(solution, o)).join('');
    console.log(sampleAndCode[1] + ' -> ' + digitStr);
    console.log('-------------------------------');

    return Number(digitStr);
});
console.log(utils.sumArr(nums));

function getSolution(arr)
{
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

    const digits = { 
        'abcdfg' : 9,
        'abcdefg': 8,
        'acf': 7,
        'abdefg': 6,
        'abdfg': 5,
        'bcdf' : 4,
        'acdfg': 3,
        'acdeg': 2,
        'cf' : 1,
        'abcefg' : 0  
    };

    //let eight = arr.find( o => o.length == 7);
    let seven = arr.find( o => o.length == 3);
    let four = arr.find( o => o.length == 4);
    let one = arr.find( o => o.length == 2);
    let zeroSixNine = arr.filter( o => o.length == 6);
    let twoThreeFive = arr.filter( o => o.length == 5);

    let codeLetters = {};

    codeLetters['a'] = seven.split('').find( o => !one.includes(o));
    codeLetters['c'] = letters.find( o => seven.includes(o) && zeroSixNine.filter( p => p.includes(o)).length == 2);
    codeLetters['f'] = letters.find( o => one.includes(o) && o != codeLetters['c']);
    codeLetters['d'] = letters.find( o => four.includes(o) && twoThreeFive.every( p => p.includes(o)) );
    codeLetters['e'] = letters.find( o => o != codeLetters['c'] && o != codeLetters['d'] && zeroSixNine.filter( p => p.includes(o)).length == 2);
    codeLetters['b'] = letters.find( o => o != codeLetters['c'] && o != codeLetters['d'] && o != codeLetters['f'] && four.includes(o));
    codeLetters['g'] = letters.find( o => !utils.getObjectValues(codeLetters).includes(o));

    let solvedDigits = {};

    for (let digit in digits)
    {
        solvedDigits[digit.split('').map( o => codeLetters[o] ).join('')] = digits[digit];
    }
    return solvedDigits;
}

function findDigitMatch(solvedDigits, str)
{
    return utils.objectToKeyValues(solvedDigits).find( kv => kv.key.length == str.length && kv.key.split('').every( o => str.includes(o))).value;
}
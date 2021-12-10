const utils = require('../utilities/js/Utils.js');

//content = utils.getLineDelimitedFileContent('./sample.txt');
content = utils.getLineDelimitedFileContent('./input.txt');

const allNums = content[0].split(',');
console.log(allNums);

var boards = [];

var currentBoard = [];
for(var i = 1; i < content.length; i++)
{
    if (content[i].length == 0)
    {
        boards.push(currentBoard);
        currentBoard = [];
    }
    else
    {
        currentBoard.push(content[i].split(' ').filter( o => o !=''));
    }
}
boards = boards.filter(o => o.length != 0);
var numsCalled = [];
var tempBoards = [];
for(var i = 0; i < allNums.length; i++)
{
    var num = allNums[i];
    numsCalled.push(num);
    if (boards.length == 1 && CheckWin(boards[0], numsCalled))
    {
        console.log(numsCalled);
        console.log(boards);
        console.log(calcBoard(boards[0], numsCalled));
        console.log(calcBoard(boards[0], numsCalled) * Number(num));
        break;
    }
    for(var board of boards)
    {
        if(!CheckWin(board, numsCalled))
        {
            tempBoards.push(board);
        }
    }
    console.log(tempBoards.length);
    
    boards = tempBoards;
    tempBoards = [];
}

function CheckWin(board, nums)
{
    for(var i = 0; i < board.length; i++)
    {
        if (board[i].every( o => nums.includes(o)))
        {
            console.log("win by rows", board);
            return true;
        }
       
        var all = true;
        for(var j =0; j < board.length; j++)
        {
            if(!nums.includes(board[j][i]))
            {
                all = false;
                break;
            }
        }
        if (all)
        {
            return true;
        }
    }
    return false;
}

function calcBoard(board, nums)
{
    var count = 0;
    for(var i = 0; i < board.length; i++)
    {
        for(var j =0; j < board[i].length; j++)
        {
            if(!nums.includes(board[i][j]))
            {
                count += Number(board[i][j]);
            }
        }
    }
    return count;
}
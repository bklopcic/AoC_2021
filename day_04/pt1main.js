const utils = require('../utilities/js/Utils.js');

//content = utils.getLineDelimitedFileContent('./sample.txt');
content = utils.getLineDelimitedFileContent('./input.txt');

const allNums = content[0].split(',');

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

var numsCalled = [];
for(var num of allNums)
{
    numsCalled.push(num);
    var found = false;
    for(var board of boards)
    {
        if(CheckWin(board, numsCalled))
        {
            console.log(numsCalled);
            console.log(board);
            console.log(calcBoard(board, numsCalled));
            console.log(calcBoard(board, numsCalled) * Number(num));
            found = true;
            break;
        }
    }
    if (found)
    {
        break;
    }
}

function CheckWin(board, nums)
{
    for(var i = 0; i < board.length; i++)
    {
        if (board[i].every( o => nums.includes(o)))
        {
            return true;
        }
        if (i == 0)
        {
            var all = true;
            for(var j =0; j < board.length; j++)
            {
                if(!nums.includes(board[i][j]))
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
        
    }
    return false;
}

function copyBoard(board)
{
    let newBoard = [];
    for(var i = 0; i < board.length; i++)
    {
        newBoard.push([]);

        for(var j =0; j < board[i].length; j++)
        {
            newBoard.push(board[i][j]);
        }
    }
    return newBoard;
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
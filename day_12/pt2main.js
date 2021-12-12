const utils = require('../utilities/js/Utils.js');

let content = utils.getLineDelimitedFileContent('./sample.txt');
//let content = utils.getLineDelimitedFileContent('./input.txt');

let rooms = {};

for (let entry of content)
{
    let split =  entry.split('-');
    if (!rooms.hasOwnProperty(split[0]))
    {
        rooms[split[0]] = {connections: [], visited: false, small: split[0] == split[0].toLowerCase()};
    }
    if (!rooms.hasOwnProperty(split[1]))
    {
        rooms[split[1]] = {connections: [], visited: false, small: split[1] == split[1].toLowerCase()};
    }
    rooms[split[0]].connections.push(split[1]);
    rooms[split[1]].connections.push(split[0]);
}
//console.log(rooms);
rooms['start'].visited = true;

console.log(getPathCount(rooms, rooms['start'], 'start', false));

function getPathCount(rooms, room, path, doubleVisit)
{
    let count = 0;
    for (let opt of room.connections)
    {
        if (opt == 'end')
        {
            //console.log(path + ',end');
            count += 1;
        }
        else if (!rooms[opt].visited)
        {
            let cp = utils.copyObj(rooms);
            if (cp[opt].small)
            {
                cp[opt].visited = true;
            }
            count += getPathCount(cp, cp[opt], path + ',' + opt, doubleVisit);
        }
        else if (rooms[opt].visited && !doubleVisit && opt != 'start')
        {
            count += getPathCount(rooms, rooms[opt], path + ',' + opt, true);
        }
    }
    return count;
}


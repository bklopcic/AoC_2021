const utils = require('../utilities/js/Utils.js');

//let content = utils.getLineDelimitedFileContent('./sample.txt')[11];
let content = utils.getLineDelimitedFileContent('./input.txt')[0];

let binArr = utils.hexToBinary(content).split('');
let packets = parsePackets(binArr, binArr.length);
utils.prettyPrint(packets);
console.log(packets[0].value);

function parsePackets(binArr, maxPackets)
{
    let packets = [];

    do
    {
        let packet = {
            version: utils.binaryToDecimal(binArr.splice(0, 3)),
            type: utils.binaryToDecimal(binArr.splice(0, 3)),
            subPackets: []
        };
        packets.push(packet);

        switch (packet.type)
        {
            case 0:
                packet.subPackets = getSubPackets(binArr);
                packet.value = utils.sumArr(packet.subPackets.map(o => o.value));
                break;

            case 1: 
                packet.subPackets = getSubPackets(binArr);
                packet.value = packet.subPackets.reduce( (tot, curr) => tot * curr.value, 1);
                break;

            case 2: 
                packet.subPackets = getSubPackets(binArr);
                packet.value = Math.min(...packet.subPackets.map(o => o.value));
                break;

            case 3: 
                packet.subPackets = getSubPackets(binArr);
                packet.value = Math.max(...packet.subPackets.map(o => o.value));
                break;
            
            case 4:
                let binLiteral = '';
                let last;

                do {
                    last = binArr.splice(0, 1)[0] === '0';
                    binLiteral += binArr.splice(0, 4).join('');
                } while (!last);
                packet.value = utils.binaryToDecimal(binLiteral);
                break;

            case 5: 
                packet.subPackets = getSubPackets(binArr);
                packet.value = packet.subPackets[0].value > packet.subPackets[1].value ? 1 : 0;
                break;

            case 6: 
                packet.subPackets = getSubPackets(binArr);
                packet.value = packet.subPackets[0].value < packet.subPackets[1].value ? 1 : 0;
                break;

            case 7: 
                packet.subPackets = getSubPackets(binArr);
                packet.value = packet.subPackets[0].value == packet.subPackets[1].value ? 1 : 0;
                break;
        }

    } while (binArr.includes('1') && packets.length < maxPackets)
    return packets;
}

function getSubPackets(binArr)
{
    if (binArr.splice(0, 1)[0] === '0')
    {
        let subPacketsLength = utils.binaryToDecimal(binArr.splice(0, 15));
        let subArr = binArr.splice(0, subPacketsLength);
        return parsePackets(subArr, subArr.length);
    }
    else
    {
        let subPacketCount = utils.binaryToDecimal(binArr.splice(0, 11));
        return parsePackets(binArr, subPacketCount);
    }
}
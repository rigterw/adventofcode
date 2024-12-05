const { readFileSync } = require('fs');

module.exports = {
    getInput: getInput,
    arrayMove: arrayMove
}

function getInput(day: number, test: boolean) {

    const fileName = test ? 'example' : 'input'
    const input = readFileSync(`./day${day}/${fileName}.txt`).toString().split("\n");
    return input;
}

function arrayMove(arr: any[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}
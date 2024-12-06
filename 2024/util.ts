const { readFileSync, writeFileSync } = require('fs');

module.exports = {
    getInput: getInput,
    Export: Export,
    arrayMove: arrayMove,
    deepCopy: deepCopy
}

function getInput(day: number, test: boolean) {

    const fileName = test ? 'example' : 'input'
    const input = readFileSync(`./day${day}/${fileName}.txt`).toString().split("\n");
    return input;
}

function Export(array: string[][], filePath: string) {
    const content = array.map(row => row.join('')).join('\n');

    writeFileSync(filePath, content);
}

function arrayMove(arr: any[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

function deepCopy(arr: any[][]): any[][] {
    return arr.map(row => row.slice());
}
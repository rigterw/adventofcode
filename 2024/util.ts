const { readFileSync, writeFileSync } = require('fs');

module.exports = {
    getInput: getInput,
    Export: Export,
    arrayMove: arrayMove,
    deepCopy: deepCopy,
    splitInput: splitInput,
    inBounds: inBounds
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

function splitInput(arr: string[]): string[][] {
    const input = [];
    for (let i = 0; i < arr.length; i++) {
        input.push(arr[i].split('').filter(char => char !== "\r"));
    }
    return input;
}

function inBounds(arr: any[], i: number, j: number | null = null): boolean {
    if (i < 0 || arr.length <= i) {
        return false;
    }
    if (j != null) {
        if (j < 0 || arr[i].length <= j)
            return false;
    }

    return true;
}
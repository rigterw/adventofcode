const { readFileSync, writeFileSync, createWriteStream } = require('fs');
const { createCanvas } = require('canvas');
const Jimp = require('jimp');


module.exports = {
    getInput: getInput,
    Export: Export,
    arrayMove: arrayMove,
    deepCopy: deepCopy,
    splitInput: splitInput,
    inBounds: inBounds,
    create2DArray: create2DArray,
    getNumbers: getNumbers,
    numberImage: numberImage,
}

function getInput(day: number, fileName: string) {
    if (fileName == undefined)
        fileName = 'input'
    const input = readFileSync(`./day${day}/${fileName}.txt`).toString().split("\n");
    return input;
}
function getNumbers(input: string): number[] {
    const matches = input.match(/-?\d+/g);
    return matches ? matches.map(Number) : [];
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

function create2DArray<T>(x: number, y: number, initialValue: T): T[][] {
    return new Array(x)
        .fill(null) // Create `x` rows
        .map(() => new Array(y).fill(initialValue)); // Fill each row with `y` columns of `initialValue`
}


async function numberImage(
    binaryData: number[][],
    fileName: string,
    enlargement = 1
): Promise<void> {
    const height = binaryData.length;
    const width = binaryData[0].length;

    const colorMap = [
        Jimp.rgbaToInt(255, 255, 255, 255), // 10 - White
        Jimp.rgbaToInt(0, 100, 0, 255),     // 1 - Dark Green
        Jimp.rgbaToInt(0, 255, 0, 255),     // 3 - Green
        Jimp.rgbaToInt(255, 255, 0, 255),   // 7 - Yellow
        Jimp.rgbaToInt(255, 0, 0, 255),     // 5 - Dark Red
        Jimp.rgbaToInt(0, 255, 255, 255),   // 4 - Cyan
        Jimp.rgbaToInt(255, 165, 0, 255),   // 6 - Orange
        Jimp.rgbaToInt(128, 0, 128, 255),   // 8 - Purple
        Jimp.rgbaToInt(0, 0, 255, 255),     // 2 - Blue
        Jimp.rgbaToInt(165, 42, 42, 255),   // 9 - Brown
        Jimp.rgbaToInt(0, 0, 139, 255),     // 0 - Dark Blue
    ];

    const img = new Jimp(
        width * enlargement,
        height * enlargement
    );

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const color = colorMap[binaryData[y][x]];

            for (let dy = 0; dy < enlargement; dy++) {
                for (let dx = 0; dx < enlargement; dx++) {
                    img.setPixelColor(
                        color,
                        x * enlargement + dx,
                        y * enlargement + dy
                    );
                }
            }
        }
    }

    await img.writeAsync("./output/img/" + fileName);
}


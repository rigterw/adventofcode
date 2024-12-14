const { readFileSync, writeFileSync, createWriteStream } = require('fs');
const { createCanvas } = require('canvas');


module.exports = {
    getInput: getInput,
    Export: Export,
    arrayMove: arrayMove,
    deepCopy: deepCopy,
    splitInput: splitInput,
    inBounds: inBounds,
    create2DArray: create2DArray,
    getNumbers: getNumbers,
    numberImage: numberImage
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

function numberImage(binaryData: number[][], fileName: string, enlargement: number = 1): void {
    // Create a canvas with the given width and height
    const width = binaryData.length;
    const height = binaryData[0].length;
    const canvas = createCanvas(width * enlargement, height * enlargement);
    const context = canvas.getContext('2d');


    // Loop through the binary data and map it to pixels
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const colorMap: string[] = [
                'rgb(255, 255, 255)', // 10 - White
                'rgb(0, 100, 0)',    // 1 - Dark Green
                'rgb(0, 255, 0)',    // 3 - Green
                'rgb(255, 255, 0)',  // 7 - Yellow
                'rgb(255, 0, 0)',    // 5 - Dark Red
                'rgb(0, 255, 255)',  // 4 - Cyan
                'rgb(255, 165, 0)',  // 6 - Orange
                'rgb(128, 0, 128)',  // 8 - Purple
                'rgb(0, 0, 255)',    // 2 - Blue
                'rgb(165, 42, 42)',  // 9 - Brown
                'rgb(0, 0, 139)',    // 0 - Dark Blue
            ];
            // Set the pixel color in the context (RGBA)
            context.fillStyle = colorMap[binaryData[y][x]]; // black or white
            context.fillRect(x * enlargement, y * enlargement, enlargement, enlargement); // Draw a 1x1 rectangle (a single pixel)
        }
    }

    // Export the image as PNG
    const out = createWriteStream(fileName); // Create a writable stream for the file
    const stream = canvas.createPNGStream(); // Get a PNG stream from the canvas
    stream.pipe(out); // Pipe the stream to the file
}

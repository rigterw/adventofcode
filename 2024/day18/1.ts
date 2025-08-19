const util = require('../util');
module.exports = {
    main: main
};

const size: number = process.argv.slice(2)[2] == undefined ? 71 : 7;
interface Vector2 {
    x: number,
    y: number
}
export function main(input: string[]): any {
    const map = util.create2DArray(size, size, '.');
    const cords: Vector2[] = getCords(input);
    corruptMap(map, cords);
    return cords.length;
}

function getCords(input: string[]): Vector2[] {
    const vectors = []
    for (let i = 0; i < input.length; i++) {
        const cords = input[i].split(',');
        vectors.push({ x: Number(cords[0]), y: Number(cords[1]) });
    }

    return vectors;
}

function corruptMap(map: string[][], cords: Vector2[], length = 1024) {
    for (let i = 0; i < length; i++) {
        map[cords[i].y][cords[i].x] = "#";
    }
}
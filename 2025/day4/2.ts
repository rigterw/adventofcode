import { Util } from '../util'

export function main(input: string[]): any {
    const map: string[][] = [];
    let counter = 0;
    let prevCounter = -1;

    for (let i = 0; i < input.length; i++) {
        map[i] = input[i].split('');
    }
    while (prevCounter < counter) {
        prevCounter = counter;
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input.length; x++) {
                if (map[y][x] != "@") {
                    continue;
                }
                if (isAvailable(map, y, x)) {
                    map[y][x] = ".";
                    counter++;
                }
            }
        }
    }

    return counter;

}

function isAvailable(map: string[][], y: number, x: number) {
    let adjacentCounter: number = 0;
    for (let yOffset = -1; yOffset <= 1; yOffset++) {

        for (let xOffset = -1; xOffset <= 1; xOffset++) {
            if (yOffset == 0 && xOffset == 0) {
                continue;
            }

            if (Util.inBounds(map, y + yOffset, x + xOffset) && map[y + yOffset][x + xOffset] == "@") {
                adjacentCounter++;
                if (adjacentCounter >= 4) {
                    return false;
                }
            }

        }
    }

    return true;

}
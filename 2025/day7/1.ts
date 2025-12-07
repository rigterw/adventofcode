import { Util } from '../util'

export function main(input: string[]): any {

    const map: string[][] = Util.splitInput(input);
    let counter: number = 0;

    for (let y = 1; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y - 1][x] == "|" || map[y - 1][x] == "S") {
                if (map[y][x] == "^") {
                    counter++;
                    if (x > 0) {
                        map[y][x - 1] = "|";
                    }
                    if (x < map[y].length - 1) {
                        map[y][x + 1] = "|"
                    }
                } else {
                    map[y][x] = "|";
                }
            }
        }
    }

    return counter;
}
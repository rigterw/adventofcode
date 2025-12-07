import { Util } from '../util'

const cache: Map<string, number> = new Map<string, number>();
let map: string[][];

export function main(input: string[]): any {

    map = Util.splitInput(input);
    let counter: number = 0;

    for (let y = map.length - 1; y >= 0; y--) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == "^") {
                counter = getPointScore(y, x);
                console.log(counter);
            }
        }
    }



    return counter;
}

function getPointScore(y: number, x: number) {

    let score: number = 0;

    if (x > 0) {
        score += findBelowScore(y, x - 1);
    }
    if (x < map[y].length - 1) {
        score += findBelowScore(y, x + 1);
    }

    cache.set(`${y},${x}`, score);
    return score;

}

function findBelowScore(y: number, x: number): number {
    for (let i = y + 1; i < map.length; i++) {
        if (map[i][x] == "^") {
            return cache.get(`${i},${x}`);

        }
    }


    return 1;
}

module.exports = {
    main: main
};
const nBlinks = 75;
const map = new Map<string, Map<number, number>>();
let debug = false;

export function main(input: string[]): any {
    let stones: string[] = input[0].split(" ");
    let nStones = 0;
    for (let stone = 0; stone < stones.length; stone++) {
        debug = stone == 0;
        nStones += Blink(stones[stone], 0, nBlinks);
    }
    return nStones;
}

function searchMap(stone: string, depth: number, maxDepth: number): number {
    if (depth >= maxDepth) {
        return 1;
    }
    let stoneMap = map.get(stone);
    let nStones = undefined;

    if (stoneMap == undefined) {
        stoneMap = new Map<number, number>();
        map.set(stone, stoneMap);
    } else {
        nStones = stoneMap.get(depth);
    }

    if (nStones == undefined) {
        nStones = Blink(stone, depth, maxDepth);
        stoneMap.set(depth, nStones);
    }
    return nStones;
}

function Blink(stone: string, depth: number, maxDepth: number): number {
    if (stone == "0") {
        return searchMap("1", depth + 1, maxDepth);
    }
    else if (stone.length % 2 == 0) {
        let slice1 = stone.slice(0, stone.length / 2);
        let slice2 = stone.slice(stone.length / 2, stone.length);

        while (slice1[0] == "0" && slice1.length > 1)
            slice1 = slice1.substring(1);
        while (slice2[0] == "0" && slice2.length > 1)
            slice2 = slice2.substring(1);

        let score = searchMap(slice1, depth + 1, maxDepth);
        score += searchMap(slice2, depth + 1, maxDepth);

        return score;
    } else {
        return searchMap(`${Number(stone) * 2024}`, depth + 1, maxDepth);
    }
}

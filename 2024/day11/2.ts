module.exports = {
    main: main
};
const nBlinks = 75;
const map = new Map<string, Map<number, number>>();

export function main(input: string[]): any {
    let stones: string[] = input[0].split(" ");
    let nStones = 0;
    for (let stone = 0; stone < stones.length; stone++) {
        nStones += Blink(stones[stone], 0, nBlinks);
    }
    return stones.length;
}

function searchMap(stone: string, depth: number, maxDepth: number) {
    if (!map.has(stone)) {
        const stoneMap = new Map<number, number>();
    }
}

function Blink(stone: string, depth: number, maxDepth: number): number {
    if (depth >= maxDepth) {
        return 1;
    }
    if (stone == "0") {
        return Blink("1", depth + 1, maxDepth);
    }
    else if (stone.length % 2 == 0) {
        let slice1 = stone.slice(0, stone.length / 2);
        let slice2 = stone.slice(stone.length / 2, stone.length);

        while (slice1[0] == "0" && slice1.length > 1)
            slice1 = slice1.substring(1);
        while (slice2[0] == "0" && slice2.length > 1)
            slice2 = slice2.substring(1);

        let score = Blink(slice1, depth + 1, maxDepth);
        score += Blink(slice2, depth + 1, maxDepth);

        return score;
    } else {
        return Blink(`${Number(stone) * 2024}`, depth + 1, maxDepth);
    }
}

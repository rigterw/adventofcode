const util = require('../util');

module.exports = {
    main: main
};


export function main(input: string[]): any {
    const map = util.splitInput(input);
    let score = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == "0")
                score += CheckTrail(x, y, -1, map);
        }
    }

    return score;
}

function CheckTrail(x: number, y: number, prevHeight: number, map: string[][]): number {
    if (x < 0 || y < 0 || y >= map.length || x >= map[y].length)
        return 0;

    let score = 0;
    let height = Number(map[y][x]);

    if (height - prevHeight != 1)
        return 0;

    if (height == 9) {
        return 1;
    }

    score += CheckTrail(x + 1, y, height, map);
    score += CheckTrail(x - 1, y, height, map);
    score += CheckTrail(x, y - 1, height, map);
    score += CheckTrail(x, y + 1, height, map);

    return score;
}
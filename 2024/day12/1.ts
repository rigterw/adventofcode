const util = require('../util');

module.exports = {
    main: main
};

interface areaData {
    surface: number,
    perimeter: number
}


export function main(input: string[]): any {
    const map = util.splitInput(input);
    let price: number = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == "#")
                continue;

            const area: areaData = SearchArea(map, x, y, map[y][x]);
            price += area.perimeter * area.surface;
        }
    }

    return price;
}

export function SearchArea(map: string[][], x: number, y: number, prevValue: string): areaData {
    if (y < 0 || x < 0 || y >= map.length || x >= map[y].length) {
        return { surface: 0, perimeter: 1 }
    }

    const value: string = map[y][x];

    if (value == "#") {
        return { surface: 0, perimeter: 0 }
    }

    if (value != prevValue) {
        return { surface: 0, perimeter: 1 }
    }
    const areaData: areaData = { surface: 1, perimeter: 0 };
    for (let dy = -1; dy < 2; dy++) {
        for (let dx = -1; dx < 2; dx++) {
            if (dy == 0 && dx == 0)
                continue;

            const neighbourData: areaData = SearchArea(map, x + dx, y + dy, value);
            areaData.surface += neighbourData.surface;
            areaData.perimeter += neighbourData.perimeter;
        }
    }

    return areaData;
}
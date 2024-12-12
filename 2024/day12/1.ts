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
    const visitedMap = util.deepCopy(map);
    let price: number = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (visitedMap[y][x] == "#")
                continue;
            let letter = map[y][x];
            const area: areaData = SearchArea(map, visitedMap, x, y, map[y][x]);
            // console.log(`${letter}: ${area.perimeter} * ${area.surface} = ${area.perimeter * area.surface}`);
            price += area.perimeter * area.surface;
        }
    }

    return price;
}

export function SearchArea(map: string[][], visitedMap: string[][], x: number, y: number, prevValue: string): areaData {
    if (y < 0 || x < 0 || y >= map.length || x >= map[y].length) {
        return { surface: 0, perimeter: 1 }
    }
    const value: string = map[y][x];

    if (visitedMap[y][x] == "#" && value == prevValue) {
        return { surface: 0, perimeter: 0 }
    }

    if (value != prevValue) {
        return { surface: 0, perimeter: 1 }
    }
    visitedMap[y][x] = "#";
    const areaData: areaData = { surface: 1, perimeter: 0 };
    for (let i = -2; i < 3; i++) {
        if (i == 0) {
            continue;
        }
        let dx = 0;
        let dy = 0;
        if (i % 2 == 0) {
            dy = i / 2;
        } else {
            dx = i;
        }
        const neighbourData: areaData = SearchArea(map, visitedMap, x + dx, y + dy, value);
        areaData.surface += neighbourData.surface;
        areaData.perimeter += neighbourData.perimeter;
    }
    return areaData;
}
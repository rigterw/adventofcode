const util = require('../util');

module.exports = {
    main: main
};

interface areaData {
    surface: number,
    sides: number
}
let debug = false;

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
            console.log(`${letter}: ${area.sides} * ${area.surface} = ${area.sides * area.surface}`);
            price += area.sides * area.surface;
        }
    }

    return price;
}

function SearchArea(map: string[][], visitedMap: string[][], x: number, y: number, prevValue: string): areaData {
    if (y < 0 || x < 0 || y >= map.length || x >= map[y].length) {
        return { surface: 0, sides: -1 }
    }
    const value: string = map[y][x];

    if (visitedMap[y][x] == "#" && value == prevValue) {
        return { surface: 0, sides: 0 }
    }

    if (value != prevValue) {
        return { surface: 0, sides: -1 }
    }
    visitedMap[y][x] = "#";
    const areaData: areaData = { surface: 1, sides: 0 };
    let startNeighbourSide = -2;
    let previousNeighbourSide = -2;
    for (let i = -2; i < 2; i++) {
        debug = false;
        let dx = 0;
        let dy = 0;
        if (i == -2 || i == 0) {
            dy = i == 0 ? 1 : -1;
        } else {
            dx = i == -1 ? -1 : 1;
        }
        const neighbourData: areaData = SearchArea(map, visitedMap, x + dx, y + dy, value);
        areaData.surface += neighbourData.surface;
        if (debug)
            console.log(neighbourData.sides);
        if (i == -2) {
            startNeighbourSide = neighbourData.sides;
        }
        if (neighbourData.sides == previousNeighbourSide && neighbourData.sides == -1) {
            areaData.sides++;
        }
        previousNeighbourSide = neighbourData.sides;

        if (neighbourData.sides > 0) {
            areaData.sides += neighbourData.sides;
        }

        if (neighbourData.sides == -1 && dx != 0) {
            if (debug)
                console.log("check");
            if (checkInnerCorner(map, value, x, y, dx, 1)) {
                areaData.sides++;
            }
            if (checkInnerCorner(map, value, x, y, dx, -1))
                areaData.sides++;
        }
    }
    if (previousNeighbourSide == startNeighbourSide && previousNeighbourSide == -1) {
        areaData.sides++;
    }
    if (debug)
        console.log(`${areaData.sides} corners found`);
    return areaData;
}

function checkInnerCorner(map: string[][], value: string, x: number, y: number, dx: number, dy: number): boolean {
    return (util.inBounds(map, y + dy, x + dx) && map[y + dy][x + dx] == value);
}
const util = require('../util');

module.exports = {
    main: main
};

interface areaData {
    surface: number,
    sides: number
}
let debug = false;
let cornermap: number[][];

export function main(input: string[]): any {
    const visitedMap = util.splitInput(input);
    const map = convertMap(visitedMap);
    cornermap = util.create2DArray(map[0].length, map.length, 0);
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
    util.Export(cornermap, "cornermap");
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
    areaData.sides = checkOuterCorner(map, value, x, y);
    for (let i = -2; i < 2; i++) {
        debug = false;
        let dx = 0;
        let dy = 0;
        if (i == -2 || i == 0) {
            dy = i == 0 ? 1 : -1;
        } else {
            dx = i == 1 ? -1 : 1;
        }
        const neighbourData: areaData = SearchArea(map, visitedMap, x + dx, y + dy, value);
        areaData.surface += neighbourData.surface;

        if (neighbourData.sides > 0) {
            areaData.sides += neighbourData.sides;
        }

        if (neighbourData.sides == -1 && dx != 0) {
            if (checkInnerCorner(map, value, x, y, dx, 1)) {
                areaData.sides++;
            }
            if (checkInnerCorner(map, value, x, y, dx, -1))
                areaData.sides++;
        }
    }
    if (debug)
        console.log(`${areaData.sides} corners found`);
    return areaData;
}

function checkInnerCorner(map: string[][], value: string, x: number, y: number, dx: number, dy: number): boolean {
    if (value == "0" && (util.inBounds(map, y + dy, x + dx) && map[y + dy][x + dx] == value)) {
        // cornermap[y][x]++;
        // cornermap[y][x + dx]--;
        if (util.inBounds(cornermap, y + dy, x + dx)) {
            cornermap[y + dy][x + dx]++;
        }
    }
    return (util.inBounds(map, y + dy, x + dx) && map[y + dy][x + dx] == value);
}

function checkOuterCorner(map: string[][], value: string, x: number, y: number): number {
    let cornerCounter = 0;
    //top corners
    if (!util.inBounds(map, y - 1, x) || map[y - 1][x] != value) {
        //top left
        if (!util.inBounds(map, y, x - 1) || map[y][x - 1] != value) {
            if (!util.inBounds(map, y - 1, x - 1) || map[y - 1][x - 1] != value) {
                cornerCounter++;
                cornermap[y][x]++;
            }
        }
        //top right
        if (!util.inBounds(map, y, x + 1) || map[y][x + 1] != value) {
            if (!util.inBounds(map, y - 1, x + 1) || map[y - 1][x + 1] != value) {
                cornerCounter++;
                cornermap[y][x]++;
            }
        }
    }
    //bottom corners
    if (!util.inBounds(map, y + 1, x) || map[y + 1][x] != value) {
        //bottom left
        if (!util.inBounds(map, y, x - 1) || map[y][x - 1] != value) {
            if (!util.inBounds(map, y + 1, x - 1) || map[y + 1][x - 1] != value) {
                cornerCounter++;
            }
        }
        //bottom right
        if (!util.inBounds(map, y, x + 1) || map[y][x + 1] != value) {
            if (!util.inBounds(map, y + 1, x + 1) || map[y + 1][x + 1] != value) {
                cornerCounter++;
            }
        }
    }
    if (value == "1" && cornerCounter > 0)
        console.log(`${cornerCounter} outies at ${x}, ${y}`);
    return cornerCounter;
}

function convertMap(map: string[][]): string[][] {
    const Nmap: (string)[][] = new Array(map.length).fill("null").map(() => new Array(map[0].length).fill("null"));
    let id = 0;
    for (let y = 0; y < Nmap.length; y++) {

        for (let x = 0; x < Nmap[y].length; x++) {
            if (Nmap[y][x] != 'null') {
                continue;
            }
            setArea(id + "", map[y][x], map, Nmap, x, y);
            id++;
        }
    }
    util.Export(Nmap, "nmap");
    return Nmap;
}

function setArea(id: string, letter: string, map: string[][], nMap: string[][], x: number, y: number) {
    if (!util.inBounds(map, y, x) || nMap[y][x] != 'null' || map[y][x] != letter) {
        return;
    }
    nMap[y][x] = id;
    for (let i = -2; i < 2; i++) {
        debug = false;
        let dx = 0;
        let dy = 0;
        if (i == -2 || i == 0) {
            dy = i == 0 ? 1 : -1;
        } else {
            dx = i == -1 ? -1 : 1;
        }
        setArea(id, letter, map, nMap, x + dx, y + dy);
    }
}
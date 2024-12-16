const util = require('../util');

module.exports = {
    main: main
};

interface tile {
    pos: vector2,
    dir: string,
    cost: number,
    previous: tile | null,
    priority: number | null,
    isPlace: boolean
}
let placesCounter = 0;
interface vector2 {
    x: number,
    y: number
}
export function main(input: string[]): any {
    const queue: tile[] = [];
    const map = util.splitInput(input);
    const tileMap = getTileMap(map);
    const goal: vector2 = findStartFinish(map, tileMap, queue);

    while (queue.length > 0) {
        const current: tile | undefined = queue.shift();
        if (current == undefined)
            continue;

        if (current.pos.x == goal.x && current.pos.y == goal.y) {
            setPlace(current);
            let copyMap = util.deepCopy(map);
            setPath(current, copyMap);
            util.Export(copyMap, './day16/map2.txt');
            continue;
        }

        const neighBours = getNeighbours(map, tileMap, current.pos.x, current.pos.y);
        for (const dir in neighBours) {
            const next = neighBours[dir];
            const nextCost = current.cost + 1 + getDirPenalty(current.dir, dir);

            if (next.cost == Infinity || nextCost < next.cost) {
                next.cost = nextCost;
                next.priority = nextCost + Math.abs(goal.x - next.pos.x) + Math.abs(goal.y - next.pos.y);
                next.previous = current;
                next.dir = dir;
                insertAt(queue, next.priority, next);
                if (current.pos.x == 3 && current.pos.y == 7) {
                    console.log(`${dir}: ${nextCost} < ${next.cost}`);
                    console.log(queue);
                }
            } else if (nextCost == next.cost && next.isPlace) {
                setPlace(current);
            }
        }
    }

    return placesCounter;
}

function setPlace(tile: tile) {
    tile.isPlace = true;
    placesCounter++;
    if (tile.previous != null && !tile.previous.isPlace) {
        setPlace(tile.previous);
    }
}

function setPath(tile: tile, map: string[][]) {
    try {
        const dd = { "N": "^", "E": ">", "S": "v", "W": "<" }
        map[tile.pos.y][tile.pos.x] = dd[tile.dir];
        if (tile.previous != null)
            setPath(tile.previous, map);
    } catch (error) {
        console.log(error);
    }
}

function insertAt(queue: tile[], index: number, value: tile) {
    queue.splice(index, 0, value);
}

function getDirPenalty(from: string, to: string): number {
    if (from == to)
        return 0;
    const directions = ["N", "E", "S", "W"];


    const fromIndex = directions.indexOf(from);
    const toIndex = directions.indexOf(to);
    const difference = (toIndex - fromIndex + 4) % 4;

    if (difference === 0) {
        return 0;
    } else if (difference === 1 || difference === 3) {
        return 1000;
    } else if (difference === 2) {
        return 2000;
    }

}

function getNeighbours(map: string[][], tileMap: tile[][], x: number, y: number): { [dir: string]: tile; } {
    const neighBours = {};

    if (map[y - 1][x] != "#") {
        neighBours["N"] = tileMap[y - 1][x];
    }
    if (map[y + 1][x] != "#") {
        neighBours["S"] = tileMap[y + 1][x];
    }
    if (map[y][x + 1] != "#") {
        neighBours["E"] = tileMap[y][x + 1];
    }
    if (map[y][x - 1] != "#") {
        neighBours["W"] = tileMap[y][x - 1];
    }

    return neighBours;
}

function getTileMap(map: string[][]): tile[][] {
    const tileMap: tile[][] = [];
    for (let y = 0; y < map.length; y++) {
        const tileRow = [];
        for (let x = 0; x < map[y].length; x++) {
            tileRow.push({ pos: { x: x, y: y }, dir: "", cost: Infinity, previous: null, isPlace: false });
        }
        tileMap.push(tileRow);
    }
    return tileMap;
}

function findStartFinish(map: string[][], tileMap: tile[][], queue: tile[]): vector2 {
    let end: vector2 = { x: 0, y: 0 };
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == "S") {
                const startTile = tileMap[y][x];
                startTile.cost = 0;
                startTile.dir = "E";
                queue.push(startTile);
            }

            if (map[y][x] == "E") {
                end = { x: x, y: y };
            }
        }
    }
    return end;
}
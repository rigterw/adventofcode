const util = require('../util');

module.exports = {
    main: main
};


interface vector2 {
    x: number,
    y: number
}

interface reindeer {
    pos: vector2,
    score: number,
    dir: string,
    visited: vector2[]
}

interface tile {
    pos: vector2,
    dir: string,
    cost: number,
    previous: tile | null,
    priority: number | null,
    isPlace: number,
    junction: boolean
}
let placesMap;
let placesCounter = 0;
let routeCounter = 0;

export function main(input: string[]): any {

    const map = util.splitInput(input);
    const tileMap = getTileMap(map);
    const queue: tile[] = [];
    placesMap = util.deepCopy(map);
    const goal: vector2 = findStartFinish(map, tileMap, queue);
    pathFind(map, tileMap, queue, goal);
    return sendReindeer(placesMap, findStart(map), goal);
}

function pathFind(map: string[][], tileMap: tile[][], queue: tile[], goal: vector2) {
    while (queue.length > 0) {
        const current: tile | undefined = queue.shift();
        if (current == undefined)
            continue;

        if (current.pos.x == goal.x && current.pos.y == goal.y) {
            setPlace(current, tileMap, map);
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
                if (next.pos.x == goal.x && next.pos.y == goal.y) {

                    placesCounter = 0;
                    routeCounter++;
                    placesMap = util.deepCopy(map);
                }
            } else if (Math.abs(nextCost - next.cost) <= 1000) {
                next.junction = true;
                if (next.isPlace == routeCounter)
                    setPlace(current, tileMap, map);
            }
        }
    }
    util.Export(placesMap, './day16/places.txt');
    console.log(`route: ${routeCounter}`);
}
function setPlace(tile: tile, tileMap: tile[][], map: string[][]) {
    if (tile.junction) {
        setNeighbours(map, tile, tileMap);
    }
    tile.isPlace = routeCounter;
    placesMap[tile.pos.y][tile.pos.x] = "O";
    placesCounter++;
    if (tile.previous != null && (tile.previous.isPlace < routeCounter)) {
        setPlace(tile.previous, tileMap, map);
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

///todo: use this function to also update the isPlace of neighbours with same cost as the previous of this tile
function setNeighbours(map: string[][], tile: tile, tileMap: tile[][]) {
    const neighBours = getNeighbours(map, tileMap, tile.pos.x, tile.pos.y);
    for (const dir in neighBours) {
        if (neighBours[dir] == tile.previous || neighBours[dir].previous == tile) {
            continue;
        }

        if (Math.abs(tile.previous.cost - neighBours[dir].cost) <= 1000) {
            setPlace(tile.previous, tileMap, map);
        }
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
            tileRow.push({ pos: { x: x, y: y }, dir: "", cost: Infinity, previous: null, isPlace: 0, junction: false });
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

function findStart(map: string[][]): vector2 {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == "S") {
                return { x: x, y: y }
            }
        }
    }
}

function sendReindeer(map: string[][], start: vector2, goal: vector2) {
    let counter = 0;
    const reindeer: reindeer[] = [
        { pos: start, score: 0, dir: "E", visited: [start] }
    ];
    const finishedReindeer: reindeer[] = [];

    while (reindeer.length > 0) {
        if (reindeer.length > 20000)
            break;
        const nReindeer = reindeer.length;
        for (let i = 0; i < nReindeer; i++) {
            const rudolph = reindeer.shift();
            if (rudolph.pos.x == goal.x && rudolph.pos.y == goal.y) {
                finishedReindeer.push(rudolph);
                console.log("reindeer finished");
                continue;
            }
            const neighBours = getNeighboursRD(map, rudolph);
            for (const dir in neighBours) {

                const velocity = getV(dir);
                const newPos = { x: rudolph.pos.x + velocity.x, y: rudolph.pos.y + velocity.y };
                if (contains(rudolph.visited, newPos))
                    continue;
                const newScore = rudolph.score + 1 + getDirPenalty(rudolph.dir, dir);
                const visited = [...rudolph.visited];
                visited.push(newPos);
                reindeer.push({ pos: newPos, score: newScore, dir: dir, visited: visited });
            }
        }
    }

    console.log("all deer finished");
    let lowestScore = Infinity;
    for (let i = 0; i < finishedReindeer.length; i++) {
        lowestScore = lowestScore < finishedReindeer[i].score ? lowestScore : finishedReindeer[i].score;
    }


    for (let i = 0; i < finishedReindeer.length; i++) {
        if (finishedReindeer[i].score != lowestScore)
            continue;

        const visited = finishedReindeer[i].visited;
        for (let j = 0; j < visited.length; j++) {
            const visitPos = visited[j];
            if (map[visitPos.y][visitPos.x] != "0") {
                counter++;
                map[visitPos.y][visitPos.x] = "0";
            }
        }
    }

    return counter;

}

function contains(arr: vector2[], item: vector2) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].x == item.x && arr[i].y == item.y)
            return true;
    }

    return false;
}

function getV(dir: string): vector2 {
    const vector = { x: 0, y: 0 };
    switch (dir) {
        case "N":
            vector.y = -1;
            break;
        case "E":
            vector.x = 1;
            break;
        case "S":
            vector.y = 1;
            break;
        case "W":
            vector.x = -1;
            break;
    }

    return vector;
}



function getNeighboursRD(map: string[][], reindeer: reindeer): { [dir: string]: string; } {
    const neighBours = {};
    const dir = reindeer.dir;
    const x = reindeer.pos.x;
    const y = reindeer.pos.y;

    if (map[y - 1][x] != "#" && map[y - 1][x] != "." && dir != "S") {
        neighBours["N"] = map[y - 1][x];
    }
    if (map[y + 1][x] != "#" && map[y + 1][x] != "." && dir != "N") {
        neighBours["S"] = map[y + 1][x];
    }
    if (map[y][x + 1] != "#" && map[y][x + 1] != "." && dir != "W") {
        neighBours["E"] = map[y][x + 1];
    }
    if (map[y][x - 1] != "#" && map[y][x - 1] != "." && dir != "E") {
        neighBours["W"] = map[y][x - 1];
    }

    return neighBours;
}

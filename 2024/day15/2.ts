const util = require('../util');

module.exports = {
    main: main
};
interface Vector2 {
    x: number,
    y: number
}


export function main(input: string[]): any {
    const map = loadMap(input);
    input.shift();
    const instructions = loadInstructions(input);
    const robotPos: Vector2 = findRobot(map);

    for (let i = 0; i < instructions.length; i++) {
        moveRobot(robotPos, instructions[i], map);
        if (instructions.length < 100)
            util.Export(map, `./day15/example1/${i}.txt`);
    }
    return calculateScore(map);
}

function findRobot(map: string[][]): Vector2 {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == "@") {
                return { x: x, y: y }
            }
        }
    }
    console.log("No robot found");
    return { x: -1, y: -1 }
}

function moveRobot(robotPos: Vector2, instruction: string, map: string[][]) {
    const velocity: Vector2 = { x: 0, y: 0 };
    switch (instruction) {
        case "^":
            velocity.y = -1;
            break;
        case "v":
            velocity.y = 1;
            break;
        case ">":
            velocity.x = 1;
            break;
        case "<":
            velocity.x = -1;
            break;
    }

    if (canMove({ x: robotPos.x + velocity.x, y: robotPos.y + velocity.y }, velocity, map)) {
        move(robotPos, velocity, map);
        robotPos.x += velocity.x;
        robotPos.y += velocity.y;
    }

}

function move(pos: Vector2, velocity: Vector2, map: string[][], secondMove = false) {
    const tileValue = map[pos.y][pos.x];
    if (tileValue == '.')
        return;
    const nextPos: Vector2 = { x: pos.x + velocity.x, y: pos.y + velocity.y };
    move(nextPos, velocity, map);
    if (!secondMove && velocity.y != 0 && (tileValue == "[" || tileValue == "]")) {
        let offset = tileValue == "[" ? 1 : -1;
        move({ x: pos.x + offset, y: pos.y }, velocity, map, true);
    }
    map[nextPos.y][nextPos.x] = tileValue;
    map[pos.y][pos.x] = '.';
}

function canMove(pos: Vector2, velocity: Vector2, map: string[][]) {
    const tileValue = map[pos.y][pos.x];

    switch (tileValue) {
        case "#":
            return false;
        case ".":
            return true;
        case "[":
            if (velocity.y != 0) {
                return canMove({ x: pos.x, y: pos.y + velocity.y }, velocity, map) && canMove({ x: pos.x + 1, y: pos.y + velocity.y }, velocity, map);
            }
            break;
        case "]":
            if (velocity.y != 0) {
                return canMove({ x: pos.x, y: pos.y + velocity.y }, velocity, map) && canMove({ x: pos.x - 1, y: pos.y + velocity.y }, velocity, map);
            }
            break;
    }
    const nextPos: Vector2 = { x: pos.x + velocity.x, y: pos.y + velocity.y };
    return canMove(nextPos, velocity, map);
}

function calculateScore(map: string[][]): number {
    let score = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == "[") {
                score += y * 100 + x;
            }
        }
    }
    return score;
}

function loadMap(input: string[]): string[][] {
    let i = 0;
    const map: string[][] = [];
    while (input[i].length != 1) {
        const smallMap = input.shift().split('').filter(char => char !== "\r");
        const bigMap = [];

        for (let i = 0; i < smallMap.length; i++) {
            switch (smallMap[i]) {
                case "O":
                    bigMap.push("[");
                    bigMap.push("]");
                    break;
                case "#":
                    bigMap.push("#");
                    bigMap.push("#");
                    break;
                case "@":
                    bigMap.push("@");
                    bigMap.push(".");
                    break;
                case ".":
                    bigMap.push(".");
                    bigMap.push(".");
                    break;
            }
        }
        map.push(bigMap);
    }
    return map;
}

function loadInstructions(input: string[]): string[] {
    let instructions = "";
    for (let i = 0; i < input.length; i++) {
        instructions += input[i];
    }
    return instructions.split('').filter(char => char !== "\r");
}
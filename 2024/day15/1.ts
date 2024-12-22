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

    if (tryMove({ x: robotPos.x + velocity.x, y: robotPos.y + velocity.y }, velocity, map)) {
        map[robotPos.y][robotPos.x] = ".";
        robotPos.x += velocity.x;
        robotPos.y += velocity.y;
        map[robotPos.y][robotPos.x] = "@";

    }

}

function tryMove(pos: Vector2, velocity: Vector2, map: string[][]): boolean {
    const tileValue = map[pos.y][pos.x];
    switch (tileValue) {
        case "#":
            return false;
        case ".":
            return true;
        case "O":
            const nextPos: Vector2 = { x: pos.x + velocity.x, y: pos.y + velocity.y };
            if (tryMove(nextPos, velocity, map)) {
                map[nextPos.y][nextPos.x] = tileValue;
                map[pos.y][pos.x] = '.';
                return true;
            }
            return false;
    }
}

function calculateScore(map: string[][]): number {
    let score = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == "O") {
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
        map.push(input.shift().split('').filter(char => char !== "\r"))
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
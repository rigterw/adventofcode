const util = require('../util');

module.exports = {
    main: main
};

const map: string[][] = [];
export function main(input: string[]): any {

    for (let i = 0; i < input.length; i++) {

        var chars = input[i].split('').filter(char => char !== "\r");
        map.push(chars);
    }

    let x = -1; let y = -1;

    //find guard
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == "^") {
                x = j;
                break;
            }
        }
        if (x != -1) {
            y = i;
            break;
        }
    }
    let steps = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] != ".")
                continue;
            if (walk(x, y, j, i)) {
                steps++;
            }

            if (i == 79 && j == 80) {
                "stuck";
            }
        }
    }
    return steps;
}

function walk(x: number, y: number, obstX: number, obstY: number): boolean {

    let v = { "x": 0, "y": -1 };
    let diversionPos: { x: number, y: number }[] = [{ "x": -1, "y": -1 }]
    let newMap = util.deepCopy(map);
    newMap[obstY][obstX] = "O";
    //walk
    let i = 0;
    while (x + v["x"] > -1 && y + v["y"] > -1 && y + v["y"] < newMap.length && x + v["x"] < newMap[y].length) {
        i++;
        if (i > 9999) {
            return true;
        }
        switch (newMap[y + v["y"]][x + v["x"]]) {
            case "O":
                for (let i = 0; i < diversionPos.length; i++) {
                    if (diversionPos[i]["x"] == x && diversionPos[i]["y"] == y) {
                        return true;
                    }
                }
                diversionPos.push({ "x": x, "y": y });
                v = rotate(v);
                continue;

            case "#":
                v = rotate(v);
                continue;

        }
        newMap[y][x] = "-";
        x += v["x"];
        y += v["y"];

        newMap[y][x] = "*";

    }

    return false;
}

function rotate(v: { x: number, y: number }): { x: number, y: number } {
    if (v["x"] == 0) {
        return v["y"] == 1 ? { "x": -1, "y": 0 } : { "x": 1, "y": 0 };
    } else {
        return v["x"] == 1 ? { "x": 0, "y": 1 } : { "x": 0, "y": -1 };
    }
}
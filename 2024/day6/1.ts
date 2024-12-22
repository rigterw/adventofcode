module.exports = {
    main: main
};

const map: string[][] = [];
export function main(input: string[]): any {

    for (let i = 0; i < input.length; i++) {

        var chars = input[i].split('');

        map.push(chars);
    }

    let x = -1; let y = -1;

    //find guard
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
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

    let v = { "x": 0, "y": -1 };
    let steps = 1;

    //walk
    while (x + v["x"] > -1 && y + v["y"] > -1 && y + v["y"] < map.length && x + v["x"] < map[y].length) {
        switch (map[y + v["y"]][x + v["x"]]) {
            case "#":
                v = rotate(v);
                continue;
            case ".":
                map[y + v["y"]][x + v["x"]] = "X";
                steps++;
        }
        x += v["x"];
        y += v["y"];
        console.log(`${x},${y}`);
    }

    return steps;
}

function rotate(v: { x: number, y: number }): { x: number, y: number } {
    if (v["x"] == 0) {
        return v["y"] == 1 ? { "x": -1, "y": 0 } : { "x": 1, "y": 0 };
    } else {
        return v["x"] == 1 ? { "x": 0, "y": 1 } : { "x": 0, "y": -1 };
    }
}
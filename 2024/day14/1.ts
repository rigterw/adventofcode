const util = require('../util');

module.exports = {
    main: main
};
const width: number = process.argv.slice(2)[2] == undefined ? 101 : 11;
const height: number = process.argv.slice(2)[2] == undefined ? 103 : 7;
const seconds = 100;
interface Robot {
    x: number,
    y: number,
    vX: number,
    vY: number
}
let debug = true;
export function main(input: string[]): any {
    const robots = loadRobots(input);
    copyInput(robots);
    const middleXLine = Math.round(width / 2);
    const middleYLine = Math.round(height / 2);
    const quadrantScores = [0, 0, 0, 0];
    for (let i = 0; i < robots.length; i++) {
        const robot = robots[i];
        moveRobot(robot);

        if (middleXLine == robot.x || middleYLine == robot.y) {
            continue;
        }

        if (robot.y < middleYLine) {
            if (robot.x < middleXLine) {
                quadrantScores[0]++;
            } else {
                quadrantScores[1]++;
            }
        } else {
            if (robot.x < middleXLine) {
                quadrantScores[2]++;
            } else {
                quadrantScores[3]++;
            }
        }
    }

    let score = 1;
    for (let i = 0; i < quadrantScores.length; i++) {
        if (quadrantScores[i] != 0) {
            score *= quadrantScores[i];
        }
    }

    return score;
}

function loadRobots(input: string[]): Robot[] {
    const robots: Robot[] = [];
    for (let i = 0; i < input.length; i++) {
        const values = util.getNumbers(input[i]);

        robots.push({ x: values[0], y: values[1], vX: values[2], vY: values[3] });
    }

    return robots;
}

function moveRobot(robot: Robot) {

    let displacementX = (robot.x + robot.vX * seconds) % width;
    let displacementY = (robot.y + robot.vY * seconds) % height;
    if (debug) {
        console.log(displacementX);
    }
    robot.x = displacementX < 0 ? displacementX + width : displacementX;
    robot.y = displacementY < 0 ? displacementY + height : displacementY;

    debug = false;
}

function copyInput(robots: Robot[]) {
    const input = [];

    for (let i = 0; i < robots.length; i++) {
        input.push(`p=${robots[i].x},${robots[i].y} v=${robots[i].vX},${robots[i].vY}`.split(""));
    }

    util.Export(input, "newInput.txt");

}
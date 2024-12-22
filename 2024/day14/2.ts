const util = require('../util');

module.exports = {
    main: main
};

const width: number = process.argv.slice(2)[2] == undefined ? 101 : 11;
const height: number = process.argv.slice(2)[2] == undefined ? 103 : 7;

interface Robot {
    x: number,
    y: number,
    vX: number,
    vY: number
}
let debug = true;
export function main(input: string[]): any {
    const robots = loadRobots(input);
    return SearchMaps(robots);

}

function GenerateMap(robots: Robot[], seconds: number): number {
    let mapScore;
    let map = util.create2DArray(height, width, 0);
    for (let i = 0; i < robots.length; i++) {
        const robot = robots[i];
        moveRobot(robot, 1);
        map[robot.y][robot.x]++;
    }
    mapScore = getMapScore(map);
    if (mapScore > 40) {
        console.log(`${seconds}: ${mapScore}`);
        util.numberImage(map, `./day14/sol${seconds}.png`, 1);
    }
    return mapScore;
}

function SearchMaps(robots: Robot[]) {
    let seconds = 1;
    let mapScore = 0;

    do {
        console.log(seconds);
        mapScore = GenerateMap(robots, seconds);
        seconds++;
    } while (seconds < 10500 || mapScore >= 50)

    return seconds;

}

function loadRobots(input: string[]): Robot[] {
    const robots: Robot[] = [];
    for (let i = 0; i < input.length; i++) {
        const values = util.getNumbers(input[i]);

        robots.push({ x: values[0], y: values[1], vX: values[2], vY: values[3] });
    }

    return robots;
}

function moveRobot(robot: Robot, seconds: number) {

    let displacementX = (robot.x + robot.vX * seconds) % width;
    let displacementY = (robot.y + robot.vY * seconds) % height;

    robot.x = displacementX < 0 ? displacementX + width : displacementX;
    robot.y = displacementY < 0 ? displacementY + height : displacementY;

    debug = false;
}

function getMapScore(ogMap): number {
    let highScore = 0;
    ogMap = util.deepCopy(ogMap);
    for (let i = 0; i < ogMap.length; i++) {
        for (let j = 0; j < ogMap[i].length; j++) {
            if (ogMap[i][j] != 0) {
                let newScore = getTileScore(ogMap, j, i);

                highScore = newScore > highScore ? newScore : highScore;
            }
        }
    }

    return highScore;
}

function getTileScore(map: number[][], x: number, y: number): number {
    if (!util.inBounds(map, y, x) || map[y][x] == 0)
        return 0;

    let score = 1;
    map[y][x] = 0;
    score += getTileScore(map, x - 1, y);
    score += getTileScore(map, x + 1, y);
    score += getTileScore(map, x, y - 1);
    score += getTileScore(map, x, y + 1);

    return score;
}
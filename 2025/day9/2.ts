let faultPoints: Vector2[];
let debug = true;
export function main(input: string[]): any {
    const points = splitInput(input);
    const largestPoint: Vector2 = points.pop();
    faultPoints = [...points];
    storeWalls(points);
    let largestSize: number = 0;

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const size: number = getSize(points[i], points[j]);
            if (size > largestSize) {
                largestSize = size;
                console.log(`Largest: ${points[i].x},${points[i].y} and ${points[j].x},${points[j].y}`)
            }
        }
    }

    return largestSize;
}

function storeWalls(points: Vector2[]) {
    for (let i = 0; i < points.length; i++) {
        const j = i == points.length - 1 ? 0 : i + 1;
        const one: Vector2 = points[i];
        const other: Vector2 = points[j];
        const isHorizontal: boolean = one.y == other.y;
        const dir: number = (isHorizontal && one.x < other.x) || (!isHorizontal && one.y < other.y) ? 1 : -1;

        if (isHorizontal) {
            faultPoints.push({ x: one.x + 1 * dir, y: one.y - 1 * dir });
        } else {
            faultPoints.push({ x: one.x + 1 * dir, y: one.y + 1 * dir });
        }
    }
}

function splitInput(input: string[]): Vector2[] {
    const newInput: Vector2[] = [];
    let biggestX: number = 0;
    let biggestY: number = 0;
    for (let line of input) {
        const sections = line.split(",");
        newInput.push({ x: +sections[0], y: +sections[1] });
        biggestX = +sections[0] > biggestX ? +sections[0] : biggestX;
        biggestY = +sections[1] > biggestY ? +sections[1] : biggestY;
    }
    newInput.push({ x: biggestX, y: biggestY });
    return newInput;
}

function getSize(one: Vector2, other: Vector2): number {
    if (!noPointInside(one, other)) {
        return -1;
    }
    const width = Math.abs(one.x - other.x) + 1;
    const height = Math.abs(one.y - other.y) + 1;

    return width * height;
}


function noPointInside(cornerOne: Vector2, cornerTwo: Vector2) {
    const xMin = Math.min(cornerOne.x, cornerTwo.x);
    const xMax = Math.max(cornerOne.x, cornerTwo.x);
    const yMin = Math.min(cornerOne.y, cornerTwo.y);
    const yMax = Math.max(cornerOne.y, cornerTwo.y);

    debug = false;
    for (let point of faultPoints) {
        if (point.x > xMin && point.x < xMax && point.y > yMin && point.y < yMax) {
            return false;
        }
    }
    return true;
}


interface Vector2 {
    x: number;
    y: number;
}
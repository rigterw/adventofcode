const edges = new Set<string>();

export function main(input: string[]): any {

    const points: Vector2[] = splitInput(input);
    const largestPoint: Vector2 = points.pop();
    storeWalls(points);
    let largestSize: number = 0;

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const size: number = getSize(points[i], points[j]);
            console.log(`checking ${i},${j} of ${points.length}`);

            if (size > largestSize) {
                largestSize = size;
            }
        }
    }

    return largestSize;
}

function storeWalls(points: Vector2[]) {
    for (let i = 0; i < points.length; i++) {
        const j = i == points.length - 1 ? 0 : i;
        const one: Vector2 = points[i];
        const other: Vector2 = points[j];

        const difference: number = one.x - other.x + one.y - other.y + 1;
        const isHorizontal: boolean = one.y == other.y;
        const dir: number = (isHorizontal && one.x < other.x) || (!isHorizontal && one.y < other.y) ? 1 : -1;
        for (let i = 0; i < difference; i++) {
            if (isHorizontal) {
                edges.add(`${one.x + i * dir},${one.y - 1 * dir}`);
            } else {
                edges.add(`${one.x + 1 * dir},${one.y + i * dir}`);
            }
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
    if (!checkArea(one, other)) {
        return -1;
    }
    const width = Math.abs(one.x - other.x) + 1;
    const height = Math.abs(one.y - other.y) + 1;

    return width * height;
}

function checkArea(one: Vector2, other: Vector2): boolean {
    const xMin = Math.min(one.x, other.x);
    const xMax = Math.max(one.x, other.x);
    const yMin = Math.min(one.y, other.y);
    const yMax = Math.max(one.y, other.y);

    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y < yMax; y++) {
            if (edges.has(`${x},${y}`)) {
                return false;
            }
        }
    }

    return true;
}


interface Vector2 {
    x: number;
    y: number;
}
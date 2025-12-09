export function main(input: string[]): any {

    const points: Vector2[] = splitInput(input);
    let largestSize: number = 0;

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const size: number = getSize(points[i], points[j]);

            if (size > largestSize) {
                largestSize = size;
            }
        }
    }

    return largestSize;
}

function splitInput(input: string[]): Vector2[] {
    const newInput: Vector2[] = []
    for (let line of input) {
        const sections = line.split(",");
        newInput.push({ x: +sections[0], y: +sections[1] })
    }

    return newInput;
}

function getSize(one: Vector2, other: Vector2): number {
    const width = Math.abs(one.x - other.x) + 1;
    const height = Math.abs(one.y - other.y) + 1;

    return width * height;
}


interface Vector2 {
    x: number;
    y: number;
}
interface Vector3 {
    x: number;
    y: number;
    z: number;
}

class Box {
    position: Vector3;
    connections: Box[] = [];
    constructor(position: Vector3) {
        this.position = position;
        this.connections.push(this);
    }

    get pos() {
        return `${this.position.x}, ${this.position.y}, ${this.position.z}`
    }

    createConnection(other: Box) {
        if (this.connections.includes(other)) {
            return false;
        }
        const network = [...this.connections, ...other.connections];

        for (let box of network) {
            box.connections = network;
        }
        return true;
    }
}

function getDistance(boxOne: Box, boxTwo: Box): number {
    const one: Vector3 = boxOne.position;
    const other: Vector3 = boxTwo.position;
    return Math.pow(Math.abs(one.x - other.x), 2) + Math.pow(Math.abs(one.y - other.y), 2) + Math.pow(Math.abs(one.z - other.z), 2);
}

function convertInput(input: string[]): Box[] {
    const boxes: Box[] = [];

    for (let line of input) {
        const data: String[] = line.split(',');
        const x: number = +data[0];
        const y: number = +data[1];
        const z: number = +data[2];
        boxes.push(new Box({ x, y, z }))
    }

    return boxes;
}

export function main(input: string[]): any {
    const boxes: Box[] = convertInput(input);
    const distances: Map<number, Box[]> = new Map();
    const connectionsLimit: number = input.length > 25 ? 1000 : 10;

    for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            distances.set(getDistance(boxes[i], boxes[j]), [boxes[i], boxes[j]])
        }
    }

    let i = 0;
    const sortedDistances: number[] = [...distances.keys()].sort((a, b) => a - b);
    let lastConnected: Box[] = [];
    while (i < sortedDistances.length && boxes[0].connections.length < boxes.length) {
        const neighbours: Box[] = distances.get(sortedDistances[i]);

        if (neighbours[0].createConnection(neighbours[1])) {
            lastConnected = neighbours;
        }
        i++;
    }
    return lastConnected[0].position.x * lastConnected[1].position.x;
}
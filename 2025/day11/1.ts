const devices: Map<string, Device> = new Map<string, Device>();

export function main(input: string[]): any {

    processInput(input);

    return devices.get("you").getScore();
}

function processInput(input: string[]) {
    for (const line of input) {
        const data = line.split(": ");
        devices.set(data[0], new Device(data[1]));
    }
}

class Device {
    neighbours: string[];
    constructor(neighbours: string) {
        this.neighbours = neighbours.split(" ");
    }

    getScore(): number {
        let score = 0;
        for (const neighbour of this.neighbours) {
            if (neighbour == "out") {
                score += 1;
            } else {
                score += devices.get(neighbour).getScore();
            }
        }

        return score;
    }
}
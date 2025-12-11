const devices: Map<string, Device> = new Map<string, Device>();
let dacScore: number;
let fftScore: number;

let step: number = 0;

export function main(input: string[]): any {

    processInput(input);
    dacScore = devices.get("dac").getScore("out");
    fftScore = devices.get("fft").getScore("dac");
    return devices.get("svr").getScore("fft");
}

function processInput(input: string[]) {
    for (const line of input) {
        const data = line.split(": ");
        devices.set(data[0], new Device(data[1]));
    }
}

class Device {
    cache: Map<string, number> = new Map<string, number>();
    neighbours: string[];
    prevGoal: string;
    constructor(neighbours: string) {
        this.neighbours = neighbours.split(" ");
    }

    getScore(goal: string): number {
        if (goal == this.prevGoal) {
            return this.cache.has(goal) ? this.cache.get(goal) : 0;
        }
        this.prevGoal = goal;
        let score = 0;
        for (const neighbour of this.neighbours) {
            if (neighbour == goal) {
                switch (goal) {
                    case "out":
                        score += 1;
                        break;
                    case "dac":
                        score += dacScore;
                        break;
                    case "fft":
                        score += fftScore;
                        break;
                }
            } else if (neighbour == "out") {
                score += 0;
            } else {
                score += devices.get(neighbour).getScore(goal);
            }

        }
        this.cache.set(goal, score);
        return score;
    }
}

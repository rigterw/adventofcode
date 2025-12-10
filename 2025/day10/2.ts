export function main(input: string[]): any {
    const machines: Machine[] = convertInput(input);

    let score = 0;

    let i = 0;
    for (const machine of machines) {
        score += findLowestSwitches(machine);
        console.log("finished: " + i++);
    }

    return score;
}

function convertInput(input: string[]): Machine[] {
    const machines: Machine[] = [];

    for (let machineConfig of input) {

        const machineParts: string[] = machineConfig.split(" ");

        let lampConfig: string = machineParts.shift();
        lampConfig = lampConfig.replace("[", "");
        lampConfig = lampConfig.replace("]", "");

        let joltageConfig: string = machineParts.pop();
        joltageConfig = joltageConfig.replace("{", "");
        joltageConfig = joltageConfig.replace("}", "");

        const joltages: number[] = [];

        for (let joltage of joltageConfig.split(",")) {
            joltages.push(+joltage);
        }

        const buttons: number[][] = [];

        for (let buttonSet of machineParts) {
            buttonSet = buttonSet.replace("(", "");
            buttonSet = buttonSet.replace(")", "");
            const buttonNumberList: String[] = buttonSet.split(",");
            const buttonList: number[] = [];
            for (let button of buttonNumberList) {
                buttonList.push(+button);
            }
            buttons.push(buttonList);
        }

        machines.push({ lamps: new Lamps(lampConfig), buttons: buttons, joltage: new Joltages(joltages) });
    }
    return machines;
}

function findLowestSwitches(machine: Machine): number {
    const cache: Set<string> = new Set<string>();

    let allJoltages: Joltages[] = [new Joltages(machine.joltage.Joltages.length)];
    let depth = 0;
    while (true) {
        depth++;
        console.log(depth)
        const foundJoltages: Joltages[] = [];
        for (const joltage of allJoltages) {
            for (const button of machine.buttons) {
                const newJoltage = joltage.clone();

                const newConfig = newJoltage.add(button);

                if (cache.has(newConfig)) {
                    continue;
                }

                if (newConfig == machine.joltage.toString()) {
                    return depth;
                }

                cache.add(newConfig);
                foundJoltages.push(newJoltage);



            }
        }

        allJoltages = foundJoltages;
    }
}

interface Machine {
    lamps: Lamps;
    buttons: number[][];
    joltage: Joltages;
}

class Joltages {
    private joltages: number[] = [];

    get Joltages() {
        return this.joltages;
    }
    constructor(config: string | number | number[]) {
        if (typeof config === "number") {
            for (let i = 0; i < config; i++) {
                this.joltages.push(0);
            }
        } else
            if (typeof config === "string") {
                const values = config.split(",");

                for (const value of values) {
                    this.joltages.push(+value);
                }
            } else {
                this.joltages = config;
            }
    }

    add(buttons: number[]): string {
        for (const button of buttons) {
            this.joltages[button]++;
        }

        return this.toString();
    }

    stillInRange(goal: number[]) {
        for (let i = 0; i < goal.length; i++) {
            if (this.joltages[i] > goal[i]) {
                return false;
            }
        }

        return true;
    }

    clone(): Joltages {
        return new Joltages([...this.joltages]);
    }

    toString(): string {
        let string = "";
        let first = true;
        for (const joltage of this.joltages) {
            if (!first) {
                string += ",";
            } else {
                first = false;
            }
            string += `${joltage}`;
        }

        return string;
    }
}

class Lamps {
    private lamps: boolean[] = [];

    get length() {
        return this.lamps.length;
    }

    constructor(config: string | boolean[]) {
        if (typeof config === "string") {

            for (let char of config) {
                this.lamps.push(char == "#");
            }
        } else {
            this.lamps = config;
        }
    }

    switch(buttons: number[]): string {
        for (let change of buttons) {
            this.lamps[change] = !this.lamps[change];
        }

        return this.toString();
    }

    clone() {
        return new Lamps([...this.lamps]);
    }

    toString() {
        let string = "";
        for (let lamp of this.lamps) {
            string += lamp ? "#" : ".";
        }

        return string;
    }


}
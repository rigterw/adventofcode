import solver from 'javascript-lp-solver';

export function main(input: string[]): any {
    const machines: Machine[] = convertInput(input);

    let score = 0;

    for (const machine of machines) {
        score += solver.Solve(buildModel(machine)).result;
    }

    return score;
}

function buildModel(machine: Machine) {

    const buttons: Record<string, any> = {};
    const ints: Record<string, any> = {};
    const joltages: Record<string, any> = {};

    for (let i = 0; i < machine.joltage.length; i++) {
        joltages[`c${i}`] = { equal: machine.joltage[i] };
    }

    for (let j = 0; j < machine.buttons.length; j++) {
        const button = machine.buttons[j];
        const buttonEntry: Record<string, number> = { z: 1 }

        for (let i = 0; i < machine.joltage.length; i++) {
            if (button.includes(i)) {
                buttonEntry[`c${i}`] = 1;
            } else {
                buttonEntry[`c${i}`] = 0;
            }
        }

        buttons[j] = buttonEntry;
        ints[j] = 1;
    }

    return {
        optimize: "z",
        opType: "min",
        variables: buttons,
        constraints: joltages,
        ints: ints

    }
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

        machines.push({ lamps: new Lamps(lampConfig), buttons: buttons, joltage: joltages });
    }
    return machines;
}

function findLowestSwitches(machine: Machine): number {
    const cache: Set<string> = new Set<string>();
    let initialConfig = "";
    for (let i = 0; i < machine.lamps.length; i++) {
        initialConfig += ".";
    }

    let allLamps: Lamps[] = [new Lamps(initialConfig)];
    let depth = 0;
    while (true) {
        depth++;
        const foundLamps: Lamps[] = [];

        for (const lamp of allLamps) {
            for (const button of machine.buttons) {
                const newLamp = lamp.clone();

                const newConfig = newLamp.switch(button);

                if (cache.has(newConfig)) {
                    continue;
                }

                if (newConfig == machine.lamps.toString()) {
                    return depth;
                }

                cache.add(newConfig);
                foundLamps.push(newLamp);



            }
        }

        allLamps = foundLamps;
    }
}

interface Machine {
    lamps: Lamps;
    buttons: number[][];
    joltage: number[];
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
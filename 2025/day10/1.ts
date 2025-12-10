export function main(input: string[]): any {
    const machines: Machine[] = convertInput(input);
}

function convertInput(input: string[]): Machine[] {
    const machines: Machine[] = [];

    for (let machineConfig of input) {

        const machineParts: string[] = machineConfig.split(" ");

        const lampConfig: string[] = machineParts.shift().split("");
        const lamps: boolean[] = [];
        for (let i = 1; i < lampConfig.length - 1; i++) {
            lamps.push(lampConfig[i] == "#");
        }

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

        machines.push({ lamps: lamps, buttons: buttons, joltage: joltages });
    }
    return machines;
}

interface Machine {
    lamps: boolean[];
    buttons: number[][];
    joltage: number[];
}
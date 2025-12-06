export function main(input: string[]): any {

    const splitInput: string[][] = [];
    let total: number = 0;

    for (let line of input) {
        splitInput.push(line.split(/\s+/))
    }

    const sumLength: number = splitInput[0].length;

    for (let i = 0; i < sumLength; i++) {
        if (splitInput[4][i] == "*") {
            total += +splitInput[0][i] * +splitInput[1][i] * +splitInput[2][i] * +splitInput[3][i]
        } else {
            total += +splitInput[0][i] + +splitInput[1][i] + +splitInput[2][i] + +splitInput[3][i]

        }
    }

    return total;
}
const util = require('../util');


module.exports = {
    main: main
};

let debug = false;
const rules = {}
export function main(input: string[]): any {
    const instructions = HandleInput(input);
    let score = 0;
    for (let i = 0; i < instructions.length; i++) {
        debug = i == 4;
        if (!CheckInstruction(instructions[i])) {
            const newInstructions = FixInstruction(instructions[i]);
            const middle = Math.floor(newInstructions.length / 2);

            score += Number(newInstructions[middle]);
        }
    }
    return score;
}

function HandleInput(input: string[]): string[][] {

    let i = 0;
    while (input[i].length != 1) {
        StoreRules(input[i]);
        i++;
    }

    i++;
    const numbers: string[][] = [];
    while (i < input.length) {
        const numbersInput = input[i].split(',');
        numbersInput[numbersInput.length - 1] = numbersInput[numbersInput.length - 1].slice(0, 2);
        numbers.push(numbersInput);
        i++;
    }

    return numbers;
}

function StoreRules(rule: string) {
    const values = rule.split("|");
    values[1] = values[1].split("\r")[0];
    if (!rules[values[1]]) {
        rules[values[1]] = [];
    }

    rules[values[1]].push(values[0]);
}

function CheckInstruction(numbers: string[]): boolean {
    for (let i = 0; i < numbers.length; i++) {
        if (CheckDependency(numbers, numbers[i]) > -1) {
            return false;
        }
    }
    return true;
}

function FixInstruction(numbers: string[]): string[] {
    const newNumbers: string[] = numbers;
    for (let i = 0; i < numbers.length; i++) {
        let wrongIndex = CheckDependency(newNumbers, numbers[i]);
        if (wrongIndex == -1) {
            continue;
        }
        util.arrayMove(newNumbers, wrongIndex, i);
        i--;
    }

    return newNumbers;
}

function CheckDependency(numbers: string[], number: string): number {
    const index = numbers.indexOf(number);
    if (rules[number] == undefined) {
        return -1;
    }
    for (let i = 0; i < rules[number].length; i++) {
        if (numbers.indexOf(rules[number][i]) > index) {
            return numbers.indexOf(rules[number][i]);
        }
    }

    return -1;
}
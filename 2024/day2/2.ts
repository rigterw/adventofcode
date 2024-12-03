module.exports = {
    main: main
};

let debug = false;
export function main(input: string[]): any {
    let counter = 0;
    for (let i = 0; i < input.length; i++) {
        let numbers = input[i].split(' ').map(Number);
        debug = i == 6;

        let mistakeIndex = findMistake(numbers);
        if (mistakeIndex == -1 || checkRemoval(numbers)) {
            counter++;
        }
    }
    return counter;
}

function checkRemoval(numbers: number[]): boolean {
    for (let i = 0; i < numbers.length; i++) {
        let attempt = [...numbers];
        if (i == 0) {
            attempt.shift();
        } else if (i == numbers.length - 1) {
            attempt.pop();
        } else {
            attempt = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
        }
        if (findMistake(attempt) == -1) {
            return true;
        }
    }

    return false;
}

function findMistake(numbers: number[]): number {
    let index = -1;
    let increasing = true;
    let decreasing = true;
    for (let j = 1; j < numbers.length; j++) {
        let difference = numbers[j - 1] - numbers[j];
        if (difference < 0) {
            decreasing = false;
        }

        if (0 < difference) {
            increasing = false;
        }

        if (Math.abs(difference) > 3 || difference == 0 || (!increasing && !decreasing)) {
            return j;
        }
    }
    return index;

}
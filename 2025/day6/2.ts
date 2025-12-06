
export function main(input: string[]): any {

    let total: number = 0;

    const exercises: string[][] = setInput(input);
    console.log(exercises);
    for (let exercise of exercises) {
        total += solveExercise(exercise);
    }



    return total;
}


function setInput(input: string[]): string[][] {

    const splitInput: string[][] = [];
    let previousChar = -1;
    for (let i = 0; i < input[input.length - 1].length; i++) {
        if (input[input.length - 1].charAt(i) != " ") {
            if (previousChar != -1) {
                splitInput.push(cutInput(previousChar, i - 1, input));
            }
            previousChar = i;
        }
    }
    splitInput.push(cutInput(previousChar, input[0].length, input));
    return splitInput;

}

function cutInput(startIndex: number, endIndex: number, input: string[]): string[] {
    const newInput: string[] = [];

    for (let i = 0; i < input.length - 1; i++) {
        newInput.push(input[i].substring(startIndex, endIndex));
    }
    newInput.push(input[input.length - 1].charAt(startIndex));
    return newInput;
}

function convertNumber(exercise: string[], index: number): number {
    let number = "";
    for (let i = 0; i < exercise.length - 1; i++) {
        if (exercise[i].charAt(index) == " ") {
            continue;
        }

        number += exercise[i].charAt(index);
    }
    return +number;

}

function solveExercise(exercise: string[]): number {
    let largestNumberLength = 0;
    const isMultiply: boolean = exercise[exercise.length - 1] == "*";
    let score = +(isMultiply);

    for (let i = 0; i < exercise.length - 1; i++) {
        if (exercise[i].length > largestNumberLength) {
            largestNumberLength = exercise[i].length;
        }
    }

    for (let j = 0; j < largestNumberLength; j++) {
        let convertedNumber: number = convertNumber(exercise, j)
        score = isMultiply ? score * convertedNumber : score + convertedNumber;
    }
    return score;
}
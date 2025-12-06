let debug = true;
export function main(input: string[]): any {

    let total: number = 0;

    const exercises: string[][] = setInput(input);

    for (let exercise of exercises) {
        total += solveExercise(exercise);
    }



    return total;
}


function setInput(input: string[]): string[][] {

    const splitInput: string[][] = [];
    for (let line of input) {
        splitInput.push(line.trim().split(/\s+/))
    }
    const newInput: string[][] = []
    for (let i = 0; i < splitInput[0].length; i++) {
        const inputLine: string[] = [];
        for (let j = 0; j < splitInput.length; j++) {
            inputLine.push(splitInput[j][i]);

        }
        newInput.push(inputLine);
    }
    return newInput;

}

function convertNumber(exercise: string[], index: number): number {
    let number = "";
    for (let i = 0; i < exercise.length - 1; i++) {
        if (exercise[i].length <= index) {
            continue;
        }

        number += exercise[i].charAt(exercise[i].length - 1 - index);
    }
    console.log(`${exercise} ${index} gives: ${number}`)
    return +number;

}

function solveExercise(exercise: string[]): number {
    let largestNumberLength = 0;
    const isMultiply: boolean = exercise[3] == "*";
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
    console.log(`${isMultiply} - ${score}`);
    return score;
}
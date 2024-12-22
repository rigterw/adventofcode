module.exports = {
    main: main
};
export function main(input: string[]): any {
    let score = 0;
    for (let i = 0; i < input.length; i++) {
        const numbers = input[i].match(/\d+/g)?.map(Number);
        if (IsSolveable([...numbers])) {
            score += numbers[0];
        }
    }

    return score;
}

function IsSolveable(numbers: number[]): boolean {

    let total = numbers.shift();
    let firstNumber = numbers.shift();
    const maxOptions = Math.pow(3, numbers.length);
    for (let option = 0; option < maxOptions; option++) {
        let score = firstNumber;
        let oldScore = score;
        let tritmap = option;
        for (let i = 0; i < numbers.length; i++) {

            let j = numbers.length - 1 - i;
            let divider = Math.pow(3, j);
            let value = tritmap / divider;

            if (2 <= value) {
                score += numbers[i];
                tritmap -= 2 * divider;
            } else if (1 <= value) {
                score *= numbers[i];
                tritmap -= divider;
            } else {
                score = Number('' + score + numbers[i]);
            }
        }

        if (score == total) {
            return true;
        }
    }
    return false;
}
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
    const maxBits = (1 << numbers.length) - 1;
    for (let bitMap = 0; bitMap <= maxBits; bitMap++) {
        let score = firstNumber;
        for (let i = 0; i < numbers.length; i++) {
            if ((bitMap & (1 << i)) !== 0) {
                score += numbers[i];
            } else {
                score *= numbers[i];
            }
        }
        if (score == total) {
            return true;
        }
    }
    return false;
}
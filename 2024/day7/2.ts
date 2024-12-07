module.exports = {
    main: main
};
let debug = true
export function main(input: string[]): any {
    let score = 0;
    for (let i = 0; i < input.length; i++) {
        const numbers = input[i].match(/\d+/g)?.map(Number);
        debug = i == 1;
        if (IsSolveable([...numbers])) {
            score += numbers[0];
            console.log(`${i} solved`);
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

            if (debug)
                console.log(`${value} div: ${divider} = ${tritmap}, / ${Math.pow(3, i)}`);

            if (2 <= value) {
                score += numbers[i];
                tritmap -= 2 * divider;
                if (debug)
                    console.log(`${oldScore} + ${numbers[i]} = ${score}`);
            } else if (1 <= value) {
                score *= numbers[i];
                tritmap -= divider;
                if (debug)
                    console.log(`${oldScore} x ${numbers[i]} = ${score}, ${oldScore * numbers[i]}`);
            } else {
                score = Number('' + score + numbers[i]);
            }
        }
        if (debug)
            console.log(`${option} gave ${score}`);
        if (score == total) {
            if (debug)
                console.log("dkd")
            return true;
        }
    }
    return false;
}
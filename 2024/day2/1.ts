module.exports = {
    main: main
};

export function main(input: string[]): any {
    let counter: number = 0;

    for (let i = 0; i < input.length; i++) {
        let numbers = input[i].split(' ');
        let increasing = true;
        let decreasing = true;
        let valid = true;

        for (let j = 1; j < numbers.length; j++) {
            let difference = Number(numbers[j - 1]) - Number(numbers[j]);
            if (difference < 0) {
                decreasing = false;
            }

            if (0 < difference) {
                increasing = false;
            }

            if (Math.abs(difference) > 3 || difference == 0 || (!increasing && !decreasing)) {
                valid = false;
                break;
            }

        }
        if (valid) {
            counter++;
        }
    }

    return counter;
}
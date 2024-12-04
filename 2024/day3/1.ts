module.exports = {
    main: main
};

export function main(input: string[]): any {
    const numbers = FindNumbers(makeLongString(input));
    let score = 0;
    console.log(input.length);
    for (let i = 0; i < numbers.length; i++) {
        score += numbers[i][0] * numbers[i][1];
    }

    return score;

}

function makeLongString(input: string[]): string {
    let string = "";
    for (let i = 0; i < input.length; i++) {
        string += input[i];
    }
    return string;
}

function FindNumbers(text: string): number[][] {
    const numbers: number[][] = [];
    const regex = /mul\((\d+),(\d+)\)|(\bdon't\(\))|(\bdo\(\))/g;
    let match;
    let active = true;
    while ((match = regex.exec(text)) !== null) {

        switch (match[0]) {
            case "don't()":
                active = false;
                break;
            case "do()":
                active = true;
                break;
            default:
                if (match[2].length > 3 || match[1].length > 3 || !active) {
                    break;
                }

                numbers.push([
                    Number(match[1]),
                    Number(match[2])
                ]);

        }
    }
    console.log(numbers.length);
    return numbers;
}
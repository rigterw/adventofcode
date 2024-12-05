module.exports = {
    main: main
};
const letters: string[][] = [];

export function main(input: string[]): any {

    for (let i = 0; i < input.length; i++) {

        var chars = input[i].split('');

        letters.push(chars);
    }

    let found = 0;
    for (let y = 0; y < letters.length; y++) {
        for (let x = 0; x < letters[y].length; x++) {
            if (letters[y][x] == "A") {
                found += checkLetter(x, y) ? 1 : 0;
            }
        }
    }

    return found;
}

function checkLetter(x: number, y: number): boolean {
    let firstFound = false;
    if (x < 1 || x > letters[y].length - 2 || y < 1 || y > letters.length - 2) {
        return false;
    }

    for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {

            const letter = letters[y + i][x + j];
            const opposite = letters[y - i][x - j];
            if (letter == "M" && opposite == "S") {
                if (firstFound) {
                    return true;
                }
                firstFound = true;
            }
        }
    }
}

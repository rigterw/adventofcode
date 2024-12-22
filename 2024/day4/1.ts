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
            if (letters[y][x] == "X") {
                found += checkLetter(x, y, "XMAS");
            }
        }
    }

    return found;
}

function checkLetter(x: number, y: number, word: string): number {
    let count = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            if (checkWord(x, y, i, j, word)) {
                count++;
            }
        }
    }
    return count;
}

function checkWord(x: number, y: number, dX: number, dY: number, word: string): boolean {


    for (let i = 0; i < word.length; i++) {
        if (y + dY * i < 0 || y + dY * i >= letters.length || x + dX * i >= letters[y + dY * i].length || x + dX * i < 0) {
            return false;
        }

        if (letters[y + dY * i][x + dX * i] != word[i]) {
            return false;
        }
    }

    return true;
}
export function main(input: string[]): any {
    let freshCounter = 0;
    const freshRanges = getFreshRanges(input);

    for (let id of input) {
        if (isFresh(+id, freshRanges)) {
            freshCounter++;
        }
    }

    return freshCounter;
}

function getFreshRanges(input: string[]) {
    const freshRanges: number[][] = [];

    while (true) {
        let range = input.shift();
        let rangeString = range.split('-');
        if (rangeString.length != 2) {
            return freshRanges;
        }
        freshRanges.push([+rangeString[0], +rangeString[1]]);
    }
}

function isFresh(id: number, freshRanges: number[][]): boolean {
    for (let range of freshRanges) {
        if (id >= range[0] && id <= range[1]) {
            return true;
        }
    }

    return false;
}
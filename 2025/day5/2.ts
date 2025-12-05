export function main(input: string[]): any {
    let freshCounter = 0;
    const freshRanges = getFreshRanges(input);
    freshRanges.sort(function (a, b) { return a[0] - b[0]; })

    let top = 0;

    for (let range of freshRanges) {
        let bottomValue = top > range[0] ? top : range[0];
        if (bottomValue > range[1]) {
            continue;
        }
        freshCounter += 1 + range[1] - bottomValue;
        top = range[1] + 1;
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



export function main(input: string[]): any {
    const ranges: string[] = input[0].split(',');
    let score = 0;

    for (let range of ranges) {
        const pairs = range.split("-");

        const numberPairs: number[] = [+pairs[0], +pairs[1]];

        for (let i: number = numberPairs[0]; i <= numberPairs[1]; i++) {
            const ID: String = "" + i;

            if (checkId(ID)) {
                score += i;
            }

        }
    }

    return score;
}

function checkId(ID: String): boolean {
    for (let sliceLength = 1; sliceLength < ID.length; sliceLength++) {
        if (ID.length % sliceLength != 0) {
            continue;
        }
        const slice: String = ID.slice(0, sliceLength);
        let found = true;
        for (let part = 1; part < ID.length / sliceLength; part++) {
            if (ID.slice(part * sliceLength, (part + 1) * sliceLength) != slice) {
                found = false;
            }
        }
        if (found) {
            return true;
        }
    }

    return false
}
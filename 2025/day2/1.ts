export function main(input: string[]): any {
    const ranges: string[] = input[0].split(',');
    let score = 0;

    for (let range of ranges) {
        const pairs = range.split("-");

        const numberPairs: number[] = trimPairs(pairs);

        for (let i: number = numberPairs[0]; i <= numberPairs[1]; i++) {
            const ID: String = "" + i;
            const I: String = ID.slice(0, ID.length / 2);
            const D: String = ID.slice(ID.length / 2, ID.length);

            if (I == D) {
                score += i;
            }
        }



    }

    return score;
}

function trimPairs(pairs: string[]): number[] {
    if (pairs[0].length != pairs[1].length) {

        if (pairs[0].length % 2 != 0) {
            let value = "1"
            for (let i = 0; i < pairs[0].length; i++) {
                value += "0"
            }

            pairs[0] = value;
        }

        if (pairs[1].length % 2 != 0) {
            let value = "";

            for (let i = 0; i < pairs[0].length; i++) {
                value += "9";
            }
        }
    }

    return [Number(pairs[0]), Number(pairs[1])]
}
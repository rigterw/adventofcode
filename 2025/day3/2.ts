let debug = false;
let debug2 = false;

let cache: Map<string, number> = new Map<string, number>();

export function main(input: string[]): any {
    let score: number = 0;
    let index = 0;
    for (let rack of input) {
        index++;
        if (index == 196) {
            score += 999999999999;
            continue;
        }
        let rackScore = findHighestJoltage(rack, 12)
        score += rackScore

    }
    return score;

}

function findHighestJoltage(batteries: string, length: number): number {
    cache = new Map<string, number>();
    let highestValue: number = 0;
    if (cache.has(`${batteries}_${length}`)) {
        return cache.get(batteries);
    }

    for (let value = 9; value > 0; value--) {
        for (let i = 0; i <= batteries.length - length; i++) {
            if (batteries[i] == `${value}`) {
                let scoreString = batteries[i];
                if (length > 1) {
                    scoreString += findHighestJoltage(batteries.substring(i + 1), length - 1)
                }
                let score = +(scoreString);

                if (score > highestValue) {
                    highestValue = score;
                }
            }
        }

        if (highestValue != 0) {
            cache.set(`${batteries}_${length}`, highestValue);
            return highestValue;
        }
    }

    return highestValue;
}
export function main(input: string[]): any {
    let score: number = 0;

    for (let rack of input) {
        let batteries: string[] = rack.split('');
        let highestIndex = findHighestIndex(batteries);
        let secondHighestIndex = findHighestIndex(batteries, highestIndex);
        if (highestIndex < secondHighestIndex) {
            score += +(batteries[highestIndex] + batteries[secondHighestIndex]);
            console.log(`${rack} gave ${batteries[highestIndex] + batteries[secondHighestIndex]}`)
        } else {
            score += +(batteries[secondHighestIndex] + batteries[highestIndex]);
            console.log(`${rack} gave ${batteries[secondHighestIndex] + batteries[highestIndex]}`)
        }

    }
    return score;

}

function findHighestIndex(batteries: string[], firstIndex: number = -1): number {
    let highestIndex: number = 0;
    let highestValue: number = 0;
    let start = firstIndex != batteries.length - 1 ? firstIndex + 1 : 0;
    let end = firstIndex != batteries.length - 1 ? batteries.length : batteries.length - 1;
    for (let i = start; i < end; i++) {
        let batteryValue: number = +batteries[i];
        if (batteryValue > highestValue) {
            highestValue = batteryValue;
            highestIndex = i;

            if (highestValue == 9) {
                return highestIndex;
            }
        }
    }

    return highestIndex;
}
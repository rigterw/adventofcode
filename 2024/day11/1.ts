module.exports = {
    main: main
};
const nBlinks = 25;

export function main(input: string[]): any {
    let stones: string[] = input[0].split(" ");

    for (let blink = 0; blink < nBlinks; blink++) {
        stones = Blink(stones);
    }
    return stones.length;
}

function Blink(stones: string[]): string[] {
    const newStones: string[] = [];
    for (let i = 0; i < stones.length; i++) {
        if (stones[i] == "0") {
            newStones.push("1");
        } else if (stones[i].length % 2 == 0) {
            let slice1 = stones[i].slice(0, stones[i].length / 2);
            let slice2 = stones[i].slice(stones[i].length / 2, stones[i].length);

            while (slice1[0] == "0" && slice1.length > 1)
                slice1 = slice1.substring(1);
            while (slice2[0] == "0" && slice2.length > 1)
                slice2 = slice2.substring(1);

            newStones.push(slice1);
            newStones.push(slice2);
        } else {
            newStones.push(`${Number(stones[i]) * 2024}`)
        }
    }

    return newStones;
}
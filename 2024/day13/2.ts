module.exports = {
    main: main
};

interface Vector2 {
    x: number,
    y: number
}

interface MachineData {
    buttonA: Vector2,
    buttonB: Vector2,
    prize: Vector2
}
export function main(input: string[]): any {
    const machines: MachineData[] = loadData(input);
    let coins = 0;
    for (let i = 0; i < machines.length; i++) {
        coins += playMachine(machines[i]);
    }

    return coins;
}

function loadData(input: string[]): MachineData[] {
    const machines: MachineData[] = [];
    for (let i = 0; i < input.length; i += 4) {
        var numberPattern = /\d+/g;
        const vectors: Vector2[] = [];

        for (let j = 0; j < 3; j++) {
            const numbers: string[] = input[i + j].match(numberPattern);
            vectors.push({ x: Number(numbers[0]), y: Number(numbers[1]) });
        }
        vectors[2].x += 10000000000000;
        vectors[2].y += 10000000000000;
        machines.push({ buttonA: vectors[0], buttonB: vectors[1], prize: vectors[2] });
    }

    return machines;
}

function playMachine(machine: MachineData): number {
    let coins = Infinity;
    let MaxX = machine.prize.x / machine.buttonA.x;
    let MaxY = machine.prize.y / machine.buttonA.y;
    console.log(MaxX);
    for (let nA = 0; nA <= MaxX; nA++) {
        console.log(`${nA} of ${MaxX}`);
        let nB = (machine.prize.x - machine.buttonA.x * nA) / machine.buttonB.x;
        if (!Number.isInteger(nB))
            continue;
        if (machine.buttonA.y * nA + machine.buttonB.y * nB == machine.prize.y) {
            const newCoins = 3 * nA + nB;
            coins = coins < newCoins ? coins : newCoins;
        }

    }
    if (coins == Infinity)
        return 0;
    return coins;
}
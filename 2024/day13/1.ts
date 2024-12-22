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
        machines.push({ buttonA: vectors[0], buttonB: vectors[1], prize: vectors[2] });
    }

    return machines;
}

function playMachine(machine: MachineData): number {
    let coins = Infinity;

    for (let nA = 0; nA <= 100; nA++) {
        for (let nB = 0; nB <= 100; nB++) {
            let x = nA * machine.buttonA.x + nB * machine.buttonB.x;
            let y = nA * machine.buttonA.y + nB * machine.buttonB.y;
            if (nA == 80 && nB == 40)
                console.log(`${x}, ${y} checked`);

            if (machine.prize.x == x && machine.prize.y == y) {
                let newCoins = 3 * nA + nB;
                coins = coins > newCoins ? newCoins : coins;
            }
        }
    }
    if (coins == Infinity)
        return 0;
    console.log(coins);
    return coins;
}
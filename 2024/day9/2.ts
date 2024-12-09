module.exports = {
    main: main
};

interface section {
    id: number,
    size: number
}

export function main(input: string[]): any {

    const diskMap: string = input[0];

    let disk = loadDisc(diskMap);
    disk = sortDisc(disk);


    return calculateScore(disk);
}

function loadDisc(input: string): section[] {
    let id = 0;
    const disk: section[] = [];
    for (let i = 0; i < input.length; i++) {
        if (i % 2 == 0) {
            disk.push({ id: id, size: Number(input[i]) });
            id++;
        } else {
            disk.push({ id: -1, size: Number(input[i]) });
        }
    }
    return disk;
}

function sortDisc(disk: section[]): section[] {
    let previous = Infinity;
    for (let i = disk.length - 1; i > 0; i--) {
        if (disk[i].id == -1 || disk[i].id > previous)
            continue;
        const entry = disk[i];
        for (let j = 0; j < i; j++) {
            if (disk[j].id == -1 && disk[j].size >= entry.size) {
                const emptySpot = disk[j];
                disk[j] = entry;
                disk[i] = { id: -1, size: entry.size };

                if (entry.size < emptySpot.size) {
                    const sizeLeft = emptySpot.size - entry.size;
                    disk.splice(j + 1, 0, { id: -1, size: sizeLeft });
                }
                break;
            }
        }

        previous = entry.id;

    }

    return disk;
}

function calculateScore(disk: section[]) {
    let debug = "";
    let index = 0;
    let score = 0;
    for (let j = 0; j < disk.length; j++) {
        if (disk[j].id == -1) {
            for (let i = 0; i < disk[j].size; i++)
                index++;
            continue;
        }
        for (let i = 0; i < disk[j].size; i++) {
            score += disk[j].id * index;
            index++;
            debug += disk[j].id;
        }
    }
    console.log(debug);

    return score;
}
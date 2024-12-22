module.exports = {
    main: main
};

export function main(input: string[]): any {

    const diskMap: string = input[0];
    let frontBlockIndex = 0;
    let backBlockIndex = diskMap.length - 1;
    let index = 0;
    let minId = 0;
    let maxId = backBlockIndex / 2;
    let backLeft = Number(diskMap[backBlockIndex]);

    let sum = 0;
    let debug = "";
    while (frontBlockIndex < backBlockIndex) {
        const value: number = Number(diskMap[frontBlockIndex]);

        if (frontBlockIndex % 2 == 0) {
            for (let i = 0; i < value; i++) {
                sum += index * minId;
                debug += minId;
                index++;
            }
            minId++;
        } else {
            for (let i = 0; i < value; i++) {
                if (backLeft <= 0) {
                    maxId--;
                    backBlockIndex -= 2;
                    backLeft = Number(diskMap[backBlockIndex]);
                }
                sum += index * maxId;
                index++;
                backLeft--;
                debug += maxId;
            }
        }
        frontBlockIndex++;
    }
    for (let i = 0; i < backLeft; i++) {
        sum += index * maxId;
        index++;
    }
    console.log(debug);
    return sum;
}
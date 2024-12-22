export function main(input: string[]): any {
    let row1: number[] = [];
    let row2: number[] = [];
    let sol = 0;

    for (let i = 0; i < input.length; i++) {
        const values = splitvalues(input[i]);
        row1.push(values[0]);
        row2.push(values[1]);
    }

    for (let i = 0; i < row1.length; i++) {
        let occurances = 0;
        for (let j = 0; j < row2.length; j++) {
            occurances += Number(row1[i] == row2[j]);
        }

        sol += occurances * row1[i];
    }

    return sol;
}

function splitvalues(row: string): number[] {
    const values = row.split('   ');
    return [Number(values[0]), Number(values[1])];
}

module.exports = {
    main: main
};
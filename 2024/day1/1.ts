module.exports = {
    main: main
};
export function main(input: string[]): any {
    let row1: number[] = [];
    let row2: number[] = [];
    let sol = 0;

    for (let i = 0; i < input.length; i++) {
        const values = splitvalues(input[i]);
        row1.push(values[0]);
        row2.push(values[1]);
    }

    row1.sort();
    row2.sort();

    for (let i = 0; i < row1.length; i++) {
        sol += Math.abs(row1[i] - row2[i]);
    }

    return sol;
}

function splitvalues(row: string) {
    const values = row.split('   ');
    return [Number(values[0]), Number(values[1])];
}
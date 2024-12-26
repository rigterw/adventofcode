const util = require('../util');


const register = {};
let pointer = 0;
let output = "";
module.exports = {
    main: main
};

export function main(input: string[]): any {
    register["A"] = util.getNumbers(input[0])[0];
    register["B"] = util.getNumbers(input[1])[0];
    register["C"] = util.getNumbers(input[2])[0];
    const instructions = input[4];
    const program: number[] = util.getNumbers(instructions);


    while (pointer < program.length - 1) {
        console.log(`instruction ${pointer}`);
        const instruction = program[pointer];
        pointer++;
        const opCode = program[pointer];
        pointer++;
        switch (instruction) {
            case 0:
                adv(opCode);
                break;
            case 1:
                bxl(opCode);
                break;
            case 2:
                bst(opCode);
                break;
            case 3:
                jnz(opCode);
                break;
            case 4:
                bxc(opCode);
                break;
            case 5:
                out(opCode);
                break;
            case 6:
                bdv(opCode);
                break;
            case 7:
                cdv(opCode);
                break;
        }
    }

    return output;

}
function getValue(opCode: number) {
    if (opCode <= 3)
        return opCode;
    if (opCode == 4)
        return register["A"];
    if (opCode == 5)
        return register["B"];
    if (opCode == 6)
        return register["C"];
    console.log(`${opCode} invalid`)
}

function adv(opCode: number) {
    register["A"] = Math.floor(register["A"] / Math.pow(2, getValue(opCode)));
}

function bxl(opCode: number) {
    register["B"] = register["B"] ^ opCode;
}

function bst(opCode: number) {
    register["B"] = getValue(opCode) % 8;
}

function jnz(opCode: number) {
    if (register["A"] == 0)
        return;
    pointer = opCode;
}

function bxc(opCode: number) {
    register["B"] = register["B"] ^ register["C"];
}

function out(opCode: number) {
    const value = '' + getValue(opCode) % 8;

    output += output == "" ? value : `,${value}`;
}

function bdv(opCode: number) {
    register["B"] = Math.floor(register["A"] / Math.pow(2, getValue(opCode)));
}
function cdv(opCode: number) {
    register["C"] = Math.floor(register["A"] / Math.pow(2, getValue(opCode)));
}
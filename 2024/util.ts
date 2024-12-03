const { readFileSync } = require('fs');

module.exports = {
    getInput: getInput
}

function getInput(day: number, test: boolean) {

    const fileName = test ? 'example' : 'input'
    const input = readFileSync(`./day${day}/${fileName}.txt`).toString().split("\n");
    return input;
}
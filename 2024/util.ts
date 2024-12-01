const { readFileSync } = require('fs');

module.exports = {
    getInput: getInput
}

function getInput(day) {
    const input = readFileSync(`./day${day}/input.txt`).toString().split("\n");
    return input;
}
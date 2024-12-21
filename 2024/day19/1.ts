const util = require('../util');

module.exports = {
    main: main
};
const towels = {}
const patterns = {};
let debug = false;
export function main(input: string[]): any {
    setTowels(input.shift());
    input.shift();

    let counter = 0;

    for (let i = 0; i < input.length; i++) {
        debug = i == 5;
        console.log(`checking towel: ${i} of ${input.length}, with pattern ${input[i]}`);
        if (searchTowel(input[i].replace(/\r/g, ""), 0)) {
            console.log("found");
            counter++;
        }
    }
    return counter;
}


function searchTowel(pattern: string, cutOff: number = 0): boolean {

    if (pattern in patterns) {
        if (debug)
            console.log(`found ${pattern}`);
        return patterns[pattern];
    }
    if (cutOff == pattern.length) {
        patterns[pattern] = true;
        return true;
    }

    const patternLeft = pattern.substring(cutOff);

    const matches = searchTree(towels, patternLeft);

    for (let i = 0; i < matches.length; i++) {
        if (matches[i] == 0)
            continue;
        if (searchTowel(patternLeft, matches[i])) {
            if (debug)
                console.log(`found: ${pattern.substring(0, matches[i])}`)
            return true;
        }
    }
    patterns[patternLeft] = false;
    return false;
}

function searchTree(subtree: object, pattern: string, depth = 0, matches: number[] = []): number[] {

    if ('.' in subtree) {
        matches.push(depth);
    }

    if (pattern[depth] in subtree) {
        searchTree(subtree[pattern[depth]], pattern, depth + 1, matches);
    }

    return matches;
}
function setTowels(input: string) {
    const towelInput = input.split(', ').filter(char => char !== "\r");
    for (let i = 0; i < towelInput.length; i++) {
        const towel = towelInput[i].split('');
        storeTowel(towels, towel);
    }
}

function storeTowel(tree: object, towel: string[]) {
    if (towel.length <= 0) {
        tree["."] = 0;
        return;
    }
    const value = towel.shift();
    if (value in tree) {
        storeTowel(tree[value], towel);
    }
    else {
        const subtree = {};
        tree[value] = subtree;
        storeTowel(subtree, towel);
    }
}
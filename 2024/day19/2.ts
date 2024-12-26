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
        debug = i == 3;
        const foundPatterns = searchTowel(input[i].replace(/\r/g, ""));
        counter += foundPatterns;
        console.log(`${i} has ${foundPatterns}`);
    }
    return counter;
}


function searchTowel(pattern: string, cutOff: number = 0): number {
    if (cutOff == pattern.length) {
        return 1;
    }
    
    if (pattern in patterns) {
        return patterns[pattern];
    }
    const patternLeft = pattern.substring(cutOff);
    if (patternLeft in patterns) {
        console.log(`${patternLeft} has ${patterns[patternLeft]} matches`)
        return patterns[patternLeft];
    }
    const matches = searchTree(towels, patternLeft);

    let matchCounter = 0;
    for (let i = 0; i < matches.length; i++) {
        if (matches[i] == 0)
            continue;
        const foundMatches = searchTowel(patternLeft, matches[i])
        matchCounter += foundMatches;
        if (debug)
            console.log(`${patternLeft} has ${foundMatches} matches ${matchCounter}`)
    }
    patterns[pattern] = matchCounter;
    return matchCounter;
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

    if (value == '\r') {
        tree["."] = 0;
        return;
    }
    if (value in tree) {
        storeTowel(tree[value], towel);
    }
    else {
        const subtree = {};
        tree[value] = subtree;
        storeTowel(subtree, towel);
    }
}
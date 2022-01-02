import { loadInputDataFromDay } from "../common/input.js";

interface Entry {
    signals: string[];
    output: string[];
}

function parseRow(row: string): Entry {
    const [signals, outputs] = row.split('|').map(x => x.trim());
    return {
        signals: signals.split(' '),
        output: outputs.split(' ')
    }
}

function containsAll(input: string[], values: string[]): boolean {
    const found = values.filter(value => input.includes(value));
    return found.length === values.length;
}

interface Cypher {
    [key: number]: string[]
}

function computeCypher(entry: Entry) {

    const words = [...entry.signals];

    const cypher: Cypher = {};

    // 1 4 7 8
    for (const word of words) {
        const letters = word.split("");
        if (word.length === 2) { cypher[1] = letters; }
        else if (word.length === 3) { cypher[7] = letters; }
        else if (word.length === 4) { cypher[4] = letters; }
        else if (word.length === 7) { cypher[8] = letters; }
    }

    // 0 3 6
    for (const word of words) {
        const letters = word.split("");
        if (letters.length === 6) {
            if (containsAll(letters, cypher[4])) { cypher[9] = letters; }
            else if (containsAll(letters, cypher[1])) { cypher[0] = letters; }
            else { cypher[6] = letters; }
        }
    }

    // 2 3 5
    for (const word of words) {
        const letters = word.split("");
        if (letters.length === 5) {
            if (containsAll(letters, cypher[1])) { cypher[3] = letters; }
            else if (containsAll(cypher[9], letters)) { cypher[5] = letters }
            else { cypher[2] = letters }
        }
    }


    return cypher
}

function countSimpleOutputDigits(entry: Entry) {
    return entry.output.filter(word => {
        return (word.length === 2) || (word.length === 3) || (word.length === 4) || (word.length === 7);
    }).length;
}

function computeOutputDigits(entry: Entry, cypher: Cypher): number[] {
    const digits = entry.output.map(code => {
        const letters = code.split("");
        for (const key in cypher) {
            if (letters.length === cypher[key].length
                && containsAll(letters, cypher[key])) {
                return key;
            }
        }
    }).map(Number);
    return digits;
}

function part1(inputs: Entry[]) {
    const num_digits = inputs.map(countSimpleOutputDigits);
    return num_digits.reduce((prev, curr) => curr + prev, 0);
}

function part2(inputs: Entry[]) {
    const digits = inputs
        .map(entry => { return { entry, cypher: computeCypher(entry) } })
        .map(({ entry, cypher }) => computeOutputDigits(entry, cypher));
    const outputs = digits.map(nums => nums.join("")).map(Number);
    return outputs.reduce((prev, curr) => curr + prev, 0);
}

function main() {
    const inputs = loadInputDataFromDay(8).map(parseRow);
    console.log(part1(inputs));
    console.log(part2(inputs));
}

main();


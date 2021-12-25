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

function main() {
    const inputs = loadInputDataFromDay(8).map(parseRow);
    console.log(inputs)
}

main();


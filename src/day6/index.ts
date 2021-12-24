import { loadInputDataFromDay } from "../common/input.js";

function part1(inputs: number[], total_days: number) {
    let entities: number[] = [...inputs];
    for (let day = 0; day < total_days; day++) {
        entities = entities.map(e => {
            if (e === 0) { return [6, 8]; }
            else { return e - 1; }
        }).flat();
    }
    return entities.length;
}

function main() {
    const inputs = loadInputDataFromDay(6)[0].split(",").map(Number);
    console.log(part1(inputs, 80));
}

main();


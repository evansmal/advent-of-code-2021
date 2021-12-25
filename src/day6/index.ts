import { loadInputDataFromDay } from "../common/input.js";

const RESET_TIMER_VALUE = 6;
const NEW_TIMER_VALUE = 8;

function step(entities: number[]) {
    const result: number[] = [...entities];
    for (let i = NEW_TIMER_VALUE; i > 0; i--) {
        result[i - 1] = entities[i];
    }
    result[NEW_TIMER_VALUE] = entities[0];
    result[RESET_TIMER_VALUE] += entities[0];
    return result
}


function simulate(inputs: number[], total_days: number) {
    let entities: number[] = Array(NEW_TIMER_VALUE + 1).fill(0);
    inputs.forEach(value => { entities[value]++; });
    for (let day = 0; day < total_days; day++) { entities = step(entities); }
    return entities.reduce((prev, curr) => prev + curr, 0);
}

function main() {
    const inputs = loadInputDataFromDay(6)[0].split(",").map(Number);
    console.log(simulate(inputs, 80));
    console.log(simulate(inputs, 256));
}

main();


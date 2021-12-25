import { loadInputDataFromDay } from "../common/input.js";

function part1(inputs: number[]) {
    const max = Math.max(...inputs);
    const positions: number[] = Array(max + 1).fill(0);
    inputs.forEach(value => { positions[value]++; });

    const costs = Array(max + 1).fill(0).map((_, pos) => {
        return positions.map((count, curr_pos) => {
            const dx = Math.abs(curr_pos - pos);
            return count * dx;
        }).reduce((prev, curr) => curr + prev, 0);
    });
    return Math.min(...costs);
}

function main() {
    const inputs = loadInputDataFromDay(7)[0].split(",").map(Number);
    console.log(part1(inputs));
}

main();


import { loadInputDataFromDay } from "../common/input.js";

function findLowestCost(inputs: number[], get_cost: (pos: number, target: number) => number) {
    const max = Math.max(...inputs);

    const positions: number[] = Array(max + 1).fill(0);
    inputs.forEach(value => { positions[value]++; });

    const costs = Array(max + 1).fill(0).map((_, pos) => {
        return positions.map((count, curr_pos) => {
            return count * get_cost(curr_pos, pos);
        }).reduce((prev, curr) => curr + prev, 0);
    });

    return Math.min(...costs);
}

function part2(inputs: number[]) {
    // https://en.wikipedia.org/wiki/Triangular_number
    const triangle_number = (n: number) => n * (n - 1) / 2;
    return findLowestCost(inputs, (pos, target) => {
        const dx = Math.abs(pos - target);
        return triangle_number(dx);
    });
}

function part1(inputs: number[]) {
    return findLowestCost(inputs, (pos, target) => Math.abs(pos - target))
}

function main() {
    const inputs = loadInputDataFromDay(7)[0].split(",").map(Number);
    console.log(part1(inputs));
    console.log(part2(inputs));
}

main();


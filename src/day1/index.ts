import { readFileSync } from "fs";

function loadInputData(filepath: string) {
    return readFileSync(filepath)
        .toString()
        .split('\n')
        .slice(0, -1);
}

function computeWindow(input: number[], index: number, size: number): number {
    return input
        .slice(index - size + 1, index + 1)
        .reduce((prev, curr) => curr + prev, 0);
}

function computeSlidingWindowSumScore(inputs: number[], window_size: number) {
    let score = 0;
    let prev_sum = computeWindow(inputs, window_size - 1, window_size)
    for (let i = window_size; i < inputs.length; i++) {
        const sum = computeWindow(inputs, i, window_size);
        if (sum > prev_sum) {
            score++;
        }
        prev_sum = sum;
    }
    return score;
}

function main() {
    const inputs = loadInputData("./data/day1.dat").map(x => Number(x));
    const p1 = computeSlidingWindowSumScore(inputs, 1);
    const p2 = computeSlidingWindowSumScore(inputs, 3);
    console.log(p1, p2)
}

main();


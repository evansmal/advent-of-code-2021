import { loadInputDataFromDay } from "../common/input.js";

function toBinarySequence(str: string) {
    return str.split("").map(character => (character === '1' ? 1 : 0));
}

function countHighBit(input: string[]): number[] {
    const counts = input.map(toBinarySequence);
    const sums = counts.reduce((prev, curr) => {
        for (let i = 0; i < curr.length; i++) {
            curr[i] += prev[i];
        }
        return curr;
    }, Array(counts[0].length).fill(0));
    return sums;
}

function main() {
    const inputs = loadInputDataFromDay(3);
    const gamma_counts = countHighBit(inputs).map(count => {
        return (count > inputs.length / 2 ? 1 : 0);
    });
    const epsilon_counts = countHighBit(inputs).map(count => {
        return (count <= inputs.length / 2 ? 1 : 0);
    });

    const gamma_rate = parseInt(gamma_counts.join(""), 2);
    const epsilon_rate = parseInt(epsilon_counts.join(""), 2);

    console.log(gamma_rate * epsilon_rate);
}

main();


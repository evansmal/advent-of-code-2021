import { loadInputDataFromDay } from "../common/input.js";

type BinarySequence = (0 | 1)[];

function toBinarySequence(str: string): BinarySequence {
    return str.split("").map(character => (character === '1' ? 1 : 0));
}

function countHighBitAtPosition(input: BinarySequence[], pos: number) {
    return input.filter(seq => (seq[pos] === 1)).length;
}

function countHighBit(input: BinarySequence[]): number[] {
    const width = input[0].length;
    const sums: number[] = [];
    for (let i = 0; i < width; i++) {
        sums.push(countHighBitAtPosition(input, i));
    }
    return sums;
}

function part1(inputs: string[]) {
    const gamma_counts = countHighBit(inputs.map(toBinarySequence)).map(count => {
        return (count > inputs.length / 2 ? 1 : 0);
    });
    const epsilon_counts = countHighBit(inputs.map(toBinarySequence)).map(count => {
        return (count <= inputs.length / 2 ? 1 : 0);
    });
    return {
        gamma_rate: sequenceToInt(gamma_counts),
        epsilon_rate: sequenceToInt(epsilon_counts)
    };
}

function sequenceToInt(sequence: BinarySequence): number {
    return parseInt(sequence.join(""), 2);
}

function part2(inputs: string[]) {
    const sequences = inputs.map(toBinarySequence);
    const width = sequences[0].length;

    let oxygen_gen_rating: BinarySequence[] = sequences;
    for (let i = 0; i < width; i++) {
        if (oxygen_gen_rating.length === 1) break;
        const count = countHighBitAtPosition(oxygen_gen_rating, i);
        if (count >= oxygen_gen_rating.length / 2) oxygen_gen_rating = oxygen_gen_rating.filter(seq => seq[i] === 1);
        else oxygen_gen_rating = oxygen_gen_rating.filter(seq => seq[i] === 0);
    }

    let co2_scrubber_rating: BinarySequence[] = sequences;
    for (let i = 0; i < width; i++) {
        if (co2_scrubber_rating.length === 1) break;
        const count = countHighBitAtPosition(co2_scrubber_rating, i);
        if (count >= co2_scrubber_rating.length / 2) co2_scrubber_rating = co2_scrubber_rating.filter(seq => seq[i] === 0);
        else co2_scrubber_rating = co2_scrubber_rating.filter(seq => seq[i] === 1);
    }

    return {
        oxygen_gen_rating: sequenceToInt(oxygen_gen_rating[0]),
        co2_scrubber_rating: sequenceToInt(co2_scrubber_rating[0])
    };
}

function main() {
    const inputs = loadInputDataFromDay(3);

    const { gamma_rate, epsilon_rate } = part1(inputs);
    console.log(gamma_rate * epsilon_rate);

    const { oxygen_gen_rating, co2_scrubber_rating } = part2(inputs);
    console.log(oxygen_gen_rating * co2_scrubber_rating)
}

main();


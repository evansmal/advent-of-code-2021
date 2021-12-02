import { readFileSync } from "fs";

export function loadInputData(filepath: string) {
    return readFileSync(filepath)
        .toString()
        .split('\n')
        .slice(0, -1);
}

export function loadInputDataFromDay(day: number) {
    return loadInputData(`./data/day${day}.dat`);
}

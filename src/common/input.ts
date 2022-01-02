import { readFileSync } from "fs";

export function loadInputData(filepath: string) {
    return readFileSync(filepath)
        .toString()
        .split('\n')
        .slice(0, -1);
}

export function loadInputDataFromDay(day: number) {
    const filename = `./data/${day.toString().padStart(2, '0')}.txt`;
    return loadInputData(filename);
}

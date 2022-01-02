import { loadInputDataFromDay } from "../common/input.js";

type CommandType = "forward" | "down" | "up";

interface Command {
    command_type: CommandType;
    magnitude: number;
}

interface Vector {
    x: number;
    y: number;
}

function getCommandVector(command: Command): Vector {
    const { command_type, magnitude } = command;
    if (command_type === "down") return { x: 0, y: magnitude };
    else if (command_type === "up") return { x: 0, y: -1 * magnitude };
    else if (command_type === "forward") return { x: magnitude, y: 0 };
    else { throw new Error("Invalid command_type"); };
}

function parseCommand(command: string): Command {
    const cmd = command.split(' ');
    return {
        command_type: cmd[0] as CommandType, magnitude: Number(cmd[1])
    };
}

function part1(vectors: Vector[]) {
    const resultant = vectors.reduce((prev, curr) => {
        return { x: curr.x + prev.x, y: curr.y + prev.y }
    }, { x: 0, y: 0 });
    console.log(resultant.x * resultant.y);
}

function part2(vectors: Vector[]) {
    let aim = 0;
    const resultant = vectors.reduce((prev, curr) => {
        aim += curr.y;
        return { x: curr.x + prev.x, y: curr.x * aim + prev.y }
    }, { x: 0, y: 0 });
    console.log(resultant.x * resultant.y);
}

function main() {
    const vectors = loadInputDataFromDay(2).map(parseCommand).map(getCommandVector);
    part1(vectors);
    part2(vectors);
}

main();


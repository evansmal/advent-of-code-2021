import { loadInputDataFromDay } from "../common/input.js";

type Grid<T> = T[][];

function createOccupancyGrid(size: number): Grid<number> {
    return Array(size).fill(0).map(() => Array(size).fill(0));
}

interface Vector2D {
    x: number;
    y: number;
}

function parseCoordinate(input: string): Vector2D {
    const items = input.split(",");
    return { x: Number(items[0]), y: Number(items[1]) };
}

function parseRow(input: string): [Vector2D, Vector2D] {
    const items = input.split(" ");
    return [parseCoordinate(items[0]), parseCoordinate(items[2])];
}

const GRID_SIZE = 1000;

function computeVector(p0: Vector2D, p1: Vector2D): Vector2D {
    return { x: p1.x - p0.x, y: p1.y - p0.y };
}

type Line = [Vector2D, Vector2D];

function bresenham(line: Line): Vector2D[] {

    const [p0, p1] = line;

    const dx = Math.abs(p1.x - p0.x);
    const dy = Math.abs(p1.y - p0.y);

    const sx = (p0.x < p1.x) ? 1 : -1;
    const sy = (p0.y < p1.y) ? 1 : -1;
    let err = dx - dy;

    const curr: Vector2D = { x: p0.x, y: p0.y };
    const points: Vector2D[] = [];
    while (true) {

        points.push({ x: curr.x, y: curr.y });

        if ((curr.x === p1.x) && (curr.y === p1.y)) break;

        const e2 = 2 * err;
        if (e2 > -dy) { err -= dy; curr.x += sx; }
        if (e2 < dx) { err += dx; curr.y += sy; }
    }

    return points;
}

function print<T>(grid: Grid<T>) {
    let out = "";
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            out += grid[j][i] + " ";
        }
        out += "\n";
    }
    console.log(out);
}

function part1(inputs: Line[]) {
    const grid = createOccupancyGrid(GRID_SIZE);
    for (const line of inputs) {
        const direction = computeVector(...line)
        if (direction.x !== 0 && direction.y !== 0) continue;
        const points = bresenham(line);
        points.forEach(p => { grid[p.x][p.y]++; });
    }
    const elements = grid.map(row => row.filter(elem => elem >= 2)).flat().length;
    return elements;

}

function part2(inputs: Line[]) {
    const grid = createOccupancyGrid(GRID_SIZE);
    for (const line of inputs) {
        const points = bresenham(line);
        points.forEach(p => { grid[p.x][p.y]++; });
    }
    const elements = grid.map(row => row.filter(elem => elem >= 2)).flat().length;
    return elements;

}

function main() {
    const inputs = loadInputDataFromDay(5).map(parseRow);
    console.log(part1(inputs));
    console.log(part2(inputs));
}


main();


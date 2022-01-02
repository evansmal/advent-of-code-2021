import { loadInputDataFromDay } from "../common/input.js";

const BOARD_SIZE = 5;

type Grid<T> = T[][];

interface Board {
    data: Grid<number>;
    marks: Grid<boolean>;
}

function decodeBoardData(rows: string[]): Grid<number> {
    return rows.map(row => row.trim().split(/[ ]+/).map(Number));
}

function createUnmarkedBoard(size: number): Grid<boolean> {
    return Array(size).fill(false).map(() => Array(size).fill(false));
}

function createBoards(rows: string[]) {
    const boards: Board[] = [];
    for (let i = 0; i < rows.length; i += BOARD_SIZE + 1) {
        const data = decodeBoardData(rows.slice(i, i + BOARD_SIZE));
        const marks = createUnmarkedBoard(BOARD_SIZE);
        boards.push({ data, marks });
    }
    return boards;
}

type Coordinate = [x: number, y: number];

function findIndex<T>(grid: Grid<T>, value: T, grid_size: number) {
    const indices: Coordinate[] = [];
    for (let i = 0; i < grid_size; i++) {
        for (let j = 0; j < grid_size; j++) {
            if (grid[i][j] === value) indices.push([i, j]);
        }
    }
    return indices;
}

function markGrid(grid: Grid<boolean>, coordinate: Coordinate) {
    grid[coordinate[0]][coordinate[1]] = true;
}


function isWinner(grid: Grid<boolean>, grid_size: number): boolean {
    for (let i = 0; i < grid_size; i++) {
        if (grid[i].includes(false) === false) return true;
    }
    for (let i = 0; i < grid_size; i++) {
        const values: boolean[] = []
        for (let j = 0; j < grid_size; j++) {
            values.push(grid[j][i]);
        }
        if (values.includes(false) === false) return true;
    }
    return false;
}

function computeScore(board: Board, grid_size: number): number {
    const winning_indices = findIndex<boolean>(board.marks, false, grid_size);
    return winning_indices
        .map(coord => board.data[coord[0]][coord[1]])
        .reduce((prev, curr) => curr += prev, 0);
}

function markBoard(draw: number, board: Board) {
    const coords = findIndex(board.data, draw, BOARD_SIZE);
    coords.forEach(coord => markGrid(board.marks, coord));
}

function findWinner(boards: Board[], grid_size: number) {
    const winners = [];
    for (let board_id = 0; board_id < boards.length; board_id++) {
        if (isWinner(boards[board_id].marks, grid_size)) {
            winners.push(board_id);
        }
    }
    return winners;
}

function part1(draws: number[], boards: Board[]) {
    for (let i = 0; i < draws.length; i++) {
        const draw = draws[i];
        for (let board_id = 0; board_id < boards.length; board_id++) {
            markBoard(draw, boards[board_id]);
        }
        const winner_ids = findWinner(boards, BOARD_SIZE);
        if (winner_ids.length > 0) {
            const score = computeScore(boards[winner_ids[0]], BOARD_SIZE);
            return score * draw;
        }
    }
}

function part2(draws: number[], boards: Board[]) {
    for (let i = 0; i < draws.length; i++) {
        const draw = draws[i];
        for (let board_id = 0; board_id < boards.length; board_id++) {
            markBoard(draw, boards[board_id]);
        }
        const winner_ids = findWinner(boards, BOARD_SIZE);
        if (winner_ids.length > 0) {
            if (boards.length === 1) {
                const score = computeScore(boards[0], BOARD_SIZE);
                return score * draw;
            }
            boards = boards.filter((_, index) => (winner_ids.includes(index) === false));
        }
    }
}

function main() {
    const inputs = loadInputDataFromDay(4);
    const draws = inputs[0].split(',').map(Number);
    const boards = createBoards(inputs.slice(2));
    console.log(part1(draws, boards));
    console.log(part2(draws, boards));
}

main();


import { loadInputDataFromDay } from "../common/input.js";

interface Node<T> {
    value: T
    neighbors: Node<T>[];
}

function Node<T>(value: T, neighbors: Node<T>[]): Node<T> {
    return { value, neighbors };
}

function parseRow(row: string): Node<number>[] {
    return row.split('').map(Number).map(n => Node(n, []));
}

function connectNodes<T>(nodes: Node<T>[][]) {
    const rows = nodes.length;
    const columns = nodes[0].length;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const node = nodes[row][col];
            if (row > 0) node.neighbors.push(nodes[row - 1][col]);
            if (col > 0) node.neighbors.push(nodes[row][col - 1]);
            if (row < rows - 1) node.neighbors.push(nodes[row + 1][col]);
            if (col < columns - 1) node.neighbors.push(nodes[row][col + 1]);
            if (col > 0 && row > 0) node.neighbors.push(nodes[row - 1][col - 1]);
            if (col > 0 && row < rows - 1) node.neighbors.push(nodes[row + 1][col - 1]);
            if (row > 0 && col < columns - 1) node.neighbors.push(nodes[row - 1][col + 1]);
            if (row < rows - 1 && col < columns - 1) node.neighbors.push(nodes[row + 1][col + 1]);
        }
    }
    return nodes;
}

function incrementBy(nodes: Node<number>[][], value: number) {
    return nodes.map(n => n.map(n => Node(n.value + value, n.neighbors)));
}

function canFlash(node: Node<number>) { return node.value > 9; }

function triggerFlashes(nodes: Node<number>[][]) {
    while (true) {
        const ready = nodes.flatMap(row => row.filter(canFlash));
        console.log(ready.map(s => s.value))
        if (ready.length === 0) break;
        for (const node of ready) {
            node.neighbors.forEach((node) => node.value + 1);
        }
        for (const node of ready) { node.value = 0; }
    }
    return nodes;
}

function print(nodes: Node<number>[][]) {
    const rows = nodes.length;
    for (let row = 0; row < rows; row++) {
        const v = nodes[row].map(node => node.value).join(" ");
        console.log(v)
    }
    return nodes;

}

function part1(inputs: Node<number>[][]) {
    let grid = inputs;
    const total_steps = 3;
    for (let step = 0; step < total_steps; step++) {
        console.log('\n after ', step + 1);
        grid = triggerFlashes(incrementBy(grid, 1));
        print(grid);
    }

}

function part2(inputs: Node<number>[][]) {
}

function main() {
    const inputs = connectNodes(loadInputDataFromDay(11).map(parseRow));
    console.log(part1(inputs));
    console.log(part2(inputs));
}

main();


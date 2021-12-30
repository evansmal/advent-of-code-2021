import { loadInputDataFromDay } from "../common/input.js";

interface Node<T> {
    value: T
    up?: Node<T>;
    left?: Node<T>;
    right?: Node<T>;
    down?: Node<T>;
}

function createNode<T>(value: T): Node<T> {
    return { value };
}

function parseRow(row: string): Node<number>[] {
    return row.split("").map(Number).map(value => createNode<number>(value));
}

function connectNodes<T>(nodes: Node<T>[][]) {
    const rows = nodes.length;
    const columns = nodes[0].length;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const node = nodes[row][col];
            if (row > 0) node.up = nodes[row - 1][col];
            if (row < rows - 1) node.down = nodes[row + 1][col];
            if (col > 0) node.left = nodes[row][col - 1];
            if (col < columns - 1) node.right = nodes[row][col + 1];
        }
    }
    return nodes;
}

function getEdges<T>(node: Node<T>): Node<T>[] {
    return [node.up, node.left, node.right, node.down]
        .filter((edge): edge is Node<T> => !!edge)
}

function getEdgeValues<T>(node: Node<T>): T[] {
    return [node.up?.value, node.left?.value, node.right?.value, node.down?.value]
        .filter((edge): edge is T => !!edge)
}

function part1(inputs: Node<number>[][]) {
    const low_points = inputs.flat().filter(node => {
        const bigger = getEdgeValues(node).filter(edge => node.value < edge);
        return (bigger.length === getEdges(node).length);
    }).map(node => node.value);
    return low_points.map(p => p + 1)
        .reduce((prev, curr) => prev + curr, 0)
}

function main() {
    const inputs = connectNodes(loadInputDataFromDay(9).map(parseRow));
    console.log(part1(inputs));
}

main();


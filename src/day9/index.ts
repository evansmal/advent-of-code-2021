import { loadInputDataFromDay } from "../common/input.js";

interface Node<T> {
    value: T
    up?: Node<T>;
    left?: Node<T>;
    right?: Node<T>;
    down?: Node<T>;
}

function toString<T>(node: Node<T>) {
    return ` ${node.up ? node.up.value : " "}  \n` +
        `${node.left ? node.left.value : " "} ${node.value} ${node.right ? node.right.value : " "}\n` +
        `  ${node.down ? node.down.value : " "}  \n`;
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

function getLowPoints<T>(inputs: Node<T>[][]) {
    return inputs.flat().filter(node => {
        const bigger = getEdgeValues(node).filter(edge => node.value < edge);
        return (bigger.length === getEdges(node).length);
    });
}

function makeUnique<T>(a: T[]) { return [...new Set(a)]; }

function getBasinNeighbors(node: Node<number>): Node<number>[] {
    return getEdges(node).filter(child => child.value < 9);
}

function getBasin(node: Node<number>, visited: Node<number>[]): Node<number>[] {
    const neighbors = getBasinNeighbors(node)
        .filter(nb => !visited.includes(nb))
    visited.push(...neighbors);
    return [
        node,
        ...neighbors.flatMap(nb => getBasin(nb, visited))
    ];
}

function part1(inputs: Node<number>[][]) {
    return getLowPoints(inputs).map(node => node.value)
        .map(p => p + 1)
        .reduce((prev, curr) => prev + curr, 0)
}

function part2(inputs: Node<number>[][]) {
    const basins = getLowPoints(inputs)
        .map(p => getBasin(p, []))
        .map(makeUnique)
    basins.sort((a, b) => (a.length <= b.length ? 1 : -1))
    return basins.map(b => b.length)
        .slice(0, 3)
        .reduce((prev, curr) => prev * curr, 1);
}

function main() {
    const inputs = connectNodes(loadInputDataFromDay(9).map(parseRow));
    console.log(part1(inputs));
    console.log(part2(inputs));
}

main();


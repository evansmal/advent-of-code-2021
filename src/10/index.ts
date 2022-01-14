import { loadInputDataFromDay } from "../common/input.js";

const PART_ONE_SCORE = <const>{
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

const PART_TWO_SCORE = <const>{
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
};

type OpeningBracket = "{" | "[" | "<" | "(";

type ClosingBracket = "}" | "]" | ">" | ")";

type Token = OpeningBracket | ClosingBracket;

type Line = Token[];

function isOpeningBracket(c: string): c is OpeningBracket {
    return c === "{"
        || c === "["
        || c === "<"
        || c === "(";
}

function isClosingBracket(c: string): c is ClosingBracket {
    return c === "}"
        || c === "]"
        || c === ">"
        || c === ")";
}

function isToken(c: string): c is Token {
    return isOpeningBracket(c) || isClosingBracket(c);
}

const MATCHES = <const>{
    "(": ")",
    "[": "]",
    "<": ">",
    "{": "}",
}

function getMatching(c: OpeningBracket): ClosingBracket {
    return MATCHES[c];
}

function tokenize(line: string): Line {
    return line.split('').map(c => {
        if (isToken(c)) return c;
        else throw new Error("Invalid token found");
    })
}

function findInvalidBracket(line: Line): ClosingBracket | OpeningBracket[] {
    const stack: OpeningBracket[] = [];
    for (const character of line) {
        if (isOpeningBracket(character)) { stack.push(character); }
        else {
            const token = stack.pop();
            if (token && getMatching(token) !== character) { return character; }
        }
    }
    return stack;
}

function part1(inputs: Line[]) {
    const invalid = inputs.map(findInvalidBracket)
        .filter((v): v is ClosingBracket => (typeof v === "string"));
    return invalid.reduce((prev, curr) => prev + PART_ONE_SCORE[curr], 0);
}

function part2(inputs: Line[]) {
    const incomplete = inputs.map(findInvalidBracket)
        .filter((l): l is OpeningBracket[] => typeof l !== "string")
    const scores = incomplete.map(l => {
        const stack = l.map(getMatching).reverse(); // order is important because of scoring
        return stack.reduce((prev, curr) => 5 * prev + PART_TWO_SCORE[curr], 0);
    });
    scores.sort((a, b) => (a <= b ? 1 : -1))

    const middle = Math.floor(scores.length / 2);
    return scores[middle];
}

function main() {
    const inputs = loadInputDataFromDay(10).map(tokenize);
    console.log(part1(inputs));
    console.log(part2(inputs));
}

main();


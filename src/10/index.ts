import { loadInputDataFromDay } from "../common/input.js";

const SCORE = <const>{
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
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

function findInvalidBracket(line: Line): ClosingBracket | undefined {
    const stack: OpeningBracket[] = [];
    for (const character of line) {
        if (isOpeningBracket(character)) { stack.push(character); }
        else {
            const token = stack.pop();
            if (token && getMatching(token) !== character) { return character; }
        }
    }
}

function part1(inputs: Line[]) {
    const invalid = inputs.map(findInvalidBracket)
        .filter((v): v is ClosingBracket => !!v)
    return invalid.reduce((prev, curr) => prev + SCORE[curr], 0);
}

function part2(inputs: Line[]) {

}

function main() {
    const inputs = loadInputDataFromDay(10).map(tokenize);
    console.log(part1(inputs));
    console.log(part2(inputs));
}

main();


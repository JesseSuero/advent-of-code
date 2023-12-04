import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

export function getInput(moduleUrl) {
  const __filename = fileURLToPath(moduleUrl);
  const __dirname = dirname(__filename);

  return readFileSync(resolve(__dirname, "./input.txt"), {
    encoding: "utf-8",
  });
}

export function getLCM(divisors) {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  let lcm = 1;

  for (const divisor of divisors) {
    lcm = (lcm * divisor) / gcd(lcm, divisor);
  }

  return lcm;
}

export function formatBoard(input, buffer = false, emptyChar = ".") {
  const board = input
    .split("\n")
    .map(function (e) {
      return e.split("");
    })
    .map(function (line) {
      if (buffer) {
        // add outer buffer so I don't have to worry about index out of bounds stuff
        line.unshift(emptyChar);
        line.push(emptyChar);
      }
      return line;
    });
  if (buffer) {
    // add outer buffer so I don't have to worry about index out of bounds stuff
    board.unshift(Array(board[0].length).fill(emptyChar));
    board.push(Array(board[0].length).fill(emptyChar));
  }

  return board;
}

export function split(
  input,
  splitBy = "",
  parseNums = false,
  ignoreEmpty = true
) {
  var result = input.trim().split(splitBy);
  if (ignoreEmpty) {
    result = result.filter(Boolean);
  }

  if (parseNums) {
    result = result.map(Number);
  }
  return result;
}

export class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (!this.items.length) {
      return null;
    }
    return this.items.pop();
  }

  peek() {
    if (!this.items.length) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

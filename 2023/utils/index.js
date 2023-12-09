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

// Usage: allEqual([1,2,3,4,5])
export const allEqual = (arr) => arr.every((v) => v === arr[0]);

// Usage: [1,2,3,4,5].reduce(gcd)
export const gcd = (a, b) => (a ? gcd(b % a, a) : b);

// Usage: [1,2,3,4,5].reduce(lcm)
export const lcm = (a, b) => (a * b) / gcd(a, b);

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

export function msToTime(elapsed) {
  elapsed = Math.trunc(elapsed);
  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }

  var ms = elapsed % 1000;
  elapsed = (elapsed - ms) / 1000;
  var secs = elapsed % 60;
  elapsed = (elapsed - secs) / 60;
  var mins = elapsed % 60;
  var hrs = (elapsed - mins) / 60;

  return pad(hrs) + ":" + pad(mins) + ":" + pad(secs) + "." + pad(ms, 3);
}

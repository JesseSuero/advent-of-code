import {
  getInput,
  formatBoard,
  lcm,
  Stack,
  msToTime,
  allEqual,
  combination,
  Memoizer,
  setCharAt,
} from "../utils/index.js";

let visited = {};
let exactly = {};
let initial;
let board;

function part1(input) {
  let count = 0;
  // let start;
  board = formatBoard(input, true, "#");
  for (let x = 1; x < board.length - 1; x++) {
    for (let y = 1; y < board[0].length - 1; y++) {
      if (board[x][y] === "S") {
        initial = { x, y };
        board[x][y] = ".";
      }
    }
  }
  return 0;
  visitNeighbors(initial, 0);

  for (let x = 1; x < board.length - 1; x++) {
    for (let y = 1; y < board[0].length - 1; y++) {
      let visitedKey = `(${x},${y})`;
      if (visited[visitedKey]) {
        board[x][y] = "0";
      }
    }
  }
  //let lines = input
  //   .split("\n")
  //   .map((line) => line.replace(/^Card \d+: /, ""))
  //   .forEach(function (line) {});
  return Object.keys(exactly).length;
}

function visitNeighbors(start, maxSteps) {
  let x = start.x,
    y = start.y;

  if (start.x >= board.length) {
    start.x -= board.length - 1;
  }
  if (start.y >= board[0].length) {
    start.y -= board[0].length - 1;
  }

  let visitedKey = `(${x},${y}) ${maxSteps}`;
  if (maxSteps >= 26501365 || board[x][y] === "#") {
    if (maxSteps === 26501365 && board[x][y] === ".") {
      exactly[visitedKey] = 1;
    }
    return;
  }

  if (visited[visitedKey]) {
    return;
    // visited[visitedKey]++;
  } else {
    visited[visitedKey] = 1;
  }

  visitNeighbors({ x: start.x + 1, y: start.y }, maxSteps + 1);
  visitNeighbors({ x: start.x - 1, y: start.y }, maxSteps + 1);
  visitNeighbors({ x: start.x, y: start.y + 1 }, maxSteps + 1);
  visitNeighbors({ x: start.x, y: start.y - 1 }, maxSteps + 1);
}

function visitNeighbors2(initial, maxSteps) {
  let finalCount = 0;
  let currentSteps = 0;
  let visited = {};
  let next = [initial];

  while (currentSteps <= maxSteps) {
    let nextLength = next.length;
    for (let i = 0; i < nextLength; i++) {
      let start = next.shift();
      let visitedKey = `(${start.x},${start.y})`;

      if (visited[visitedKey] === undefined) {
        visited[visitedKey] = 1;
        let x = start.x,
          y = start.y;
        if (x > board.length - 1 || x < 0) {
          x = mod(x, board.length);
        }

        if (y > board[0].length - 1 || y < 0) {
          y = mod(y, board[0].length);
        }

        if (board[x][y] !== "#") {
          if (maxSteps % 2 === currentSteps % 2) {
            finalCount++;
          }

          next.push({ x: start.x + 1, y: start.y });
          next.push({ x: start.x - 1, y: start.y });
          next.push({ x: start.x, y: start.y + 1 });
          next.push({ x: start.x, y: start.y - 1 });
        }
      }
    }

    currentSteps++;
  }

  return finalCount;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function part2(input) {
  // let count = 0;
  board = formatBoard(input, false);
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y] === "S") {
        initial = { x, y };
        board[x][y] = ".";
      }
    }
  }

  let last = 0;
  for (let i = 1; i <= 25; i++) {
    let maxSteps = i * 2;
    let steps = visitNeighbors2(initial, maxSteps);
    console.log(maxSteps, steps, steps - last);
    last = steps;
  }
  // console.log(visitNeighbors2(initial, 25));
  // console.log(visitNeighbors2(initial, 26));
  // console.log(visitNeighbors2(initial, 27));
  // console.log(visitNeighbors2(initial, 28));
  // console.log(visitNeighbors2(initial, 29));
  // console.log(visitNeighbors2(initial, 30));
  // console.log(visitNeighbors2(initial, 31));
  return visitNeighbors2(initial, 1000);
}

const input = getInput(import.meta.url);
let start = performance.now();
const answer1 = part1(input);
const part1Time = performance.now() - start;
start = performance.now();
const answer2 = part2(input);
const part2Time = performance.now() - start;

console.log(`
Part 1 
   Answer: ${answer1}
   Time Elapsed: ${msToTime(part1Time)}

Part 2 
   Answer: ${answer2}
   Time Elapsed: ${msToTime(part2Time)}
`);

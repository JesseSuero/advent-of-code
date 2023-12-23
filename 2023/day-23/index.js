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

let board;
let longestPathCount = 0;
let visited;
let startCoor = { x: 1, y: 2 };
let endCoor;

function part1(input) {
  board = formatBoard(input, true, "#");
  visited = Array.from({ length: board.length }, () =>
    Array.from({ length: board[0].length }, () => false)
  );

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y] === "#") {
        visited[x][y] = true;
      }

      if (x === 1 && board[x][y] !== "#") {
        startCoor = { x, y };
      }

      if (x === board.length - 2 && board[x][y] !== "#") {
        endCoor = { x, y };
      }
    }
  }
  findLongestPath(startCoor, 0);
  return longestPathCount;
}

function findLongestPath(current, step) {
  if (visited[current.x][current.y]) {
    return;
  }

  if (current.x === endCoor.x && current.y === endCoor.y) {
    if (step > longestPathCount) {
      // console.log(step);
      longestPathCount = step;
    }
    return;
  }

  switch (board[current.x][current.y]) {
    case ">":
      findLongestPath({ x: current.x, y: current.y + 1 }, step + 1);
      break;
    case "<":
      findLongestPath({ x: current.x, y: current.y - 1 }, step + 1);
      break;
    case "^":
      findLongestPath({ x: current.x - 1, y: current.y }, step + 1);
      break;
    case "v":
      findLongestPath({ x: current.x + 1, y: current.y }, step + 1);
      break;
    case ".":
      visited[current.x][current.y] = true;
      findLongestPath({ x: current.x - 1, y: current.y }, step + 1);
      findLongestPath({ x: current.x + 1, y: current.y }, step + 1);
      findLongestPath({ x: current.x, y: current.y - 1 }, step + 1);
      findLongestPath({ x: current.x, y: current.y + 1 }, step + 1);
      visited[current.x][current.y] = false;
  }
}

function part2() {
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y] === "#") {
        visited[x][y] = true;
      } else {
        visited[x][y] = false;
        board[x][y] = ".";
      }
    }
  }
  findLongestPath(startCoor, 0);
  return longestPathCount;
}

const input = getInput(import.meta.url);
let start = performance.now();
const answer1 = part1(input);
const part1Time = performance.now() - start;
start = performance.now();
const answer2 = part2();
const part2Time = performance.now() - start;

console.log(`
Part 1 
   Answer: ${answer1}
   Time Elapsed: ${msToTime(part1Time)}

Part 2 
   Answer: ${answer2}
   Time Elapsed: ${msToTime(part2Time)}
`);

import {
  getInput,
  formatBoard,
  lcm,
  Stack,
  msToTime,
  allEqual,
  print2dArray,
} from "../utils/index.js";

function part1(input) {
  let count = 0;
  const board = formatBoard(input);
  for (let repeat = 0; repeat < board.length; repeat++)
    for (let x = 0; x < board.length - 1; x++) {
      for (let y = 0; y < board[0].length; y++) {
        if (board[x][y] === "." && board[x + 1][y] === "O") {
          let temp = board[x][y];
          board[x][y] = board[x + 1][y];
          board[x + 1][y] = temp;
        }
      }
    }

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y] === "O") {
        count += board.length - x;
      }
    }
  }
  return count;
}

function part2(input) {
  let count = 0;
  let board = formatBoard(input);
  // let lastTime = performance.now();
  const boardMem = {};
  const firstSeen = {};
  let totalCycles = 1000000000;
  let cycleFound = false;
  for (let cycle = 0; cycle < totalCycles; cycle++) {
    // if (cycle % 1000000 === 0) {
    // console.log(
    //   `${cycle / 1000000}:  ${msToTime(performance.now() - lastTime)}`
    // );
    // lastTime = performance.now();
    // }
    let boardString = JSON.stringify(board);
    if (boardMem[boardString] !== undefined) {
      board = JSON.parse(boardMem[boardString]);
      if (!cycleFound) {
        const firstOccurance = firstSeen[boardString];
        let cycleLength = Object.keys(boardMem).length - firstOccurance;
        totalCycles -= firstOccurance;
        cycle = 0;
        totalCycles = (totalCycles % cycleLength) + cycleLength;
        cycleFound = true;
      }
      continue;
    }
    //north
    for (let x = 1; x < board.length; x++) {
      for (let y = 0; y < board[0].length; y++) {
        if (board[x][y] === "O" && board[x - 1][y] === ".") {
          let tempX = x;
          while (tempX >= 1 && board[tempX - 1][y] === ".") {
            tempX--;
          }
          let temp = board[tempX][y];
          board[tempX][y] = board[x][y];
          board[x][y] = temp;
        }
      }
    }

    //west
    for (let y = 1; y < board[0].length; y++) {
      for (let x = 0; x < board.length; x++) {
        if (board[x][y] === "O" && board[x][y - 1] === ".") {
          let tempY = y;
          while (tempY >= 1 && board[x][tempY - 1] === ".") {
            tempY--;
          }
          let temp = board[x][tempY];
          board[x][tempY] = board[x][y];
          board[x][y] = temp;
        }
      }
    }

    //south
    for (let x = board.length - 2; x >= 0; x--) {
      for (let y = 0; y < board[0].length; y++) {
        if (board[x][y] === "O" && board[x + 1][y] === ".") {
          let tempX = x;
          while (tempX < board.length - 1 && board[tempX + 1][y] === ".") {
            tempX++;
          }
          let temp = board[tempX][y];
          board[tempX][y] = board[x][y];
          board[x][y] = temp;
        }
      }
    }

    //east
    for (let y = board[0].length - 2; y >= 0; y--) {
      for (let x = 0; x < board.length; x++) {
        if (board[x][y] === "O" && board[x][y + 1] === ".") {
          let tempY = y;
          while (tempY < board[0].length - 1 && board[x][tempY + 1] === ".") {
            tempY++;
          }
          let temp = board[x][tempY];
          board[x][tempY] = board[x][y];
          board[x][y] = temp;
        }
      }
    }

    boardMem[boardString] = JSON.stringify(board);
    firstSeen[boardString] = cycle;
  }

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y] === "O") {
        count += board.length - x;
      }
    }
  }
  return count;
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

import {
  getInput,
  formatBoard,
  lcm,
  Stack,
  msToTime,
  allEqual,
} from "../utils/index.js";

function part1(input) {
  let count = 0;
  input.split("\n\n").map((part) => {
    const board = formatBoard(part);
    let reflectionRow = -1,
      reflectionColumn = -1;

    for (let x = 0; x < board.length - 1; x++) {
      let mirrorRow = true;
      for (let y = 0; y < board[x].length; y++) {
        mirrorRow = mirrorRow && board[x][y] === board[x + 1][y];
      }
      if (mirrorRow) {
        mirrorRow = true;
        let rowCount = 0;
        for (let x2 = x; x2 >= 0; x2--) {
          let x3 = x + (x - x2) + 1;
          if (x3 < board.length) {
            for (let y2 = 0; y2 < board[0].length; y2++) {
              mirrorRow = mirrorRow && board[x2][y2] === board[x3][y2];
            }
            rowCount++;
          }
        }

        if (mirrorRow) {
          reflectionRow = x;
        }
      }
    }

    for (let y = 0; y < board[0].length - 1; y++) {
      let mirrorColumn = true;
      for (let x = 0; x < board.length; x++) {
        mirrorColumn = mirrorColumn && board[x][y] === board[x][y + 1];
      }
      if (mirrorColumn) {
        mirrorColumn = true;
        let columnCount = 0;
        for (let y2 = y; y2 >= 0; y2--) {
          let y3 = y + (y - y2) + 1;
          if (y3 < board[0].length) {
            for (let x2 = 0; x2 < board.length; x2++) {
              mirrorColumn = mirrorColumn && board[x2][y2] === board[x2][y3];
            }
            columnCount++;
          }
        }
        if (mirrorColumn) {
          reflectionColumn = y;
        }
      }
    }
    count += reflectionColumn + 1 + 100 * (reflectionRow + 1);
  });

  return count;
}

function part2(input) {
  let count = 0;
  input.split("\n\n").map((part) => {
    const board = formatBoard(part);
    let smudgeRow = -1,
      smudgeColumn = -1;
    for (let x = 0; x < board.length - 1; x++) {
      let mirrorRow = true;
      let smudgeCount = 0;
      for (let y = 0; y < board[x].length; y++) {
        mirrorRow = mirrorRow && board[x][y] === board[x + 1][y];
        if (board[x][y] !== board[x + 1][y]) {
          smudgeCount++;
        }
      }

      if (mirrorRow || smudgeCount === 1) {
        smudgeCount = 0;
        for (let x2 = x; x2 >= 0; x2--) {
          let x3 = x + (x - x2) + 1;
          if (x3 < board.length) {
            for (let y2 = 0; y2 < board[0].length; y2++) {
              if (board[x2][y2] !== board[x3][y2]) {
                smudgeCount++;
              }
            }
          }
        }
        if (smudgeCount === 1) {
          smudgeRow = x;
        }
      }
    }

    for (let y = 0; y < board[0].length - 1; y++) {
      let mirrorColumn = true;
      let smudgeCount = 0;
      for (let x = 0; x < board.length; x++) {
        mirrorColumn = mirrorColumn && board[x][y] === board[x][y + 1];
        if (board[x][y] !== board[x][y + 1]) {
          smudgeCount++;
        }
      }

      if (mirrorColumn || smudgeCount === 1) {
        smudgeCount = 0;
        for (let y2 = y; y2 >= 0; y2--) {
          let y3 = y + (y - y2) + 1;
          if (y3 < board[0].length) {
            for (let x2 = 0; x2 < board.length; x2++) {
              if (board[x2][y2] !== board[x2][y3]) {
                smudgeCount++;
              }
            }
          }
        }
        if (smudgeCount === 1) {
          smudgeColumn = y;
        }
      }
    }
    count += smudgeColumn + 1 + 100 * (smudgeRow + 1);
  });

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

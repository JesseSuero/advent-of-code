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
  const galaxies = [];
  const board = formatBoard(input);

  // print2dArray(board);
  for (let x = 0; x < board.length; x++) {
    let galaxyInRow = false;
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y] === "#") {
        galaxyInRow = true;
      }
    }
    if (!galaxyInRow) {
      board.splice(x, 0, Array(board[0].length).fill("."));
      x++;
    }
  }

  for (let y = 0; y < board[0].length; y++) {
    let galaxyInColumn = false;
    for (let x = 0; x < board.length; x++) {
      if (board[x][y] === "#") {
        galaxyInColumn = true;
      }
    }
    if (!galaxyInColumn) {
      for (let x = 0; x < board.length; x++) {
        board[x].splice(y, 0, ".");
      }
      y++;
    }
  }

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y] === "#") {
        galaxies.push({ x, y });
      }
    }
  }

  for (let x = 0; x < galaxies.length; x++) {
    for (let y = x + 1; y < galaxies.length; y++) {
      let distance =
        Math.abs(galaxies[x].x - galaxies[y].x) +
        Math.abs(galaxies[x].y - galaxies[y].y);
      count += distance;
    }
  }
  return count;
}

function part2(input) {
  const board = formatBoard(input);
  const galaxies = [];
  let count = 0;
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y] === "#") {
        galaxies.push({ x, y });
      }
    }
  }
  const emptyRows = [];
  for (let x = 0; x < board.length; x++) {
    let galaxyInRow = false;
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y] === "#") {
        galaxyInRow = true;
      }
    }
    if (!galaxyInRow) {
      emptyRows.push(x);
    }
  }
  const emptyColums = [];
  for (let y = 0; y < board[0].length; y++) {
    let galaxyInColumn = false;
    for (let x = 0; x < board.length; x++) {
      if (board[x][y] === "#") {
        galaxyInColumn = true;
      }
    }
    if (!galaxyInColumn) {
      emptyColums.push(y);
    }
  }
  // print2dArray(board);
  const expansion = 999999;
  for (let x = 0; x < galaxies.length; x++) {
    for (let y = x + 1; y < galaxies.length; y++) {
      const biggerX = Math.max(galaxies[x].x, galaxies[y].x),
        smallerX = Math.min(galaxies[x].x, galaxies[y].x);
      const biggerY = Math.max(galaxies[x].y, galaxies[y].y),
        smallerY = Math.min(galaxies[x].y, galaxies[y].y);

      for (let i = smallerX; i < biggerX; i++) {
        if (emptyRows.includes(i)) {
          count += expansion;
        }
      }

      for (let i = smallerY; i < biggerY; i++) {
        if (emptyColums.includes(i)) {
          count += expansion;
        }
      }

      count +=
        Math.abs(galaxies[x].x - galaxies[y].x) +
        Math.abs(galaxies[x].y - galaxies[y].y);
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

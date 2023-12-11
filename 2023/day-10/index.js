import {
  getInput,
  formatBoard,
  lcm,
  Stack,
  msToTime,
  allEqual,
  print2dArray,
} from "../utils/index.js";
let board, connections, mainLoop, sLocation;

function part1(input) {
  let count = 0;
  board = formatBoard(input, true, "O");
  connections = Array(board.length)
    .fill(null)
    .map(() => Array(board[0].length).fill({}));
  sLocation = {};
  for (let x = 1; x < board.length - 1; x++) {
    // connections[x] = [];
    for (let y = 1; y < board[0].length - 1; y++) {
      const char = board[x][y];
      switch (char) {
        case "S":
          sLocation = { x, y };
          connections[x][y] = {
            north: true,
            south: true,
            east: true,
            west: true,
          };
          break;
        case "|":
          connections[x][y] = {
            north: true,
            south: true,
          };
          break;
        case "-":
          connections[x][y] = {
            east: true,
            west: true,
          };
          break;
        case "L":
          connections[x][y] = {
            north: true,
            east: true,
          };
          break;
        case "7":
          connections[x][y] = {
            south: true,
            west: true,
          };
          break;
        case "F":
          connections[x][y] = {
            south: true,
            east: true,
          };
          break;
        case "J":
          connections[x][y] = {
            north: true,
            west: true,
          };
          break;
        case ".":
          if (
            board[x - 1][y] === "O" ||
            board[x + 1][y] === "O" ||
            board[x][y - 1] === "O" ||
            board[x][y + 1] === "O"
          ) {
            // board[x][y] = "O";
          }
      }
    }
  }
  let startLocation = `(${sLocation.x}|${sLocation.y}) `;
  let loop1 = findLoop(sLocation.x - 1, sLocation.y, startLocation);
  let loop2 = findLoop(sLocation.x + 1, sLocation.y, startLocation);
  let loop3 = findLoop(sLocation.x, sLocation.y - 1, startLocation);
  let loop4 = findLoop(sLocation.x, sLocation.y + 1, startLocation);
  let loopLength = Math.max(
    loop1.length,
    loop2.length,
    loop3.length,
    loop4.length
  );
  if (loopLength === loop1.length) {
    mainLoop = loop1;
  } else if (loopLength === loop2.length) {
    mainLoop = loop2;
  } else if (loopLength === loop3.length) {
    mainLoop = loop3;
  } else if (loopLength === loop4.length) {
    mainLoop = loop4;
  }
  return loopLength / 2;
}

function findLoop(x, y, path) {
  // let currLocation = `(${x}|${y}) `;
  // console.log(startMap, path);
  // console.log("\n\n");
  while (true) {
    // console.log(path);
    const connection = connections[x][y];
    let currLocation = `(${x}|${y})`;
    if (
      connection.north &&
      connections[x - 1][y].south &&
      !path.includes(`(${x - 1}|${y})`)
    ) {
      x--;
      // console.log("north");
    }
    //south
    else if (
      connection.south &&
      connections[x + 1][y].north &&
      !path.includes(`(${x + 1}|${y})`)
    ) {
      x++;
      // console.log("south");
    }
    //west
    else if (
      connection.west &&
      connections[x][y - 1].east &&
      !path.includes(`(${x}|${y - 1})`)
    ) {
      y--;
      // console.log("west");
    }
    //east
    else if (
      connection.east &&
      connections[x][y + 1].west &&
      !path.includes(`(${x}|${y + 1})`)
    ) {
      y++;
      // console.log("east");
    } else {
      path += currLocation + " ";
      break;
    }
    path += currLocation + " ";
  }
  return path.split(" ").filter(Boolean);
}

function part2() {
  let count = 0;

  for (let x = 1; x < board.length - 1; x++) {
    for (let y = 1; y < board[0].length - 1; y++) {
      const char = board[x][y];
      switch (char) {
        case "S":
          sLocation = { x, y };
          connections[x][y] = {
            north: true,
            south: true,
            east: true,
            west: true,
          };
          break;
        case "|":
          connections[x][y] = {
            north: true,
            south: true,
          };
          break;
        case "-":
          connections[x][y] = {
            east: true,
            west: true,
          };
          break;
        case "L":
          connections[x][y] = {
            north: true,
            east: true,
          };
          break;
        case "7":
          connections[x][y] = {
            south: true,
            west: true,
          };
          break;
        case "F":
          connections[x][y] = {
            south: true,
            east: true,
          };
          break;
        case "J":
          connections[x][y] = {
            north: true,
            west: true,
          };
          break;
        case ".":
          if (
            board[x - 1][y] === "O" ||
            board[x + 1][y] === "O" ||
            board[x][y - 1] === "O" ||
            board[x][y + 1] === "O"
          ) {
            board[x][y] = "O";
          }
          break;
      }
    }
  }

  for (let x = 1; x < board.length - 1; x++) {
    for (let y = 1; y < board[0].length - 1; y++) {
      if (board[x][y] !== "O" && board[x][y] !== ".") {
        let currLocation = `(${x}|${y})`;
        if (!mainLoop.includes(currLocation)) {
          if (
            board[x - 1][y] === "O" ||
            board[x + 1][y] === "O" ||
            board[x][y - 1] === "O" ||
            board[x][y + 1] === "O"
          ) {
            board[x][y] = "O";
          } else {
            board[x][y] = ".";
          }
        }
      }
    }
  }

  for (let x = 1; x < board.length - 1; x++) {
    for (let y = 1; y < board[0].length - 1; y++) {
      if (board[x][y] === "O") {
        markNeigbhorsOutside(x, y, board);
      }
    }
  }

  // this is the real genious to this solution... space out the nodes and fill the gaps. This is how you simulate going "in between" the pipes
  const spacedOut = Array(board.length * 2 + 2)
    .fill(null)
    .map(() => Array(board[0].length * 2 + 2).fill(" "));
  for (let x = 1; x < board.length; x++) {
    for (let y = 1; y < board[0].length; y++) {
      spacedOut[x * 2][y * 2] = board[x][y];
    }
  }

  for (let x = 2; x < spacedOut.length; x += 2) {
    for (let y = 2; y < spacedOut[0].length; y += 2) {
      switch (spacedOut[x][y]) {
        case "|":
          spacedOut[x][y] = "*";
          if (connections[x / 2 - 1][y / 2].south) {
            spacedOut[x - 1][y] = "*";
          }
          if (connections[x / 2 + 1][y / 2].north) {
            spacedOut[x + 1][y] = "*";
          }
          break;
        case "-":
          spacedOut[x][y] = "*";
          if (connections[x / 2][y / 2 - 1].east) {
            spacedOut[x][y - 1] = "*";
          }
          if (connections[x / 2][y / 2 + 1].west) {
            spacedOut[x][y + 1] = "*";
          }

          break;
        case "L":
          spacedOut[x][y] = "*";
          if (connections[x / 2 - 1][y / 2].south) {
            spacedOut[x - 1][y] = "*";
          }
          if (connections[x / 2][y / 2 + 1].west) {
            spacedOut[x][y + 1] = "*";
          }
          break;
        case "7":
          spacedOut[x][y] = "*";
          if (connections[x / 2 + 1][y / 2].north) {
            spacedOut[x + 1][y] = "*";
          }
          if (connections[x / 2][y / 2 - 1].east) {
            spacedOut[x][y - 1] = "*";
          }
          break;
        case "F":
          spacedOut[x][y] = "*";
          if (connections[x / 2 + 1][y / 2].north) {
            spacedOut[x + 1][y] = "*";
          }
          if (connections[x / 2][y / 2 + 1].west) {
            spacedOut[x][y + 1] = "*";
          }
          break;
        case "J":
          spacedOut[x][y] = "*";
          if (connections[x / 2 - 1][y / 2].south) {
            spacedOut[x - 1][y] = "*";
          }
          if (connections[x / 2][y / 2 - 1].east) {
            spacedOut[x][y - 1] = "*";
          }
          break;
        case "S":
          spacedOut[x][y] = "*";
          break;
      }
    }
  }

  // I know this is hot garbage, but the recursion was exceeding the call stack, so here we are
  for (let repeat = 0; repeat < 500; repeat++) {
    for (let x = 2; x < spacedOut.length - 1; x++) {
      for (let y = 2; y < spacedOut[0].length - 1; y++) {
        if (spacedOut[x][y] === "O") {
          markNeigbhorsOutside(x, y, spacedOut);
        }
      }
    }
  }

  for (let x = 2; x < spacedOut.length - 1; x++) {
    for (let y = 2; y < spacedOut[0].length - 1; y++) {
      if (spacedOut[x][y] === ".") {
        count++;
      }
    }
  }

  return count;
}

function markNeigbhorsOutside(x, y, grid, callstack) {
  callstack ??= 1;
  if (
    x <= 1 ||
    y <= 1 ||
    x >= grid.length - 1 ||
    y >= grid[0].length - 1 ||
    callstack > 20
  ) {
    return;
  }
  if (
    grid[x - 1][y] === "." ||
    grid[x - 1][y] === "X" ||
    grid[x - 1][y] === " "
  ) {
    grid[x - 1][y] = "O";
    markNeigbhorsOutside(x - 1, y, grid, callstack + 1);
  }
  if (
    grid[x + 1][y] === "." ||
    grid[x + 1][y] === "X" ||
    grid[x + 1][y] === " "
  ) {
    grid[x + 1][y] = "O";
    markNeigbhorsOutside(x + 1, y, grid, callstack + 1);
  }

  if (
    grid[x][y - 1] === "." ||
    grid[x][y - 1] === "X" ||
    grid[x][y - 1] === " "
  ) {
    grid[x][y - 1] = "O";
    markNeigbhorsOutside(x, y - 1, grid, callstack + 1);
  }

  if (
    grid[x][y + 1] === "." ||
    grid[x][y + 1] === "X" ||
    grid[x][y + 1] === " "
  ) {
    grid[x][y + 1] = "O";
    markNeigbhorsOutside(x, y + 1, grid, callstack + 1);
  }
}

function printMap() {
  for (var x = 0; x < board.length; x++) {
    let arrText = "";
    for (var y = 0; y < board[x].length; y++) {
      arrText += board[x][y] + " ";
    }
    console.log(arrText);
  }
  console.log("\n\n\n");
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
   Answer: ${answer2.toLocaleString()}
   Time Elapsed: ${msToTime(part2Time)}
`);

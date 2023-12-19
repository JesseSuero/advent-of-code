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
  print2dArray,
  polygonArea,
} from "../utils/index.js";

const directionTranslation = ["R", "D", "L", "U"];

const directionMap = {
  R: {
    x: 0,
    y: 1,
    twin: "L",
  },
  D: {
    x: 1,
    y: 0,
    twin: "U",
  },
  U: {
    x: -1,
    y: 0,
    twin: "D",
  },
  L: {
    x: 0,
    y: -1,
    twin: "R",
  },
};

function part1(input) {
  let maxX = 0,
    maxY = 0,
    minX = 0,
    minY = 0;
  let x = 0,
    y = 0;
  input.split("\n").forEach(function (line) {
    let [direction, moves, color] = line.split(" ");
    let move = directionMap[direction];
    x += move.x * moves;
    y += move.y * moves;
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
  });
  x = 1;
  y = 1;
  if (minX < 0) {
    x -= minX;
    maxX -= minX;
    minX -= minX;
  }
  if (minY < 0) {
    maxY -= minY;
    minY -= minY;
  }
  const board = Array.from({ length: maxX - minX + 3 }, () =>
    Array.from({ length: maxY - minY + 3 }, () => ".")
  );

  board[x][y] = "#";
  input.split("\n").forEach(function (line) {
    let [direction, moves, color] = line.split(" ");
    for (let i = 0; i < moves; i++) {
      let move = directionMap[direction];
      x += move.x;
      y += move.y;
      board[x][y] = "#";
    }
  });

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (
        x === 0 ||
        x === board.length - 1 ||
        y === 0 ||
        y === board[0].length - 1
      ) {
        board[x][y] = " ";
      }
    }
  }

  for (let x = 1; x < board.length; x++) {
    for (let y = 1; y < board[0].length; y++) {
      if (x === 1 || x === board.length - 2) {
        if (board[x][y] === ".") {
          markNeighbors(board, x, y, 0);
        }
      }

      if (y == 1 || y === board[0].length - 2) {
        if (board[x][y] === ".") {
          markNeighbors(board, x, y, 0);
        }
      }
    }
  }

  let countOutside = 0;
  for (let y = 1; y < board[0].length - 1; y++) {
    for (let x = 1; x < board.length - 1; x++) {
      if (board[x][y] === " ") {
        countOutside++;
      }
    }
  }

  return (maxX + 1) * (maxY + 1) - countOutside;
}

function markNeighbors(board, x, y) {
  let markNeighbors = [];
  markNeighbors.push({ x, y });
  while (markNeighbors.length > 0) {
    let neighbor = markNeighbors.pop();
    x = neighbor.x;
    y = neighbor.y;
    if (board[x][y] !== "#" && board[x][y] !== " ") {
      board[x][y] = " ";
      if (board[x - 1][y] === ".") {
        markNeighbors.push({ x: x - 1, y: y });
      }

      if (board[x + 1][y] === ".") {
        markNeighbors.push({ x: x + 1, y: y });
      }

      if (board[x][y - 1] === ".") {
        markNeighbors.push({ x: x, y: y - 1 });
      }

      if (board[x][y + 1] === ".") {
        markNeighbors.push({ x: x, y: y + 1 });
      }
    }
  }
}

function part2(input) {
  let x = 0,
    y = 0;

  let lastDirection = "";
  const vertices = [];
  input.split("\n").forEach(function (line) {
    let [direction, moves, color] = line.split(" ");
    color = color.replace("(", "");
    color = color.replace(")", "");
    color = color.replace("#", "");
    moves = parseInt(color.substring(0, color.length - 1), 16);
    direction = directionTranslation[color.substring(color.length - 1)];

    if (direction === "") {
      y++;
    }
    let move = directionMap[direction];
    x += move.x * moves;
    y += move.y * moves;

    if (direction != lastDirection) {
      vertices.push({ x: x, y: y });
    }
    lastDirection = direction;
  });

  return polygonArea(vertices, true);
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

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

const direction = {
  right: {
    x: 0,
    y: 1,
  },
  left: {
    x: 0,
    y: -1,
  },
  up: {
    x: -1,
    y: 0,
  },
  down: {
    x: 1,
    y: 0,
  },
};

const moves = {
  right: ["right", "down", "up"],
  left: ["down", "left", "up"],
  up: ["right", "up", "left"],
  down: ["down", "right", "left"],
};

let board;

let minHeatLoss = Number.MAX_VALUE;

function part1(input) {
  let count = 0;
  board = formatBoard(input, true, ".");
  for (let x = 1; x < board.length - 1; x++) {
    for (let y = 1; y < board[0].length - 1; y++) {
      board[x][y] = parseInt(board[x][y]);
    }
  }

  let start1 = {
    x: 1,
    y: 2,
    direction: "right",
  };
  let start2 = {
    x: 2,
    y: 1,
    direction: "down",
  };

  const map = {};
  makeMove(start1, 1, board[1][2], map);
  makeMove(start2, 1, board[2][1], map);

  return minHeatLoss;
}

function makeMove(location, timesStraight, heatLoss, visited) {
  if (
    timesStraight > 3 ||
    board[location.x][location.y] === "." ||
    heatLoss > minHeatLoss
  ) {
    return;
  }

  let visitedKey = `(${location.x},${location.y},${timesStraight}) ${location.direction}`;
  if (visited[visitedKey]) {
    if (visited[visitedKey] > heatLoss) {
      visited[visitedKey] = heatLoss;
    } else {
      return;
    }
  } else {
    visited[visitedKey] = heatLoss;
  }

  if (location.x === board.length - 2 && location.y === board[0].length - 2) {
    minHeatLoss = Math.min(heatLoss, minHeatLoss);
    return;
  }

  let legalMoves = moves[location.direction];
  for (let i = 0; i < legalMoves.length; i++) {
    if (i === 0 && timesStraight === 2) {
      continue;
    }
    let newDirection = legalMoves[i];
    let move = direction[newDirection];
    let newLocation = {
      x: location.x + move.x,
      y: location.y + move.y,
      direction: newDirection,
    };

    makeMove(
      newLocation,
      newDirection === location.direction ? timesStraight + 1 : 0,
      heatLoss + board[newLocation.x][newLocation.y],
      visited
    );
  }
}

function makeMove2(location, timesStraight, heatLoss, visited) {
  if (
    timesStraight > 10 ||
    board[location.x][location.y] === "." ||
    heatLoss > minHeatLoss
  ) {
    return;
  }

  let visitedKey = `(${location.x},${location.y},${timesStraight}) ${location.direction}`;
  if (visited[visitedKey]) {
    if (visited[visitedKey] > heatLoss) {
      visited[visitedKey] = heatLoss;
    } else {
      return;
    }
  } else {
    visited[visitedKey] = heatLoss;
  }

  if (
    location.x === board.length - 2 &&
    location.y === board[0].length - 2 &&
    timesStraight >= 4
  ) {
    minHeatLoss = Math.min(heatLoss, minHeatLoss);
    return;
  }

  let legalMoves = moves[location.direction];
  for (let i = 0; i < legalMoves.length; i++) {
    let newDirection = legalMoves[i];
    if (newDirection !== location.direction && timesStraight < 4) {
      continue;
    }
    let move = direction[newDirection];
    let newLocation = {
      x: location.x + move.x,
      y: location.y + move.y,
      direction: newDirection,
    };

    makeMove2(
      newLocation,
      newDirection === location.direction ? timesStraight + 1 : 1,
      heatLoss + board[newLocation.x][newLocation.y],
      visited
    );
  }
}

function part2() {
  let start1 = {
    x: 1,
    y: 2,
    direction: "right",
  };
  let start2 = {
    x: 2,
    y: 1,
    direction: "down",
  };
  minHeatLoss = Number.MAX_VALUE;
  const map = {};
  makeMove2(start1, 1, board[1][2], map);
  makeMove2(start2, 1, board[2][1], map);
  return minHeatLoss;
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

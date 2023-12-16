import {
  getInput,
  formatBoard,
  lcm,
  Stack,
  msToTime,
  allEqual,
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

const bounce = {
  right: {
    "|": "updown",
    "-": "",
    "\\": "down",
    "/": "up",
  },
  left: {
    "|": "updown",
    "-": "",
    "\\": "up",
    "/": "down",
  },
  up: {
    "|": "",
    "-": "leftright",
    "\\": "left",
    "/": "right",
  },
  down: {
    "|": "",
    "-": "leftright",
    "\\": "right",
    "/": "left",
  },
};

function part1(startBeam) {
  let count = 0;
  const energized = Array.from({ length: board.length }, () =>
    Array.from({ length: board[0].length }, () => false)
  );
  let beamList = [];
  startBeam ??= {
    x: 1,
    y: 1,
    dir: "right",
  };
  beamList.push(startBeam);
  energized[0][0] = true;

  let visited = {};
  while (beamList.length > 0) {
    for (let i = 0; i < beamList.length; i++) {
      const beam = beamList[i];
      const square = board[beam.x][beam.y];
      let visitedKey = `(${beam.x},${beam.y})${beam.dir}`;
      if (square === "O" || visited[visitedKey]) {
        beamList.splice(i, 1);
        continue;
      }
      visited[visitedKey] = true;

      energized[beam.x][beam.y] = true;
      switch (square) {
        case ".":
          break;
        default:
          let newDir = bounce[beam.dir][square];
          let newBeam;
          switch (newDir) {
            case "":
              break;
            case "updown":
              beam.dir = "up";
              newBeam = structuredClone(beam);
              newBeam.dir = "down";
              newBeam.x += 1;
              beamList.push(newBeam);
              break;
            case "leftright":
              beam.dir = "left";
              newBeam = structuredClone(beam);
              newBeam.dir = "right";
              newBeam.y += 1;
              beamList.push(newBeam);
              break;
            default:
              beam.dir = newDir;
              break;
          }
      }
      beam.x += direction[beam.dir].x;
      beam.y += direction[beam.dir].y;
    }
  }

  for (let x = 1; x < board.length - 1; x++) {
    let line = "";
    for (let y = 1; y < board[0].length - 1; y++) {
      if (energized[x][y]) {
        count++;
        line += "#";
      } else {
        line += ".";
      }
    }
  }
  return count;
}

function part2() {
  let maxCount = 0;
  let count = 0;
  for (let x = 1; x < board.length - 1; x++) {
    for (let y = 1; y < board[0].length - 1; y++) {
      if (x === 1) {
        const startBeam = {
          x,
          y,
          dir: "down",
        };
        count = part1(startBeam);
        maxCount = Math.max(maxCount, count);
      }

      if (x === board.length - 2) {
        const startBeam = {
          x,
          y,
          dir: "up",
        };
        count = part1(startBeam);
        maxCount = Math.max(maxCount, count);
      }

      if (y === 1) {
        const startBeam = {
          x,
          y,
          dir: "right",
        };
        count = part1(startBeam);
        maxCount = Math.max(maxCount, count);
      }

      if (y === board[0].length - 2) {
        const startBeam = {
          x,
          y,
          dir: "left",
        };
        count = part1(startBeam);
        maxCount = Math.max(maxCount, count);
      }
    }
  }
  return maxCount;
}

const input = getInput(import.meta.url);
const board = formatBoard(input, true, "O");
let start = performance.now();
const answer1 = part1();
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

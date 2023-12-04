import { getInput, formatBoard, getLCM, Stack } from "../utils/index.js";

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

function isSymbol(value) {
  return !/^[0-9.]*$/.test(value);
}

function isGear(value) {
  return value === "*";
}

function part1(input) {
  const board = formatBoard(input, true, ".");
  let sum = 0;
  for (let x = 1; x < board.length - 1; x++) {
    let num = "",
      adjacent = false;
    for (let y = 1; y < board[x].length - 1; y++) {
      var slot = board[x][y];
      if (isNumeric(slot)) {
        num += slot;
        adjacent = adjacent || isSymbolNear(board, x, y);
      }

      if (num != "" && (!isNumeric(slot) || y === board[x].length - 2)) {
        if (adjacent) {
          sum += parseInt(num);
        }
        num = "";
        adjacent = false;
      }
    }
  }

  return sum;
}

function part2(input) {
  const board = formatBoard(input, true, ".");

  let gearList = [],
    sum = 0,
    currNum = "",
    nearbyGears = {};
  for (let x = 1; x < board.length - 1; x++) {
    for (let y = 1; y < board[x].length - 1; y++) {
      var slot = board[x][y];
      if (isNumeric(slot)) {
        currNum += slot;
        findNearbyGears(board, nearbyGears, x, y);
      }

      if (currNum != "" && (!isNumeric(slot) || y === board[x].length - 2)) {
        for (const key in nearbyGears) {
          if (gearList[key] === undefined) {
            gearList[key] = [];
          }
          gearList[key].push(currNum);
        }

        currNum = "";
        nearbyGears = {};
      }
    }
  }

  for (const key in gearList) {
    let nums = gearList[key];
    if (nums.length > 1) {
      sum += gearList[key].reduce((a, b) => a * b);
    }
  }
  return sum;
}

function findNearbyGears(board, gearList, x, y) {
  addNeigbhoringGear(board, gearList, x - 1, y);
  addNeigbhoringGear(board, gearList, x - 1, y - 1);
  addNeigbhoringGear(board, gearList, x - 1, y + 1);
  addNeigbhoringGear(board, gearList, x, y - 1);
  addNeigbhoringGear(board, gearList, x, y + 1);
  addNeigbhoringGear(board, gearList, x + 1, y);
  addNeigbhoringGear(board, gearList, x + 1, y - 1);
  addNeigbhoringGear(board, gearList, x + 1, y + 1);
}

function addNeigbhoringGear(board, gearList, x, y) {
  if (isGear(board[x][y])) {
    gearList[`${x}|${y}`] = { x: x, y: y };
  }
}

function isSymbolNear(board, x, y) {
  return (
    isSymbol(board[x - 1][y]) ||
    isSymbol(board[x - 1][y - 1]) ||
    isSymbol(board[x - 1][y + 1]) ||
    isSymbol(board[x][y - 1]) ||
    isSymbol(board[x][y + 1]) ||
    isSymbol(board[x + 1][y]) ||
    isSymbol(board[x + 1][y - 1]) ||
    isSymbol(board[x + 1][y + 1])
  );
}

const input = getInput(import.meta.url);
const answer1 = part1(input);
const answer2 = part2(input);

console.log(`
#1 
   ${answer1}

#2 
   ${answer2}
`);

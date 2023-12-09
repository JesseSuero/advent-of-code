import { getInput, formatBoard, lcm, Stack, msToTime } from "../utils/index.js";
const allEqual = (arr) => arr.every((v) => v === arr[0]);
function part1(input) {
  let count = 0;
  input
    .split("\n")
    .map((line) => line.split(" ").map(Number))
    .forEach((list) => {
      let next = getNext(list);
      count += next;
    });
  return count;
}

function getNext(list) {
  if (allEqual(list)) return list[0];
  let diff = [];
  for (let i = 1; i < list.length; i++) {
    diff.push(list[i] - list[i - 1]);
  }
  return list[list.length - 1] + getNext(diff);
}

function getPrevious(list) {
  if (allEqual(list)) return list[0];
  let diff = [];
  for (let i = 1; i < list.length; i++) {
    diff.push(list[i] - list[i - 1]);
  }
  return list[0] - getPrevious(diff);
}

function part2(input) {
  let count = 0;
  input
    .split("\n")
    .map((line) => line.split(" ").map(Number))
    .forEach((list) => {
      let next = getPrevious(list);
      count += next;
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
   Answer: ${answer2.toLocaleString()}
   Time Elapsed: ${msToTime(part2Time)}
`);

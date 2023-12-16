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

function part1(input) {
  let count = 0;
  // const board = formatBoard(input, true, ".");
  //let lines = input
  //   .split("\n")
  //   .map((line) => line.replace(/^Card \d+: /, ""))
  //   .forEach(function (line) {});
  return count;
}

function part2(input) {
  let count = 0;
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

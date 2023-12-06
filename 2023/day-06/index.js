import {
  getInput,
  formatBoard,
  getLCM,
  Stack,
  msToTime,
} from "../utils/index.js";

function part1(input) {
  input = input.replace("Time: ", "").replace("Distance: ", "").trim();
  var [times, distances] = input
    .split("\n")
    .map((line) => line.split(" ").filter(Boolean).map(Number));
  let num = 1;
  times.forEach((time, index) => {
    let distance = distances[index];
    let traveled = 0,
      speed = 0,
      timesBeat = 0;
    for (let i = 1; i < time; i++) {
      speed = i;
      traveled = (time - i) * speed;
      if (traveled > distance) timesBeat++;
    }
    if (timesBeat > 0) {
      num *= timesBeat;
    }
  });
  return num;
}

function part2(input) {
  input = input
    .replace("Time: ", "")
    .replace("Distance: ", "")
    .replaceAll(" ", "")
    .trim();
  var [times, distances] = input
    .split("\n")
    .map((line) => line.split(" ").filter(Boolean).map(Number));
  let num = 1;
  times.forEach((time, index) => {
    let distance = distances[index];
    let traveled = 0,
      speed = 0,
      timesBeat = 0;
    for (let i = 1; i < time; i++) {
      speed = i;
      traveled = (time - i) * speed;
      if (traveled > distance) timesBeat++;
    }
    if (timesBeat > 0) {
      num *= timesBeat;
    }
  });
  return num;
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

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

  let lines = input.split("\n").map((line) => {
    line.split(",").forEach(function (word) {
      let value = 0;
      for (let i = 0; i < word.length; i++) {
        value += word.charCodeAt(i);
        value = HASH(value);
      }
      count += value;
    });
  });
  return count;
}

function HASH(value) {
  return (value * 17) % 256;
}

function HASHWord(word) {
  let value = 0;
  for (let i = 0; i < word.length; i++) {
    value += word.charCodeAt(i);
    value = HASH(value);
  }
  return value;
}

function part2(input) {
  let count = 0;
  let words = input.replaceAll("\n", ",").split(",");
  let map = Array(256);
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    const [label, focalLength] = word.split(/(?:-|=)+/);
    let boxNumber = HASHWord(label);
    if (map[boxNumber] === undefined) {
      map[boxNumber] = [];
    }
    let index = map[boxNumber].map((e) => e.label).indexOf(label);
    if (!focalLength) {
      if (index >= 0) {
        map[boxNumber].splice(index, 1);
      }
    } else {
      if (index < 0) {
        map[boxNumber].push({ label, focalLength });
      } else {
        map[boxNumber][index].focalLength = focalLength;
      }
    }
  }

  for (let i = 0; i < 256; i++) {
    if (map[i] !== undefined && map[i].length > 0) {
      const box = map[i];
      for (let j = 0; j < box.length; j++) {
        const lens = box[j];
        count += (i + 1) * (j + 1) * lens.focalLength;
      }
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

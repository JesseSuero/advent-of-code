import {
  getInput,
  formatBoard,
  getLCM,
  Stack,
  msToTime,
} from "../utils/index.js";

function part1(input) {
  let [seeds, ...maps] = input.split("\n\n");
  let map = {};
  let index = 0;
  maps.forEach((part, i) => {
    map[i] = [];
    let [, ...ranges] = part.split("\n");
    ranges.forEach((range) => {
      let [destination, source, length] = range.split(" ").map(Number);
      map[i].push({ destination, source, length });
    });
    index++;
  });
  let minLocation = Number.MAX_SAFE_INTEGER;
  seeds
    .replace("seeds: ", "")
    .split(" ")
    .map(Number)
    .forEach((seedNum) => {
      let lookUp = seedNum;
      for (let i = 0; i < index; i++) {
        let ins = map[i];
        for (let j = 0; j < ins.length; j++) {
          if (
            lookUp >= ins[j].source &&
            lookUp < ins[j].source + ins[j].length
          ) {
            lookUp = lookUp + (ins[j].destination - ins[j].source);
            break;
          }
        }
      }
      minLocation = Math.min(minLocation, lookUp);
    });
  return minLocation;
}

function part2(input) {
  let [seedsInitial, ...maps] = input.split("\n\n");
  let seeds = seedsInitial.replace("seeds: ", "").split(" ").map(Number);

  let map = {};
  let index = 0;
  maps.forEach((part, i) => {
    map[i] = [];
    let [, ...ranges] = part.split("\n");
    ranges.forEach((range) => {
      let [destination, source, length] = range.split(" ").map(Number);
      map[i].push({ destination, source, length });
    });
    index++;
  });

  // do a reverse lookup... this is faster, otherwise you're counting atoms in the universe
  for (let lowest = 0; ; lowest++) {
    let lookUp = lowest;
    for (let j = index - 1; j >= 0; j--) {
      let ins = map[j];

      for (let j = 0; j < ins.length; j++) {
        if (
          lookUp >= ins[j].destination &&
          lookUp < ins[j].destination + ins[j].length
        ) {
          lookUp = lookUp + (ins[j].source - ins[j].destination);
          break;
        }
      }
    }
    for (let seedIndex = 0; seedIndex < seeds.length; seedIndex += 2) {
      if (
        lookUp >= seeds[seedIndex] &&
        lookUp < seeds[seedIndex] + seeds[seedIndex + 1]
      ) {
        return lowest;
      }
    }
  }
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

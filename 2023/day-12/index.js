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

const chars = { period: ".", hash: "#", question: "?" };
let count = 0;

function part1(input) {
  let count = 0;

  input.split("\n").forEach((line, index) => {
    let [springs, records] = line.split(" ");

    records = records.split(",").map(Number);
    springs = springs.replaceAll(/([.]{2,})+/g, ".");

    const map = {};
    let localCount = findMatches(springs, records, map);
    count += localCount;
    // console.log(index + ": " + localCount + " " + count);
  });

  return count;
}

const findMatches = function (pattern, records, map) {
  // console.log(pattern, records);
  let key = pattern + JSON.stringify(records);

  if (key in map) {
    return map[key];
  }

  if (records.length === 0) {
    return pattern.includes(chars.hash) ? 0 : 1;
  }

  if (
    !pattern.includes(chars.hash) &&
    !pattern.includes(chars.question) &&
    records.length > 0
  ) {
    return 0;
  }

  let hashCount = 0;
  let currentRecord = records[0];

  for (let i = 0; i < pattern.length; i++) {
    switch (pattern[i]) {
      case chars.period:
        if (currentRecord === hashCount) {
          let newRecords = [...records];
          newRecords.shift();
          map[key] = findMatches(pattern.substring(i + 1), newRecords, map);
          return map[key];
        } else if (hashCount > 0 && hashCount < currentRecord) {
          return 0;
        }
        break;
      case chars.hash:
        hashCount++;
        if (hashCount > currentRecord) {
          return 0;
        }
        break;
      case chars.question:
        const choosePeriod = setCharAt(pattern, i, chars.period).substring(
          i + 1
        );
        const chooseHash = setCharAt(pattern, i, chars.hash).substring(i);
        if (hashCount > 0) {
          if (hashCount !== currentRecord) {
            pattern = setCharAt(pattern, i, chars.hash);
            hashCount++;
          } else {
            let newRecords = [...records];
            newRecords.shift();
            map[key] = findMatches(choosePeriod, [...newRecords], map);
            return map[key];
          }
        } else {
          map[key] =
            findMatches(chooseHash, [...records], map) +
            findMatches(choosePeriod, [...records], map);
          return map[key];
        }
    }
  }

  if (currentRecord === hashCount && records.length === 1) {
    return 1;
  } else {
    return 0;
  }
};

function part2(input) {
  let count = 0;

  input.split("\n").forEach((line, index) => {
    let [springs, records] = line.split(" ");
    springs =
      springs +
      chars.question +
      springs +
      chars.question +
      springs +
      chars.question +
      springs +
      chars.question +
      springs;
    records =
      records + "," + records + "," + records + "," + records + "," + records;

    records = records.split(",").map(Number);
    springs = springs.replaceAll(/([.]{2,})+/g, ".");

    const map = {};
    let localCount = findMatches(springs, records, map);
    count += localCount;
    // console.log(index + ": " + localCount + " " + count);
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
   Answer: ${answer2}
   Time Elapsed: ${msToTime(part2Time)}
`);

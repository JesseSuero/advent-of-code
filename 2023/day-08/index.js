import { getInput, formatBoard, Stack, msToTime, lcm } from "../utils/index.js";

function part1(input) {
  let [instructions, nodes] = input.split("\n\n");
  var map = {};
  nodes.split("\n").map((node) => {
    let input, output;
    [input, output] = node.split(" = ");
    output = output.substring(1, output.length - 1).split(", ");
    map[input] = { L: output[0], R: output[1] };
  });
  let curr = "AAA";
  let count = 0;
  while (curr != "ZZZ") {
    instructions.split("").forEach((instruction) => {
      curr = map[curr][instruction];
      count++;
    });
  }
  return count;
}

function part2(input) {
  let [instructions, nodes] = input.split("\n\n");
  var map = {};
  var curr = [];
  nodes.split("\n").map((node) => {
    let input, output;
    [input, output] = node.split(" = ");
    output = output.substring(1, output.length - 1).split(", ");
    map[input] = {
      Node: input,
      L: output[0],
      R: output[1],
      zEnd: input.slice(-1) === "Z",
    };
    if (input[input.length - 1] === "A") {
      curr.push(input);
    }
  });

  let loops = [];
  curr.forEach((node) => {
    let loopLength = 0;
    let current = node;
    while (current.slice(-1) !== "Z") {
      for (let i = 0; i < instructions.length; i++) {
        current = map[current][instructions[i]];
        loopLength++;
        if (current.slice(-1) === "Z") {
          break;
        }
      }
    }
    loops.push(loopLength);
  });
  return loops.reduce(lcm);
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

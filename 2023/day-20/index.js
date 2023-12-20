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

let pulseType = {
  low: "low",
  high: "high",
};
let modules = {};
let modulesCopy = {};
let pulseList = [];

function part1(input) {
  let low = 0,
    high = 0;
  input.split("\n").map((line) => {
    let [moduleName, destinations] = line.split(" -> ");
    destinations = destinations.split(", ");
    let module = { destinations: destinations };
    let isFlipFlop = moduleName.includes("%");
    if (isFlipFlop) {
      moduleName = moduleName.substring(1);
      module.isFlipFlop = true;
      module.isOn = false;
    }
    let isConjunction = moduleName.includes("&");
    if (isConjunction) {
      moduleName = moduleName.substring(1);
      module.isConjunction = true;
      module.memory = {};
    }
    modules[moduleName] = module;
  });

  for (let [moduleName, module] of Object.entries(modules)) {
    module.destinations.forEach((destination) => {
      if (modules[destination] && modules[destination].isConjunction) {
        modules[destination].memory[moduleName] = pulseType.low;
      }
    });
  }
  modulesCopy = structuredClone(modules);

  for (let buttonPresses = 1; buttonPresses <= 1000; buttonPresses++) {
    pulseList.push({
      moduleName: "broadcaster",
      pulseType: pulseType.low,
      from: "button",
    });
    while (pulseList.length > 0) {
      let pulse = pulseList.shift();
      if (pulse.pulseType === pulseType.low) {
        low++;
      } else {
        high++;
      }
      processPulse(pulse);
    }
  }

  return low * high;
}

function processPulse(pulse) {
  // console.log(pulse.from + " -" + pulse.pulseType + "-> " + pulse.moduleName);
  let moduleName = pulse.moduleName;
  let module = modules[moduleName];
  if (!module) {
    return;
  }

  if (moduleName === "broadcaster") {
    for (let i = 0; i < module.destinations.length; i++) {
      let destination = module.destinations[i];
      pulseList.push({
        moduleName: destination,
        pulseType: pulse.pulseType,
        from: moduleName,
      });
    }
  } else if (module.isFlipFlop && pulse.pulseType === pulseType.low) {
    module.isOn = !module.isOn;

    for (let i = 0; i < module.destinations.length; i++) {
      let destination = module.destinations[i];
      pulseList.push({
        moduleName: destination,
        pulseType: module.isOn ? pulseType.high : pulseType.low,
        from: moduleName,
      });
    }
  } else if (module.isConjunction) {
    module.memory[pulse.from] = pulse.pulseType;
    let allHigh = true;
    for (let [key, value] of Object.entries(module.memory)) {
      allHigh &= value === pulseType.high;
    }
    let sendingPulseType;
    if (allHigh) {
      sendingPulseType = pulseType.low;
    } else {
      sendingPulseType = pulseType.high;
    }

    for (let i = 0; i < module.destinations.length; i++) {
      let destination = module.destinations[i];
      pulseList.push({
        moduleName: destination,
        pulseType: sendingPulseType,
        from: moduleName,
      });
    }
  }
}

function part2() {
  modules = structuredClone(modulesCopy);
  let firstHighPulse = {};

  for (let buttonPresses = 1; ; buttonPresses++) {
    pulseList.push({
      moduleName: "broadcaster",
      pulseType: pulseType.low,
      from: "button",
    });
    while (pulseList.length > 0) {
      let pulse = pulseList.shift();
      processPulse(pulse, buttonPresses);
      for (let [key, value] of Object.entries(modules["zh"].memory)) {
        if (value === pulseType.high) {
          if (!firstHighPulse[key]) {
            firstHighPulse[key] = buttonPresses;
          }
        }
      }
    }

    if (Object.keys(firstHighPulse).length === 4) {
      break;
    }

    for (let [key, value] of Object.entries(modules["zh"].memory)) {
      if (value === pulseType.high) {
        console.log(`${buttonPresses}: ${key}`);
      }
    }
  }

  let pressesNeeeded = 1;
  for (let [, value] of Object.entries(firstHighPulse)) {
    pressesNeeeded *= value;
  }
  return pressesNeeeded;
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

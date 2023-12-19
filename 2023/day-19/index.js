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

const workflowList = {};

function part1(input) {
  let count = 0;
  let [workflows, ratings] = input.split("\n\n");
  workflows.split("\n").map((workflow) => {
    workflow = workflow.substring(0, workflow.length - 1);
    let [workflowName, conditions] = workflow.split("{");
    conditions = conditions.split(",").map((condition) => {
      let [rule, nextWorkflow] = condition.split(":");
      let [variable, value] = rule.split(/[<,>]+/);
      let operator;
      if (rule.includes("<")) {
        operator = "<";
      } else if (value) {
        operator = ">";
      }

      return { variable, operator, value, nextWorkflow };
    });
    workflowList[workflowName] = conditions;
  });

  ratings.split("\n").map((rating) => {
    rating = rating.substring(1, rating.length - 1);
    let variables = rating.split(",");
    let varValues = {};
    for (let i = 0; i < variables.length; i++) {
      let variable = variables[i];
      let [varName, varValue] = variable.split("=");
      varValues[varName] = varValue;
    }

    count += processWorkflow(varValues);
  });

  return count;
}

function processWorkflow(varValues) {
  let nextWorkflow = "in";

  while (nextWorkflow !== "R" && nextWorkflow !== "A") {
    let rules = workflowList[nextWorkflow];
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      let varValue = varValues[rule.variable];
      if (rule.operator === ">") {
        if (parseInt(varValue) > parseInt(rule.value)) {
          nextWorkflow = rule.nextWorkflow;
          break;
        }
      } else if (rule.operator === "<") {
        if (parseInt(varValue) < parseInt(rule.value)) {
          nextWorkflow = rule.nextWorkflow;
          break;
        }
      } else {
        nextWorkflow = rule.variable;
      }
    }
  }
  if (nextWorkflow === "R") {
    return 0;
  } else {
    let sum = 0;
    for (const varName in varValues) {
      let varValue = parseInt(varValues[varName]);
      sum += varValue;
    }
    return sum;
  }
}

function part2() {
  const variableRanges = {
    x: { min: 1, max: 4000 },
    m: { min: 1, max: 4000 },
    a: { min: 1, max: 4000 },
    s: { min: 1, max: 4000 },
  };
  return findMap("in", variableRanges);
}

function findMap(nextWorkflow, variableRanges) {
  let count = 0;
  if (nextWorkflow === "R") {
    return 0;
  } else if (nextWorkflow === "A") {
    return (
      (variableRanges.x.max - variableRanges.x.min + 1) *
      (variableRanges.m.max - variableRanges.m.min + 1) *
      (variableRanges.a.max - variableRanges.a.min + 1) *
      (variableRanges.s.max - variableRanges.s.min + 1)
    );
  } else {
    const rules = workflowList[nextWorkflow];
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];

      if (rule.operator === ">") {
        let newVariableRanges = structuredClone(variableRanges);
        newVariableRanges[rule.variable].min = parseInt(rule.value) + 1;
        variableRanges[rule.variable].max = parseInt(rule.value);
        if (
          newVariableRanges[rule.variable].min <=
          newVariableRanges[rule.variable].max
        ) {
          count += findMap(rule.nextWorkflow, newVariableRanges);
        }
      } else if (rule.operator === "<") {
        let newVariableRanges = structuredClone(variableRanges);
        newVariableRanges[rule.variable].max = parseInt(rule.value) - 1;
        variableRanges[rule.variable].min = parseInt(rule.value);
        if (
          newVariableRanges[rule.variable].min <=
          newVariableRanges[rule.variable].max
        ) {
          count += findMap(rule.nextWorkflow, newVariableRanges);
        }
      } else {
        let newVariableRanges = structuredClone(variableRanges);
        nextWorkflow = rule.variable;
        count += findMap(rule.variable, newVariableRanges);
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

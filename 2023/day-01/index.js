import { getInput } from "../utils/index.js";

const sum = (nums) => nums.reduce((partialSum, a) => partialSum + a, 0);

function getInputArray(input) {
  return input.split("\n");
}

function getElfSum(input) {
  return sum(
    input
      .map((line) => line.replace(/\D/g, ""))
      .map((line) => line.substring(0, 1) + line.substring(line.length - 1))
      .map(Number)
  );
}

export function replaceWordDigits(line) {
  line = line.replaceAll("one", "1");
  line = line.replaceAll("two", "2");
  line = line.replaceAll("three", "3");
  line = line.replaceAll("four", "4");
  line = line.replaceAll("five", "5");
  line = line.replaceAll("six", "6");
  line = line.replaceAll("seven", "7");
  line = line.replaceAll("eight", "8");
  line = line.replaceAll("nine", "9");
  return line;
}

export function getElfSumWithWordDigits(input) {
  input = input.map((line) => {
    for (var i = 3; i <= line.length; i++) {
      var linePart = line.substring(0, i);
      var alteredLine = replaceWordDigits(linePart);
      if (linePart.length != alteredLine.length) {
        line = alteredLine + line;
        break;
      }
    }
    return line;
  });

  input = input.map((line) => {
    for (var i = line.length - 3; i >= 0; i--) {
      var linePart = line.substring(i);
      var alteredLine = replaceWordDigits(linePart);
      if (linePart.length != alteredLine.length) {
        line = line + alteredLine;
        break;
      }
    }
    return line;
  });

  return getElfSum(input);
}

if (process.env.NODE_ENV !== "test") {
  const input = getInputArray(getInput(import.meta.url));
  const answer1 = getElfSum(input);
  const answer2 = getElfSumWithWordDigits(input);

  console.log(`
#1 ${answer1}

#2 ${answer2}
`);
}

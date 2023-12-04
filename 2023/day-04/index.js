import { getInput, formatBoard, getLCM, Stack, split } from "../utils/index.js";

function part1(input) {
  let sum = 0;
  input = input
    .split("\n")
    .map((line) => line.replace(/^Card \d+: /, ""))
    .forEach(function (line) {
      var card = line.split("|");
      var count = 0;
      var winning = split(card[0], " ", true); // card[0].trim().split(" ").filter(Boolean).map(Number);
      var nums = split(card[1], " ", true); //card[1].trim().split(" ").filter(Boolean).map(Number);
      nums.forEach((num) => {
        if (num != 0 && winning.indexOf(num) > -1) {
          count++;
        }
      });
      if (count > 0) {
        sum += Math.pow(2, count - 1);
      }
    });

  return sum;
}
function part2(input) {
  let sum = 0;
  const cardCount = Array(200).fill(1);
  input = input
    .split("\n")
    .map((line) => line.replace(/^Card \d+: /, ""))
    .forEach((line, currCard) => {
      var card = line.split("|");
      var count = 0;
      var winning = split(card[0], " ", true); // card[0].trim().split(" ").filter(Boolean).map(Number);
      var nums = split(card[1], " ", true); //card[1].trim().split(" ").filter(Boolean).map(Number);
      nums.forEach((num) => {
        if (winning.indexOf(num) > -1) {
          count++;
        }
      });
      for (
        let i = currCard + 1;
        i < currCard + count + 1 && i < cardCount.length + 1;
        i++
      ) {
        cardCount[i] += cardCount[currCard];
      }
      sum += cardCount[currCard];
    });

  return sum;
}

const input = getInput(import.meta.url);
const answer1 = part1(input);
const answer2 = part2(input);

console.log(`
#1 
   ${answer1}

#2 
   ${answer2}
`);

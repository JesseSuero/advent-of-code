import {
  getInput,
  formatBoard,
  getLCM,
  Stack,
  msToTime,
} from "../utils/index.js";

function part1(input) {
  var order = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
  return getCamelWinnings(input, order);
}

function part2(input) {
  var order = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];
  return getCamelWinnings(input, order, true);
}

function getCamelWinnings(input, order, jokersWild = false) {
  let sum = 0;
  var hands = [];
  input.split("\n").map((line) => {
    var [hand, bid] = line.split(" ");
    var cards = {};
    hand.split("").forEach((card) => {
      cards[card] ??= 0;
      cards[card]++;
    });
    hands.push({
      type: getType(cards, jokersWild),
      hand,
      cards,
      bid: parseInt(bid),
    });
  });

  while (hands.length > 0) {
    var highestCardIndex = 0;
    for (let i = 1; i < hands.length; i++) {
      let currentCard = hands[i],
        highestCard = hands[highestCardIndex];
      if (isHandGreater(highestCard, currentCard, order)) {
        highestCardIndex = i;
      }
    }
    sum += hands[highestCardIndex].bid * hands.length;
    hands.splice(highestCardIndex, 1);
  }

  return sum;
}

function isHandGreater(firstCard, secondCard, order) {
  if (secondCard.type > firstCard.type) {
    return true;
  } else if (secondCard.type === firstCard.type) {
    for (var j = 0; j < 5; j++) {
      if (
        order.indexOf(secondCard.hand[j]) != order.indexOf(firstCard.hand[j])
      ) {
        if (
          order.indexOf(secondCard.hand[j]) < order.indexOf(firstCard.hand[j])
        ) {
          return true;
        }
        return false;
      }
    }
  }
  return false;
}

function getType(cards, jokersWild = false) {
  var jokerCount = 0;
  if (jokersWild && cards["J"] != undefined) {
    jokerCount = cards["J"];
  }
  var tripleFound = false,
    doubleCount = 0;
  for (const card in cards) {
    var count = cards[card];
    if (count === 5 || count + jokerCount === 5) return 7;
    if (count === 4 || (count + jokerCount === 4 && card != "J")) return 6;
    if (count === 3) {
      tripleFound = true;
    }
    if (count == 2 && (!jokersWild || card != "J")) doubleCount++;
  }
  if (
    (tripleFound && doubleCount === 1) ||
    (doubleCount === 2 && jokerCount === 1) ||
    (doubleCount === 1 && jokerCount === 2)
  )
    return 5;
  if (
    tripleFound ||
    (doubleCount === 1 && jokerCount === 1) ||
    jokerCount === 2
  )
    return 4;
  if (doubleCount === 2 || (doubleCount === 1 && jokerCount == 1)) return 3;
  if (doubleCount === 1 || jokerCount === 1) return 2;
  return 1;
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

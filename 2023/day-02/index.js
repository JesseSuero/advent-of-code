import { getInput } from "../utils/index.js";

function part1(input) {
  const maxRed = 12,
    maxGreen = 13,
    maxBlue = 14;
  var idSum = 0;
  var games = input.split("\n");
  for (var i = 0; i < games.length; i++) {
    var rounds = games[i].split(":")[1].trim().split(";");
    var possible = true;
    for (var j = 0; j < rounds.length && possible; j++) {
      var cubes = rounds[j].trim().split(",");
      for (var k = 0; k < cubes.length && possible; k++) {
        var parts = cubes[k].trim().split(" ");
        var value = parseInt(parts[0].trim());
        switch (parts[1].trim()) {
          case "red":
            if (value > maxRed) {
              possible = false;
            }
            break;
          case "green":
            if (value > maxGreen) {
              possible = false;
            }
            break;
          case "blue":
            if (value > maxBlue) {
              possible = false;
            }
            break;
        }
      }
    }
    if (possible) {
      idSum += i + 1;
    }
  }
  return idSum;
}

function part2(input) {
  var powerSum = 0;
  var games = input.split("\n");
  for (let i = 0; i < games.length; i++) {
    let maxRed = 0,
      maxGreen = 0,
      maxBlue = 0;
    var rounds = games[i].split(":")[1].trim().split(";");
    for (let j = 0; j < rounds.length; j++) {
      var cubes = rounds[j].trim().split(",");
      for (let k = 0; k < cubes.length; k++) {
        var parts = cubes[k].trim().split(" ");
        var value = parseInt(parts[0].trim());
        switch (parts[1].trim()) {
          case "red":
            maxRed = Math.max(value, maxRed);
            break;
          case "green":
            maxGreen = Math.max(value, maxGreen);
            break;
          case "blue":
            maxBlue = Math.max(value, maxBlue);
            break;
        }
      }
    }
    powerSum += maxBlue * maxGreen * maxRed;
  }
  return powerSum;
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

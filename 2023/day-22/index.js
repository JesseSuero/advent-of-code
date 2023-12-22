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

let part1Count = 0,
  part2Count = 0;

function part1(input) {
  let currentShape = 1;
  let shapeList = [];
  let xLength = 0,
    yLength = 0,
    zLength = 0;
  const shapes = input.split("\n").map((line) => {
    let [shapeStart, shapeEnd] = line.split("~").map((coors) => {
      let [x, y, z] = coors.split(",").map(Number);
      xLength = Math.max(x, xLength);
      yLength = Math.max(y, yLength);
      zLength = Math.max(z, zLength);
      return { x, y, z };
    });
    return { shapeName: currentShape++, shapeStart, shapeEnd };
  });

  let space = Array.from({ length: zLength + 1 }, () =>
    Array.from({ length: xLength + 1 }, () =>
      Array.from({ length: yLength + 1 }, () => ".")
    )
  );

  shapes.forEach((shape) => {
    let minX = Math.min(shape.shapeStart.x, shape.shapeEnd.x),
      minY = Math.min(shape.shapeStart.y, shape.shapeEnd.y),
      minZ = Math.min(shape.shapeStart.z, shape.shapeEnd.z),
      maxX = Math.max(shape.shapeStart.x, shape.shapeEnd.x),
      maxY = Math.max(shape.shapeStart.y, shape.shapeEnd.y),
      maxZ = Math.max(shape.shapeStart.z, shape.shapeEnd.z);
    let cubes = [];
    for (let z = minZ; z <= maxZ; z++) {
      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          space[z][x][y] = shape.shapeName;
          cubes.push({ x, y, z });
        }
      }
    }
    shapeList.push({ shapeName: shape.shapeName, cubes });
  });

  for (let x = 0; x < space[0].length; x++) {
    for (let y = 0; y < space[0][0].length; y++) {
      space[0][x][y] = "G";
    }
  }

  shapeList.sort(sortShapes);
  shapeList.forEach((shape) => {
    let canDrop = true;
    while (canDrop) {
      shape.cubes.forEach((cube) => {
        if (
          space[cube.z - 1][cube.x][cube.y] !== "." &&
          space[cube.z - 1][cube.x][cube.y] !== shape.shapeName
        ) {
          canDrop = false;
        }
      });
      if (canDrop) {
        shape.cubes.forEach((cube) => {
          space[cube.z][cube.x][cube.y] = ".";
          cube.z--;
          space[cube.z][cube.x][cube.y] = shape.shapeName;
        });
      }
    }
  });

  let supportingMap = {};
  let supportedByMap = {};
  shapeList.forEach((shape) => {
    supportedByMap[shape.shapeName] = [];
    supportingMap[shape.shapeName] = [];
    shape.cubes.forEach((cube) => {
      if (
        space[cube.z + 1][cube.x][cube.y] !== "." &&
        space[cube.z + 1][cube.x][cube.y] !== shape.shapeName
      ) {
        if (
          !supportingMap[shape.shapeName].includes(
            space[cube.z + 1][cube.x][cube.y]
          )
        ) {
          supportingMap[shape.shapeName].push(
            space[cube.z + 1][cube.x][cube.y]
          );
        }
      }

      if (
        space[cube.z - 1][cube.x][cube.y] !== "." &&
        space[cube.z - 1][cube.x][cube.y] !== shape.shapeName
      ) {
        if (
          !supportedByMap[shape.shapeName].includes(
            space[cube.z - 1][cube.x][cube.y]
          )
        ) {
          supportedByMap[shape.shapeName].push(
            space[cube.z - 1][cube.x][cube.y]
          );
        }
      }
    });
  });

  for (let i = 0; i < shapeList.length; i++) {
    let shape = shapeList[i];
    let currentlySupporting = supportingMap[shape.shapeName];
    let isOtherSupporting = false;
    if (currentlySupporting.length === 0) {
      isOtherSupporting = true;
    }
    if (!isOtherSupporting) {
      for (let k = 0; k < currentlySupporting.length; k++) {
        let supporting = currentlySupporting[k];
        if (supportedByMap[supporting].length > 1) {
          isOtherSupporting = true;
        } else {
          isOtherSupporting = false;
        }
        if (!isOtherSupporting) {
          break;
        }
      }
    }

    if (isOtherSupporting) {
      part1Count++;
    }
  }

  // part 2
  const fallCountMap = {};
  for (let i = shapeList.length - 1; i >= 0; i--) {
    let shape = shapeList[i];
    let shapeName = shape.shapeName;
    fallCountMap[shapeName] = 0;
    let currentlySupporting = supportingMap[shapeName];
    let fellList = [];
    currentlySupporting.forEach((supporting) => {
      if (supportedByMap[supporting].length === 1) {
        fellList.push(supporting);
      }
    });

    for (let j = 0; j < fellList.length; j++) {
      const fell = fellList[j];
      supportingMap[fell].forEach((shapeAbove) => {
        let supportedBy = supportedByMap[shapeAbove];
        let supportsRemaining = supportedBy.filter(function (obj) {
          return fellList.indexOf(obj) == -1;
        });
        if (supportsRemaining.length === 0) {
          if (!fellList.includes(shapeAbove)) {
            fellList.push(shapeAbove);
          }
        }
      });
    }

    part2Count += fellList.length;
  }
}

function sortCubes(a, b) {
  return a.z - b.z;
}

function sortShapes(a, b) {
  return a.cubes[0].z - b.cubes[0].z;
}

const input = getInput(import.meta.url);
let start = performance.now();
part1(input);
const part1Time = performance.now() - start;

console.log(`
Part 1: ${part1Count}
Part 2: ${part2Count}
Time Elapsed (combined): ${msToTime(part1Time)}
`);

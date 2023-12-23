import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

export function getInput(moduleUrl) {
  const __filename = fileURLToPath(moduleUrl);
  const __dirname = dirname(__filename);

  return readFileSync(resolve(__dirname, "./input.txt"), {
    encoding: "utf-8",
  });
}

/**** increasing stack size for long recursion:

  /bin/bash -c "ulimit -s 65500; exec /usr/local/bin/node --stack-size=65500 /path/folder/folder/index.js"     

  Just changed the path to the correct one
*/

// Usage: allEqual([1,2,3,4,5])
export const allEqual = (arr) => arr.every((v) => v === arr[0]);

// Usage: [1,2,3,4,5].reduce(gcd)
export const gcd = (a, b) => (a ? gcd(b % a, a) : b);

// Usage: [1,2,3,4,5].reduce(lcm)
export const lcm = (a, b) => (a * b) / gcd(a, b);

// Usage: mod(5, 10)
export const mod = (n, m) => ((n % m) + m) % m;

export function formatBoard(input, buffer = false, emptyChar = ".") {
  const board = input
    .split("\n")
    .map(function (e) {
      return e.split("");
    })
    .map(function (line) {
      if (buffer) {
        // add outer buffer so I don't have to worry about index out of bounds stuff
        line.unshift(emptyChar);
        line.push(emptyChar);
      }
      return line;
    });
  if (buffer) {
    // add outer buffer so I don't have to worry about index out of bounds stuff
    board.unshift(Array(board[0].length).fill(emptyChar));
    board.push(Array(board[0].length).fill(emptyChar));
  }

  return board;
}

export function split(
  input,
  splitBy = "",
  parseNums = false,
  ignoreEmpty = true
) {
  var result = input.trim().split(splitBy);
  if (ignoreEmpty) {
    result = result.filter(Boolean);
  }

  if (parseNums) {
    result = result.map(Number);
  }
  return result;
}

export class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (!this.items.length) {
      return null;
    }
    return this.items.pop();
  }

  peek() {
    if (!this.items.length) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

export function msToTime(elapsed) {
  elapsed = Math.trunc(elapsed);
  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }

  var ms = elapsed % 1000;
  elapsed = (elapsed - ms) / 1000;
  var secs = elapsed % 60;
  elapsed = (elapsed - secs) / 60;
  var mins = elapsed % 60;
  var hrs = (elapsed - mins) / 60;

  return pad(hrs) + ":" + pad(mins) + ":" + pad(secs) + "." + pad(ms, 3);
}

export function print2dArray(arr) {
  for (var x = 0; x < arr.length; x++) {
    let arrText = "";
    for (var y = 0; y < arr[x].length; y++) {
      arrText += arr[x][y] + " ";
    }
    console.log(arrText);
  }
  console.log("\n\n\n");
}

export function factorial(num) {
  if (num === 0 || num === 1) return 1;
  for (var i = num - 1; i >= 1; i--) {
    num *= i;
  }
  return num;
}

export function combination(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

export const Memoizer = (function () {
  //Private data
  var cache = {};
  //named functions are awesome!
  function cacher(func, getKey) {
    return function () {
      var key = getKey.apply(this, arguments);
      if (key in cache) {
        return cache[key];
      } else {
        // console.log(Object.keys(cache).length + " " + key);
        var val = func.apply(this, arguments);
        cache[key] = val;
        return val;
      }
    };
  }

  //Public data
  return {
    memo: function (func, getKey) {
      if (!getKey) {
        getKey = function () {
          //mini optimization... if only one argument, just return that argument as the key because stringify is slow
          if (arguments.length === 1) {
            return arguments[0];
          } else {
            // return JSON.stringify(arguments);
            const char0 = String.fromCharCode(0);
            let cacheKey = "";
            for (const arg of arguments) {
              const type = typeof arg;

              cacheKey +=
                char0 +
                (arg === null
                  ? "null"
                  : arg === void 0
                  ? "undefined"
                  : type === "function"
                  ? arg
                  : type === "object" && arg.id
                  ? arg.id
                  : type === "object" && arg.hashCode
                  ? arg.hashCode()
                  : type === "object"
                  ? JSON.stringify(arg)
                  : arg);
            }
            return cacheKey;
          }
        };
      }
      return cacher(func, getKey);
    },
  };
})();

export const setCharAt = function (str, index, chr) {
  if (index > str.length - 1 || index < 0) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
};

export function polygonArea(vertices, convertFrom2dArrayToGraph = false) {
  var total = 0;
  let pointOffset = 0;
  for (var i = 0, l = vertices.length; i < l; i++) {
    var addX = vertices[i].x;
    let nextIndex = i == vertices.length - 1 ? 0 : i + 1;
    var addY = vertices[nextIndex].y;
    var subX = vertices[nextIndex].x;
    var subY = vertices[i].y;

    if (convertFrom2dArrayToGraph) {
      pointOffset +=
        (Math.abs(vertices[i].x - vertices[nextIndex].x) +
          Math.abs(vertices[i].y - vertices[nextIndex].y)) *
        0.5;
    }

    total += addX * addY * 0.5;
    total -= subX * subY * 0.5;
  }

  if (convertFrom2dArrayToGraph) {
    pointOffset++;
  }

  return Math.abs(total) + pointOffset;
}

export function polygonAreaFrom2DArray(vertices) {
  return polygonArea(vertices, true);
}

export function polygonAreaFromGraphPoints(vertices) {
  return polygonArea(vertices, false);
}

// function convert2DArrayToGraphPoints(vertices) {
//   let topLeftEdge = { x: 0, y: 0 },
//     topRightEdge = { x: 0, y: 1 },
//     bottomLeftEdge = { x: 1, y: 0 },
//     bottomRightEdge = { x: 1, y: 1 };
//   let newPoints = [];
//   for (let i = 0; i < vertices.length - 1; i++) {
//     let vertix = vertices[i],
//       nextVertix = vertices[i === vertices.length - 1 ? 0 : i + 1];
//     let xDiff = nextVertix.x - vertix.x,
//       yDiff = nextVertix.y - vertix.y;

//     if (xDiff !== 0) {
//       if (xDiff > 0) {
//         //down
//         newPoints.push(topLeftEdge);
//         newPoints.push(topRightEdge);
//       } else {
//         //up
//         newPoints.push(bottomLeftEdge);
//         newPoints.push(bottomRightEdge);
//       }
//     } else if (yDiff !== 0) {
//       if (yDiff > 0) {
//         //right
//         newPoints.push(bottomLeftEdge);
//         newPoints.push(topLeftEdge);
//       } else {
//         //left
//         newPoints.push(topRightEdge);
//         newPoints.push(bottomRightEdge);
//       }
//     }

//     topLeftEdge.x += xDiff;
//     topLeftEdge.y += yDiff;
//     topRightEdge.x += xDiff;
//     topRightEdge.y += yDiff;
//     bottomLeftEdge.x += xDiff;
//     bottomLeftEdge.y += yDiff;
//     bottomRightEdge.x += xDiff;
//     bottomRightEdge.y += yDiff;
//   }
//   return newPoints;
// }

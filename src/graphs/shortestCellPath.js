/*
In a given grid of 0s and 1s, we have some starting row and column sr, sc and a target row and column tr, tc. Return the length of the shortest path from sr, sc to tr, tc that walks along 1 values only.

Each location in the path, including the start and the end, must be a 1. Each subsequent location in the path must be 4-directionally adjacent to the previous location.

It is guaranteed that grid[sr][sc] = grid[tr][tc] = 1, and the starting and target positions are different.

If the task is impossible, return -1.

Examples:

input:
grid = [[1, 1, 1, 1], [0, 0, 0, 1], [1, 1, 1, 1]]

1111
0001
1111

sr = 0, sc = 0, tr = 2, tc = 0
output: 8

grid = [[1, 1, 1, 1], [0, 0, 0, 1], [1, 0, 1, 1]]

1111
0001
1011

sr = 0, sc = 0, tr = 2, tc = 0
output: -1
*/

const WATER = 0;
const LAND = 1;

function shortestCellPath(grid, sr, sc, tr, tc) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const visited = new Set();
  const queue = [[sr, sc, 0]];
  while (queue.length > 0) {
    const [r, c, distance] = queue.shift();
    if (r === tr && c === tc) {
      return distance;
    }

    const k = `${r},${c}`;
    if (
      r < 0 ||
      c < 0 ||
      r >= numRows ||
      c >= numCols ||
      grid[r][c] === WATER ||
      visited.has(k)
    ) {
      continue;
    }

    visited.add(k);
    queue.push(
      [r + 1, c, distance + 1],
      [r - 1, c, distance + 1],
      [r, c + 1, distance + 1],
      [r, c - 1, distance + 1],
    );
  }
  return -1;
}

console.log(
  shortestCellPath(
    [
      [1, 1, 1, 1],
      [0, 0, 0, 1],
      [1, 1, 1, 1],
    ],
    0,
    0,
    2,
    0,
  ),
); // 8

console.log(
  shortestCellPath(
    [
      [1, 1, 1, 1],
      [0, 0, 0, 1],
      [1, 0, 1, 1],
    ],
    0,
    0,
    2,
    0,
  ),
); // -1

console.log(
  shortestCellPath(
    [
      [1, 1, 1, 1],
      [0, 0, 0, 1],
      [1, 0, 1, 1],
    ],
    0,
    0,
    2,
    2,
  ),
); // 6

console.log(
  shortestCellPath(
    [
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 1, 1],
    ],
    0,
    0,
    2,
    0,
  ),
); // 2

function shortestCellPathDFS(grid, sr, sc, tr, tc) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const visited = new Set();
  return (function search(r, c) {
    if (r === tr && c === tc) {
      return 0;
    }

    const k = `${r},${c}`;
    if (
      r < 0 ||
      c < 0 ||
      r >= numRows ||
      c >= numCols ||
      grid[r][c] === WATER ||
      visited.has(k)
    ) {
      return -1;
    }

    visited.add(k);
    let minLength = -1;
    for (const [i, j] of [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ]) {
      const length = 1 + search(i, j);
      if (length === 0) {
        continue;
      }

      if (minLength < 0 || length < minLength) {
        minLength = length;
      }
    }
    return minLength;
  })(sr, sc);
}

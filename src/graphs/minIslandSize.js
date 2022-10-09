const WATER = 0;
const LAND = 1;

function minIslandSize(grid) {
  const visited = new Set();
  let minSize = 0;

  const numRows = grid.length;
  const numCols = grid[0].length;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const size = exploreSize(grid, row, col, visited);
      if (size > 0) {
        minSize = minSize === 0 ? size : Math.min(minSize, size);
      }
    }
  }

  return minSize;
}

function exploreSize(grid, r, c, visited) {
  if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) {
    return 0;
  }

  if (grid[r][c] === WATER) {
    return 0;
  }

  const k = `${r},${c}`;
  if (visited.has(k)) {
    return 0;
  }

  visited.add(k);
  return [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].reduce(
    (sum, [dr, dc]) => sum + exploreSize(grid, r + dr, c + dc, visited),
    1,
  );
}

function sum(nums) {
  return nums.reduce((sum, n) => sum + n, 0);
}

// 0
console.log(
  minIslandSize(
    toGrid([
      // @prettier-ignore
      '000',
      '000',
      '000',
    ]),
  ),
);

// 7
console.log(
  minIslandSize(
    toGrid([
      // @prettier-ignore
      '111',
      '101',
      '110',
    ]),
  ),
);

// 1
console.log(
  minIslandSize(
    toGrid([
      // @prettier-ignore
      '010010',
      '110010',
      '010000',
      '000110',
      '010110',
      '000000',
    ]),
  ),
);

// 3
console.log(
  minIslandSize(
    toGrid([
      // @prettier-ignore
      '010010',
      '110011',
      '010000',
      '000110',
      '000110',
      '000100',
    ]),
  ),
);

// 364
console.log(
  minIslandSize(
    toGrid([
      // @prettier-ignore
      '11111011111111101011',
      '01111111111110111110',
      '10111001101111111111',
      '11110111111111111111',
      '10011111111111111111',
      '10111111011101110111',
      '01111111111101101111',
      '11111111111101111011',
      '11111111110111111111',
      '11111111111111111111',
      '01111111011111111111',
      '11111111111111111111',
      '11111111111111111111',
      '11111011111110111111',
      '10111110111011110111',
      '11111111111101111110',
      '11111111111110111100',
      '11111111111111111111',
      '11111111111111111111',
      '11111111111111111111',
    ]),
  ),
);

function toGrid(rows) {
  return rows.map((row) => row.split('').map((s) => +s));
}

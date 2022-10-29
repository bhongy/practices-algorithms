const WATER = 0;
const LAND = 1;

function minIslandSize(grid) {
  const visited = new Set();
  let minSize = 0;

  const numRows = grid.length;
  const numCols = grid[0].length;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      // const size = exploreSizeDFS(grid, visited, row, col);
      const size = exploreSizeBFS(grid, visited, row, col);
      if (size > 0 && (minSize === 0 || size < minSize)) {
        minSize = size;
      }
    }
  }

  return minSize;
}

function exploreSizeDFS(grid, visited, r, c) {
  const k = `${r},${c}`;
  if (
    r < 0 ||
    c < 0 ||
    r >= grid.length ||
    c >= grid[r].length ||
    grid[r][c] === WATER ||
    visited.has(k)
  ) {
    return 0;
  }

  visited.add(k);
  return [
    [r + 1, c],
    [r - 1, c],
    [r, c + 1],
    [r, c - 1],
  ].reduce((size, [i, j]) => size + exploreSizeDFS(grid, visited, i, j), 1);
}

function exploreSizeBFS(grid, visited, row, col) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  let size = 0;
  const queue = [[row, col]];
  while (queue.length > 0) {
    const [r, c] = queue.shift();
    const k = `${r},${c}`;
    if (
      r >= 0 &&
      c >= 0 &&
      r < numRows &&
      c < numCols &&
      grid[r][c] === LAND &&
      !visited.has(k)
    ) {
      visited.add(k);
      size += 1;
      queue.push([r + 1, c], [r, c + 1], [r - 1, c], [r, c - 1]);
    }
  }
  return size;
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

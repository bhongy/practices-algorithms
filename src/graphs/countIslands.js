const WATER = 0;
const LAND = 1;

function getNumberOfIslands(grid) {
  if (grid.length === 0) {
    return 0;
  }

  const numRows = grid.length;
  const numCols = grid[0].length;

  let numIslands = 0;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (grid[row][col] === LAND) {
        markVisited(grid, row, col);
        numIslands += 1;
      }
    }
  }
  return numIslands;
}

function markVisited(grid, row, column) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const queue = [[row, column]];
  while (queue.length > 0) {
    const [r, c] = queue.shift();
    if (r >= 0 && r < numRows && c >= 0 && c < numCols && grid[r][c] === LAND) {
      grid[r][c] = WATER;
      queue.push([r + 1, c], [r, c + 1], [r - 1, c], [r, c - 1]);
    }
  }
}

// 1 island
console.log(
  getNumberOfIslands(
    toGrid([
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

// 4 islands
console.log(
  getNumberOfIslands(
    toGrid([
      '010010',
      '110010',
      '010000',
      '000110',
      '010110',
      '000000',
    ]),
  ),
);

function toGrid(rows) {
  return rows.map((row) => row.split('').map((s) => +s));
}

// Given m, n representing number of rows and columns of a grid (m x n),
// count the number of ways to travel from the left top corner to
// the bottom right corner of the grid.
//
// Only allow traveling right or down.
// Assume m and n will be integers greater than 0.

// O(2^(m+n)) time
// O(m+n) space
export function bruteForce(m: number, n: number): number {
  if (m === 1 || n === 1) {
    return 1;
  }
  return bruteForce(m - 1, n) + bruteForce(m, n - 1);
}

// O(m*n) time - calculate for each permutation of m,n down to 1,1
// O(m+n) space (memo)
export function topdownMemoized(
  m: number,
  n: number,
  memo: {[k: string]: number} = {},
): number {
  if (m === 1 || n === 1) {
    return 1;
  }

  // gridTravel(m, n) == gridTravel(n, m)
  const k = m < n ? `${m},${n}` : `${n},${m}`;
  if (memo[k] == null) {
    memo[k] = topdownMemoized(m - 1, n, memo) + topdownMemoized(m, n - 1, memo);
  }
  return memo[k];
}

// O(m*n) time
// O(m*n) space (table)
export function bottomUpTable(m: number, n: number): number {
  const table = [
    new Array(n).fill(1), // first row is all 1
  ];

  for (let i = 1; i < m; i++) {
    const prevRow = table[i - 1];
    const row = new Array(n); // pre-allocate to avoid copying array
    row[0] = 1;
    for (let j = 1; j < n; j++) {
      row[j] = j === 0 ? 1 : row[j - 1] + prevRow[j];
    }
    table[i] = row;
  }

  return table[m - 1][n - 1];
}

// optimize space for bottomUpTable, we only need to keep the previous row
// O(m*n) time
// O(n) space
export function bottomUpTablePrevRow(m: number, n: number): number {
  let prevRow = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    const row = new Array(n);
    row[0] = 1;
    for (let j = 1; j < n; j++) {
      row[j] = row[j - 1] + prevRow[j];
    }
    prevRow = row;
  }
  return prevRow[n - 1];

  // alternative, switch between the two arrays
  // to avoid allocating a new array for each row
  // let prev = new Array(n).fill(1);
  // let curr = new Array(n);
  // curr[0] = 1;
  // for (let i = 1; i < m; i++) {
  //   for (let j = 1; j < n; j++) {
  //     curr[j] = curr[j - 1] + prev[j];
  //   }
  //   [prev, curr] = [curr, prev];
  // }
  // return prev[n - 1];
}

/*
  Permutation of identical objects

  Given m, n, the set of moves is the same such as:
    m - 1 -> number of down moves
    n - 1 -> number of right moves

  For example 3x2 grid -> [down, down, right]
                          [down, right, down]
                          [right, down, down]
  which is always 2 downs and 1 right

  So we can simply calculate it as:
    ((m - 1) + (n - 1))! --- number of "slots"
    --------------------
    (m - 1)! * (n - 1)!  --- number of repeating downs and rights

  The problem is, doing this in programming takes some work because
  we can easily get integer overflow when calculating the numerator.
*/

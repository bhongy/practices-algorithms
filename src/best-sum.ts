// Write a function bestSum that takes in a targetSum and an array of numbers
// as arguments.
//
// The function should return an array containing the _shortest_ combination
// of numbers from the array that add up to exactly the targetSum.
//
// If there is a tie for the shortest combination, you may return any one
// of the shortest combinations.

// We cannot return early because we have to explore all possibilities
// to find the best sum (shortest path).

export type Result = number[] | null;

// O(m * n^m) time - remainderCombo(m) * branchingFactor(n) ^ recursiveDepth(m)
// O(m^2) - remainderCombo(m) * recursiveDepth(m)
export function dfs(targetSum: number, xs: number[]): Result {
  if (targetSum === 0) {
    return [];
  }

  if (targetSum < 0) {
    return null;
  }

  let shortestCombination = null;
  for (const x of xs) {
    const remainder = targetSum - x;
    const remainderCombination = dfs(remainder, xs);
    if (remainderCombination !== null) {
      const combination = [...remainderCombination, x];
      if (
        shortestCombination === null ||
        combination.length < shortestCombination.length
      ) {
        shortestCombination = combination;
      }
    }
  }
  return shortestCombination;
}

// O(m^2 * n) time - build memo object: numKeys(m) * numBranches(n) * remainderCombo(m)
//   for each m, we need to branch for each options in xs
//
// O(m^2) - numKeys(m) * remainderCombo(m)
export function dfsMemoized(
  targetSum: number,
  xs: number[],
  memo: {[k: number]: Result} = {},
): Result {
  if (targetSum === 0) {
    return [];
  }

  if (targetSum < 0) {
    return null;
  }

  if (targetSum in memo) {
    return memo[targetSum];
  }

  let shortestCombination = null;
  for (const x of xs) {
    const remainder = targetSum - x;
    const remainderCombination = dfsMemoized(remainder, xs, memo);
    if (remainderCombination !== null) {
      const combination = [...remainderCombination, x];
      if (
        shortestCombination === null ||
        combination.length < shortestCombination.length
      ) {
        shortestCombination = combination;
      }
    }
  }
  memo[targetSum] = shortestCombination;
  return shortestCombination;
}

// Since we try to search for the shortest path, BFS allows us to return
// early for each layer once we find the terminal node (i.e. target === 0).
//
// O(m * n * n^m) time - queue(m) * combinations(n) * branchingFactor(n) ^ recursiveDepth(m)
// ~ O(m * n^m) time
//
// O(m^2 * n) space
export function bfs(targetSum: number, xs: number[]): Result {
  const queue: [number, number[]][] = [[targetSum, []]];
  while (queue.length > 0) {
    const [currentTarget, combinations] = queue.shift() as [number, number[]];
    if (currentTarget === 0) {
      return combinations;
    }
    if (currentTarget < 0) {
      continue;
    }

    // Worst case O(m * n) time, space
    // m is the "size" of targetSum
    // n is xs.length
    for (const x of xs) {
      queue.push([currentTarget - x, [...combinations, x]]);
    }
  }
  return null;
}

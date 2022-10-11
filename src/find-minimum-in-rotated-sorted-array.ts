// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
//
// -5000 <= xs[i] <= 5000
// xs[i] is unique
//
// Need to implement O(n log n) time
export function findMinIndex(xs: number[]): number {
  let lo = 0;
  let hi = xs.length - 1;
  while (lo < hi) {
    // if we have a sorted sub-array, return the index of its first item
    if (xs[lo] < xs[hi]) {
      return lo;
    }

    const m = lo + Math.floor((hi - lo) / 2);
    // `>=` to handle when `lo` and `m` are the same value.
    // This is because we include `m` when searching left.
    if (xs[m] >= xs[lo]) {
      // search right
      lo = m + 1;
    } else {
      // search left
      hi = m;
    }
  }
  return lo;
}

// xs.length > 0
export function findMin(xs: number[]): number {
  const i = findMinIndex(xs);
  return xs[i];
}

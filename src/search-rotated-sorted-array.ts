// https://leetcode.com/problems/search-in-rotated-sorted-array/

export function search(nums: number[], target: number): number {
  const offset = findOffset(nums);
  const n = nums.length;
  const reindex = (i: number): number => (i + offset) % n;

  let lo = 0;
  let hi = n - 1;
  // need to check <= instead of < when we have one element left (lo == hi)
  while (lo <= hi) {
    const m = lo + Math.floor((hi - lo) / 2);
    const i = reindex(m);
    const v = nums[i];
    if (v === target) {
      return i;
    }
    if (target < v) {
      // search left
      hi = m - 1;
    } else {
      // search right
      lo = m + 1;
    }
  }
  return -1;
}

// O(log n) time - binary search
// O(1) space
export function findOffset(nums: number[]): number {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    // sub-array is sorted
    if (nums[lo] < nums[hi]) {
      return lo;
    }

    const m = lo + Math.floor((hi - lo) / 2);
    // think: [3, 4, 5, 1, 2]
    //         lo    m
    // i.e. mid is in the left sorted sub-array
    // so we want to search the offset on the right side
    if (nums[m] >= nums[lo]) {
      lo = m + 1; // search right
    } else {
      hi = m; // search left
    }
  }
  return lo;
}

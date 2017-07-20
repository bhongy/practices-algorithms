/*
  Given an array `nums`, write a function to move all `0`'s to the end of it
  while maintaining the relative order of the non-zero elements.

  For example, given `nums = [0, 1, 0, 3, 12]`, after calling your function,
  `nums` should be `[1, 3, 12, 0, 0]`.

  Must do this in-place without making a copy of the array. O(1) space.
  Minimize the total number of operations.

  https://leetcode.com/problems/move-zeroes

  @flow
*/

// mutate the `nums` array, do not return anything
// O(n) time, O(1) space
// my solution is probably the worst (complex) of these three solutions. :'(
function mySolution(nums: Array<number>): void {
  let zeroCount: number = 0;

  for (let i = 0; i < nums.length; i++) {
    // look ahead whether the next item to replace `nums[i + zeroCount]` is zero
    // if so, look at the one after that if it is zero too (and so on)
    while (nums[i + zeroCount] === 0) {
      zeroCount++;
    }

    // populate the end of the array with `0`s
    // comes after zeroCount loop to address trailing zeros
    if (i >= nums.length - zeroCount) {
      nums[i] = 0;
      continue;
    }

    if (zeroCount > 0) {
      nums[i] = nums[i + zeroCount];
    }
  }
}

// https://discuss.leetcode.com/topic/24716/simple-o-n-java-solution-using-insert-index
// similar to the way I thought in my solution but way more elegant, simpler
function insertMethod(nums: Array<number>): void {
  let insertPosition = 0;

  // iterate through all items in the array
  // move non-zero values to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPosition] = nums[i];
      insertPosition++;
    }
  }

  // fill the rest with `0`s
  while (insertPosition < nums.length) {
    nums[insertPosition] = 0;
    insertPosition++;
  }
}

// Move through the list by "compresing" all non-zero values
// to the front any time it encounters one by swapping with zero
// https://discuss.leetcode.com/topic/29902/1ms-java-solution
function swapMethod(nums: Array<number>): void {
  // `i` (value runner) run ahead of `j`
  // `j` is the next position to put a non-zero value in
  // where the next non-zero will go to
  let nextNonZeroPosition = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      // temp can or cannot be `0` - it does not matter
      let temp = nums[nextNonZeroPosition];
      // due to the loop condition, `nums[i]` is non-zero
      nums[nextNonZeroPosition] = nums[i];
      nums[i] = temp;

      nextNonZeroPosition++;
    }
  }
}

export default [mySolution, insertMethod, swapMethod];

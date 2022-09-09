/*
  Given a sorted array, remove the duplicates in place
  such that each element appear only once and return the new length.
  Do not create new array. Must mutate the original to achieve O(1) space.
  https://leetcode.com/articles/remove-duplicates-sorted-array/
*/

function bruteForce(nums: Array<number>): number {
  let currentIndex = 0;
  let length = nums.length;
  let previousValue: number | undefined;

  while (currentIndex < length) {
    const currentValue = nums[currentIndex];

    if (currentValue === previousValue) {
      // then modify
      nums.splice(currentIndex, 1);
      length = nums.length; // update with the mutated array's length
    } else {
      // then keep going
      previousValue = currentValue;
      currentIndex += 1;
    }
  }

  return length;
}

function twoPointersShiftUniquesToFront(xs: number[]): number {
  const n = xs.length;
  if (n <= 0) {
    return 0;
  }

  let previous = xs[0];
  let write = 1;
  for (let read = 1; read < n; read++) {
    const current = xs[read];
    if (xs[read] !== previous) {
      xs[write] = current;
      previous = current;
      write += 1;
    }
  }

  // trim original to the length that contains unique (written)
  xs.length = write;
  return write;
}

export default [bruteForce, twoPointersShiftUniquesToFront];

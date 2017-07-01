// @flow

/*
  Given a sorted array, remove the duplicates in place
  such that each element appear only once and return the new length.
  Do not create new array. Must mutate the original to achieve O(1) space.
  https://leetcode.com/articles/remove-duplicates-sorted-array/
*/

function bruteForce(nums: Array<number>): number {
  let currentIndex = 0;
  let length = nums.length;
  let previousValue: number;

  while (currentIndex < length) {
    const currentValue = nums[currentIndex];

    if (currentValue === previousValue) {
      // then modify
      nums.splice(currentIndex, 1);
      length = nums.length; // update with the mutated array's length
    } else {
      // then keep going
      previousValue = currentValue;
      currentIndex++;
    }
  }

  return length;
}

export default [bruteForce];

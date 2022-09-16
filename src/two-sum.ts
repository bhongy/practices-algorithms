/*
  Given an array of integers, return indices of the two numbers
  such that they add up to a specific target.
  https://leetcode.com/problems/two-sum
*/

type Result = [number, number] | [];

function bruteForce(nums: Array<number>, target: number): Result {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  return [];
}

function twoPassImperative(nums: Array<number>, target: number): Result {
  const m = new Map<number, number>();

  // add element's value and its index to the map
  for (let i = 0; i < nums.length; i++) {
    m.set(nums[i], i);
  }

  // check the match
  for (let i = 0; i < nums.length; i++) {
    const complement = m.get(target - nums[i]);
    if (complement != null) {
      return [i, complement];
    }
  }

  return [];
}

function twoPassFunctional(nums: Array<number>, target: number): Result {
  // I generally prefer functional methods over adhoc iteration algorithm
  // it's not as efficient but it's more expressive
  // and abstracted the "looping" from the actual algorithm (less chance for bug)
  // on client-side, the performance difference between
  // Array.prototype.reduce vs the for loop is very unlikely
  // to be the bottleneck in most situations

  const m = nums.reduce(
    (acc, value, index) => acc.set(value, index),
    new Map<number, number>(),
  );

  // check the match
  for (let i = 0; i < nums.length; i++) {
    const complement = m.get(target - nums[i]);
    if (complement != null) {
      return [i, complement];
    }
  }

  return [];
}

function onePass(nums: Array<number>, target: number): Result {
  const m = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const complement = m.get(target - current);
    if (complement != null) {
      // look back to find the complement of `nums[i]` in each iteration
      // hence `i` is more than the index of `complement`
      // return this way to order by the lower index first
      return [complement, i];
    }

    m.set(current, i);
  }

  return [];
}

export default [bruteForce, twoPassImperative, twoPassFunctional, onePass];

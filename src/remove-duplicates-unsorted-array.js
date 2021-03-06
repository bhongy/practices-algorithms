// @flow

/*
  Remove duplicates from an unsorted array (returning a new array).
  Keep space complexity to O(n).
  http://khan4019.github.io/front-end-Interview-Questions/js1.html#removeDuplicate
*/

function bruteForceImperative(nums: Array<number>): Array<number> {
  const includes: Map<number, boolean> = new Map();
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    const currentValue = nums[i];

    if (!includes.has(currentValue)) {
      includes.set(currentValue, true);
      result.push(currentValue);
    }
  }

  return result;
}

function bruteForceFunctional(nums: Array<number>): Array<number> {
  const includes: Map<number, boolean> = new Map();

  return nums.reduce((acc, value) => {
    if (!includes.has(value)) {
      includes.set(value, true);
      acc.push(value);
    }

    return acc;
  }, []);
}

function bruteForceFunctionalAvoidMap(nums: Array<number>): Array<number> {
  // Actually, prefer to use Map rather than object literal
  // because object keys can only be strings or symbols
  // hence they are stringified which makes "typing" them misleading
  // Map's keys can be any types - even objects, arrays, functions
  const includes: { [value: number]: boolean } = {};

  return nums.reduce((acc, value) => {
    if (!includes[value]) {
      includes[value] = true;
      acc.push(value);
    }

    return acc;
  }, []);
}

// avoid using Array.prototype methods and mutate original array
// disable eslint rule because this is intended to mutate the input
/* eslint-disable no-param-reassign */
function bruteForceMutateInput<T: number[]>(nums: T): T {
  const includes: Map<number, boolean> = new Map();

  let iterator = 0;
  let assigner = 0;

  while (iterator < nums.length) {
    const value = nums[iterator];

    if (!includes.has(value)) {
      if (assigner !== iterator) {
        nums[assigner] = nums[iterator];
      }

      includes.set(value, true);
      assigner += 1;
    }

    iterator += 1;
  }

  nums.length = assigner;

  return nums;
}

export default [
  bruteForceImperative,
  bruteForceFunctional,
  bruteForceFunctionalAvoidMap,
  bruteForceMutateInput,
];

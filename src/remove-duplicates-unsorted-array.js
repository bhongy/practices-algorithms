// @flow

/*
  Remove duplicates from an unsorted array (returning a new array).
  Keep space complexity to O(n).
  http://khan4019.github.io/front-end-Interview-Questions/js1.html#removeDuplicate
*/

function bruteForceImperative(nums: Array<number>): Array<number> {
  const included = new Map();
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    const currentValue = nums[i];

    if (!included.has(currentValue)) {
      included.set(currentValue, true);
      result.push(currentValue);
    }
  }

  return result;
}

function bruteForceFunctional(nums: Array<number>): Array<number> {
  const includes = new Map();

  return nums.reduce((acc, value) => {
    if (!includes.has(value)) {
      includes.set(value, true);
      acc.push(value);
    }

    return acc;
  }, []);
}

function bruteForceFunctionalAvoidMap(nums: Array<number>): Array<number> {
  const includes = {};

  return nums.reduce((acc, value) => {
    if (!includes[value]) {
      includes[value] = true;
      acc.push(value);
    }
    return acc;
  }, []);
}

export default [
  bruteForceImperative,
  bruteForceFunctional,
  bruteForceFunctionalAvoidMap,
];

// @flow

import twoSumVersions from './two-sum';

describe('Two Sum', () => {
  const nums = [2, 7, 11, 15];

  twoSumVersions.forEach((twoSum) => {
    describe(`... ${twoSum.name}`, () => {
      it('should return an empty array when there is no solution.', () => {
        expect(twoSum(nums, 8)).toEqual([]);
        expect(twoSum(nums, 16)).toEqual([]);
      });

      it('should return an array containing pair of indices of the solution.', () => {
        expect(twoSum(nums, 13)).toEqual([0, 2]);
        expect(twoSum(nums, 17)).toEqual([0, 3]);
        expect(twoSum(nums, 18)).toEqual([1, 2]);
      });
    });
  });
});

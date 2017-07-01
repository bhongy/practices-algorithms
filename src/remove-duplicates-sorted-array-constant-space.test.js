// @flow

import removeDuplicatesVersions
  from './remove-duplicates-sorted-array-constant-space';

describe('Remove Duplicates from Sorted Array', () => {
  removeDuplicatesVersions.forEach(removeDuplicates => {
    describe(`... ${removeDuplicates.name}`, () => {
      it('should de-duped the original array (mutate)', () => {
        [
          [[], []],
          [[1, 38, 999], [1, 38, 999]],
          [[2, 3, 3, 3, 7], [2, 3, 7]],
        ].forEach(([input, result]) => {
          const originalInput = input;

          removeDuplicates(input);

          expect(input).toBe(originalInput); // mutate array
          expect(input).toEqual(result);
        });
      });

      it('should return the length of the de-duped array', () => {
        [
          [[], 0],
          [[-1, 1, 30, 60483483], 4],
          [[-2, -2, -2, 30, 31], 3],
        ].forEach(([input, expectedLength]) => {
          expect(removeDuplicates(input)).toBe(expectedLength);
        });
      });
    });
  });
});

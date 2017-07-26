// @flow

import removeDuplicatesVersions from './remove-duplicates-unsorted-array';

describe('Remove Duplicates from Unsorted Array', () => {
  removeDuplicatesVersions.forEach((removeDuplicates) => {
    describe(`... ${removeDuplicates.name}`, () => {
      it('should remove duplicate values', () => {
        [
          {
            input: [],
            expected: [],
          },
          {
            input: [3, 52, 1],
            expected: [3, 52, 1],
          },
          {
            input: [25, 25, 25, 25],
            expected: [25],
          },
          {
            input: [19, 3, 3, 3, 5, 11, 9, 20, 19, 3],
            expected: [19, 3, 5, 11, 9, 20],
          },
        ].forEach(({ input, expected }) => {
          expect(removeDuplicates(input)).toEqual(expected);
        });
      });
    });
  });
});

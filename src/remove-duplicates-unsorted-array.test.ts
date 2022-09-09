import removeDuplicatesVersions from './remove-duplicates-unsorted-array';

describe('Remove Duplicates from Unsorted Array', () => {
  removeDuplicatesVersions.forEach((removeDuplicates) => {
    describe(`... ${removeDuplicates.name}`, () => {
      it('should remove duplicate values', () => {
        [
          [[], []],
          [
            [3, 52, 1],
            [3, 52, 1],
          ],
          [[25, 25, 25, 25], [25]],
          [
            [19, 3, 3, 3, 5, 11, 9, 20, 19, 3],
            [19, 3, 5, 11, 9, 20],
          ],
        ].forEach(([input, expected]) => {
          expect(removeDuplicates(input)).toEqual(expected);
        });
      });
    });
  });
});

// @flow

import versions from './move-zeroes-in-array';

describe('Move Zeroes', () => {
  versions.forEach(moveZeroes => {
    describe(`${moveZeroes.name}`, () => {
      it('should mutate the input rather than creating a new array', () => {
        const input = [0, 1];

        moveZeroes(input);
        expect(input).toEqual([1, 0]);
      });

      // TODO: write more granular tests (it does cover but not lists out separately)
      //   1) it should handle leading zero
      //   2) it should handle trailing zero
      //   3) it should handle multiple adjacent zeroes
      it('should move all zeroes to the end of the array', () => {
        [
          [
            [0, 0, 84, 0, 0, -42, 1, 93040, 0, 0],
            [84, -42, 1, 93040, 0, 0, 0, 0, 0, 0],
          ],
          [[0, 1, 0, 3, 12], [1, 3, 12, 0, 0]],
          [[1, 2, 3], [1, 2, 3]],
        ].forEach(([input, expected]) => {
          moveZeroes(input);
          expect(input).toEqual(expected);
        });
      });
    });
  });
});

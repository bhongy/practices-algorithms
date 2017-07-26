// @flow

import versions from './check-prime';

describe('Check Prime', () => {
  versions.forEach((checkPrime) => {
    describe(`... ${checkPrime.name}`, () => {
      it('should return `true` if the input is a prime number.', () => {
        [2, 3, 5, 7, 11, 13, 29, 53, 113, 659, 17389, 128521].forEach((input) => {
          expect(checkPrime(input)).toBe(true);
        });
      });

      it('should return `false` if the input is not a prime number.', () => {
        [-2, 1, 4, 6, 8, 9, 10, 12, 25, 303, 128513].forEach((input) => {
          expect(checkPrime(input)).toBe(false);
        });
      });
    });
  });
});

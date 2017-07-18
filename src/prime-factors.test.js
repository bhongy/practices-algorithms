// @flow

import getPrimeFactors from './prime-factors';

describe('Prime Factors', () => {
  it('should return an empty array for any numbers less than 2', () => {
    [-13, -2, 0, 1].forEach(input => {
      expect(getPrimeFactors(input)).toEqual([]);
    });
  });

  it('should return an array of all prime factors of a number', () => {
    [
      [2, [2]],
      [3, [3]],
      [13, [13]],
      [69, [3, 23]],
      [73, [73]],
      [74, [2, 37]],
      [92, [2, 2, 23]],
      [140, [2, 2, 5, 7]],
      [167, [167]],
      [209, [11, 19]],
      [210, [2, 3, 5, 7]],
    ].forEach(([input, expected]) => {
      expect(getPrimeFactors(input)).toEqual(expected);
    });
  });
});

import findGreatestCommonDivisor from './greatest-common-divisor';

describe('Greatest Common Divisor', () => {
  [
    [2, 2, 2],
    [3, 24, 3],
    [54, 24, 6],
    [13, 113, 1],
    [15, 175, 5],
    [48, 180, 12],
    [144, 270, 18],
  ].forEach(([a, b, expected]) => {
    it(`should return the correct greatest common divisor for: ${a}, ${b}`, () => {
      expect(findGreatestCommonDivisor(a, b)).toBe(expected);
    });
  });
});

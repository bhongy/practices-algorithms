// @flow

import versions from './fibonacci';

describe('Fibonacci', () => {
  versions.forEach(fibonacci => {
    describe(`${fibonacci.name}`, () => {
      [
        [0, 0],
        [1, 1],
        [2, 1],
        [5, 5],
        [10, 55],
        [17, 1597],
      ].forEach(([input, expected]) => {
        it(`should return the correct fibonacci number for n: ${input}`, () => {
          expect(fibonacci(input)).toBe(expected);
        });
      });
    });
  });
});

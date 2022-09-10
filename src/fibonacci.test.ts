import versions from './fibonacci';

describe('Fibonacci', () => {
  versions.forEach((fibonacci) => {
    describe(`${fibonacci.name}`, () => {
      [
        [0, 0],
        [1, 1],
        [2, 1],
        [5, 5],
        [10, 55],
        [17, 1597],
      ].forEach(([n, expected]) => {
        it(`fib(${n}) = ${expected}`, () => {
          expect(fibonacci(n)).toBe(expected);
        });
      });
    });
  });
});

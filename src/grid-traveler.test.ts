import {
  bruteForce,
  topdownMemoized,
  bottomUpTable,
  bottomUpTablePrevRow,
} from './grid-traveler';

describe('grid traveler', () => {
  [bruteForce, topdownMemoized, bottomUpTable, bottomUpTablePrevRow].forEach(
    (fn) => {
      test(fn.name, () => {
        const tcs: [number, number, number][] = [
          [1, 1, 1],
          [1, 2, 1],
          [2, 1, 1],
          [2, 2, 2],
          [3, 2, 3],
          [2, 3, 3],
          [3, 3, 6],
          [3, 4, 10],
          [4, 3, 10],
          [8, 2, 8],
          [8, 12, 31824],
        ];

        tcs.forEach(([m, n, expected]) => {
          expect(fn(m, n)).toBe(expected);
        });
      });
    },
  );
});

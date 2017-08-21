// @flow

import merge from './merge-two-sorted-arrays';

describe('Merge Two Sorted Arrays', () => {
  it('should return the merged array with all elements sorted', () => {
    [
      [[], [], []],
      [[1], [2], [1, 2]],
      [[2], [1], [1, 2]],
      [[2, 5, 9], [], [2, 5, 9]],
      [[], [3, 12, 29, 101], [3, 12, 29, 101]],
      [[2, 9], [1, 2, 3, 5, 6, 29], [1, 2, 2, 3, 5, 6, 9, 29]],
      [
        [-208, 39, 88, 229, 267, 429],
        [-1, 0, 33, 89, 267, 346],
        [-208, -1, 0, 33, 39, 88, 89, 229, 267, 267, 346, 429],
      ],
    ].forEach(([a, b, expected]) => {
      expect(merge(a, b)).toEqual(expected);
    });
  });
});

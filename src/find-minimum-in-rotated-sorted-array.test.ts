import {findMinIndex, findMin} from './find-minimum-in-rotated-sorted-array';

describe('findMinIndex', () => {
  test.each([
    [[], 0],
    [[0, 1, 2, 3, 4], 0],
    [[3, 4, 5, 1, 2], 3],
    [[4, 5, 1, 2, 3], 2],
    [[-1, 0, 3, 5, 9, 12], 0],
    [[12, -1, 0, 3, 5, 9], 1],
    [[0, 3, 5, 9, 12, -1], 5],
    [[4, 5, 6, 7, 0, 1, 2], 4],
    [[4, 5, 6, 7, 0, 1, 2, 3], 4],
  ])('%p', (xs, expected) => {
    expect(findMinIndex(xs)).toBe(expected);
  });
});

describe('findMin', () => {
  test.each([
    [[0, 1, 2, 3, 4], 0],
    [[3, 4, 5, 1, 2], 1],
    [[4, 5, 1, 2, 3], 1],
    [[-1, 0, 3, 5, 9, 12], -1],
    [[12, -1, 0, 3, 5, 9], -1],
    [[0, 3, 5, 9, 12, -1], -1],
    [[4, 5, 6, 7, 0, 1, 2], 0],
    [[4, 5, 6, 7, 0, 1, 2, 3], 0],
  ])('%p', (xs, expected) => {
    expect(findMin(xs)).toBe(expected);
  });
});

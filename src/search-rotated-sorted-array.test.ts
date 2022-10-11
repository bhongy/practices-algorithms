import {search, findOffset} from './search-rotated-sorted-array';

describe('search-rotated-sorted-array', () => {
  test('search', () => {
    const tcs: [number[], number, number][] = [
      // [[], 0, -1],
      // [[1], 1, 0],
      [[3, 5, 1], 5, 1],
      // [[4, 5, 6, 7, 0, 1, 2], 0, 4],
      // [[4, 5, 6, 7, 0, 1, 2], 3, -1],
    ];

    tcs.forEach(([nums, target, expected]) => {
      expect(search(nums, target)).toBe(expected);
    });
  });

  test('findOffset', () => {
    const tcs: [number[], number][] = [
      [[], 0],
      [[1], 0],
      [[3, 5, 1], 2],
      [[0, 1, 2, 3, 4], 0],
      [[3, 4, 5, 1, 2], 3],
      [[4, 5, 1, 2, 3], 2],
      [[-1, 0, 3, 5, 9, 12], 0],
      [[12, -1, 0, 3, 5, 9], 1],
      [[0, 3, 5, 9, 12, -1], 5],
      [[4, 5, 6, 7, 0, 1, 2], 4],
      [[4, 5, 6, 7, 0, 1, 2, 3], 4],
    ];

    tcs.forEach(([nums, expected]) => {
      expect(findOffset(nums)).toBe(expected);
    });
  });
});

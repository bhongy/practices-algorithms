import {twoArrays, spaceOptimized} from './product-of-array-except-self';

[twoArrays, spaceOptimized].forEach((fn) => {
  test(fn.name, () => {
    const tcs: [number[], number[]][] = [
      [
        [1, 2, 3, 4],
        [6, 8, 12, 24],
      ],
      [
        [1, 2, 3, 4, 5],
        [24, 30, 40, 60, 120],
      ],
      [
        [10, 3, 5],
        [15, 30, 50],
      ],
      [
        [10, 3, 5, 6, 2],
        [180, 600, 360, 300, 900],
      ],
      [
        [-1, 1, 0, -3, 3],
        [0, 0, 9, 0, 0],
      ],
    ];

    tcs.forEach(([input, products]) => {
      expect(fn(input)).toEqual(expect.arrayContaining(products));
    });
  });
});

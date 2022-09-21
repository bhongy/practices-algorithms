import {bruteForce, minimizeBuy} from './best-time-to-buy-and-sell-stock';

[bruteForce, minimizeBuy].forEach((fn) => {
  test(fn.name, () => {
    const tcs: [number[], number][] = [
      [[], 0],
      [[7], 0],
      [[7, 1, 5, 6, 4], 5],
    ];

    tcs.forEach(([prices, maxProfit]) => {
      expect(fn(prices)).toEqual(maxProfit);
    });
  });
});

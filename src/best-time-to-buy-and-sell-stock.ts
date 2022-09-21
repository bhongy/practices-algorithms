// Two loops keep comparing every pair
// Keep "best so far"
// we have to run through O(n^2) time (always)
// O(1) space
export function bruteForce(prices: number[]): number {
  const n = prices.length;
  let maxProfit = 0;
  for (let i = 0; i < n - 1; i++) {
    const boughtAt = prices[i];
    for (let j = i + 1; j < n; j++) {
      const profit = prices[j] - boughtAt;
      if (profit > maxProfit) {
        maxProfit = profit;
      }
    }
  }
  return maxProfit;
}

// Sweep from left to right once O(n)
// Find the lowest price so far (buy)
// Find the best profit so far
// If encounter better price to buy - update
// Find if we can find a better profit after that point
//
// O(n) time
// O(1) space
export function minimizeBuy(prices: number[]): number {
  const n = prices.length;
  let buy = prices[0];
  let maxProfit = 0;
  for (let i = 1; i < n; i++) {
    // look for a dip
    const current = prices[i];
    if (buy > current) {
      buy = current;
    }
    // can we find a higher profit
    const profit = current - buy;
    if (profit > maxProfit) {
      maxProfit = profit;
    }
  }
  return maxProfit;
}

// Similar to the previous one: find the lowest buying point
// and keep checking max profit after that point. Use j pointer as a runner.
//
// Think of it as the right pointer (j) is sweeping and checking max profit
// and we move the left pointer (i) to j when we find a lower price than
// the previously "bought" one.
//
// [_, _, _, ... ]
//  i  j
//
// j is always at the right side of i
//
// O(n) time
// O(1) space
export function twoPointers(prices: number[]): number {
  const n = prices.length;
  let maxProfit = 0;
  let i = 0; // buy
  for (let j = 1; j < n; j++) {
    if (prices[i] < prices[j]) {
      const profit = prices[j] - prices[i];
      maxProfit = Math.max(maxProfit, profit);
    } else {
      i = j;
    }
  }
  return maxProfit;
}

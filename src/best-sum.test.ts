import {dfs, bfs, dfsMemoized, type Result} from './best-sum';

interface TestCase {
  targetSum: number;
  xs: number[];
  expected: number[] | null;
}

function expectResult({expected}: TestCase, result: Result): void {
  if (expected === null) {
    expect(result).toBeNull();
  } else {
    expect(result).toEqual(expect.arrayContaining(expected));
  }
}

const testCases: TestCase[] = [
  {targetSum: 2, xs: [1, 2], expected: [2]},
  {targetSum: 7, xs: [2, 3], expected: [2, 2, 3]},
  {targetSum: 7, xs: [5, 3, 4, 7], expected: [7]},
  {targetSum: 7, xs: [2, 4], expected: null},
  {targetSum: 8, xs: [2, 5, 3], expected: [3, 5]},
];

[dfs, bfs].forEach((bestSum) => {
  test(bestSum.name, () => {
    testCases.forEach((tc) => {
      expectResult(tc, bestSum(tc.targetSum, tc.xs));
    });
  });
});

[dfsMemoized].forEach((bestSum) => {
  test(bestSum.name, () => {
    [
      ...testCases,
      {targetSum: 100, xs: [1, 2, 5, 25], expected: [25, 25, 25, 25]},
      {targetSum: 100, xs: [7, 14, 100], expected: [100]},
      {targetSum: 300, xs: [7, 14], expected: null},
    ].forEach((tc) => {
      expectResult(tc, bestSum(tc.targetSum, tc.xs));
    });
  });
});

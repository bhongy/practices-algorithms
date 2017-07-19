/*
  Given an integer `n`. Return the fibonacci number of `n`.
  Assume `n` starts at 0.
  Do not need to handle edge-cases like NaN, Infinity, etc.

  http://www.geeksforgeeks.org/program-for-nth-fibonacci-number/

  @flow
*/

// O(n) time, O(n) space
function dynamicProgrammingFibonacci(n: number): number {
  // if (n < 0) {
  //   throw new Error(
  //     `Invalid argument n -> ${n} provided. Input must be a positive integer including 0.`
  //   );
  // }

  // use multiple variables and store only last two
  // to achieve O(1) space - but this is easier to understand
  const result = [0, 1];

  for (let i = 2; i <= n; i++) {
    result[i] = result[i - 2] + result[i - 1];
  }

  return result[n];
}

// O(2^n) time - binary tree with depth `n`
function recursiveFibonacci(n: number): number {
  if (n < 2) {
    return n;
  }

  return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
}

// O(log n) time - just re-implement the last solution from:
// http://www.geeksforgeeks.org/program-for-nth-fibonacci-number/
function chiragAgarwalFibonacci(n: number): number {
  const fib = chiragAgarwalFibonacci; // alias function name for recursive calls
  const result = [0, 1];

  // special case, need to return early
  // because the algorithm below does not work for n: 0 or n: 1
  if (n < 2) {
    return result[n];
  }

  const isEven = (v: number) => v % 2 === 0;
  const k = isEven(n) ? n / 2 : (n + 1) / 2;

  result[n] = isEven(n)
    ? (2 * fib(k - 1) + fib(k)) * fib(k)
    : fib(k) * fib(k) + fib(k - 1) * fib(k - 1);

  return result[n];
}

export default [
  dynamicProgrammingFibonacci,
  recursiveFibonacci,
  chiragAgarwalFibonacci,
];

/*
  Given an integer `n`. Return the fibonacci number of `n`.
  Assume `n` starts at 0.
  Do not need to handle edge-cases like NaN, Infinity, etc.

  http://www.geeksforgeeks.org/program-for-nth-fibonacci-number/
*/

// Bottom-up, calculate fib(0) up to fib(n)
// O(n) time, O(n) space
function dynamicProgrammingFibonacci(n: number): number {
  // if (n < 0) {
  //   throw new Error(
  //     `Invalid number ${n}. Input must be a positive integer including 0.`
  //   );
  // }

  const result = [0, 1];

  for (let i = 2; i <= n; i++) {
    result[i] = result[i - 2] + result[i - 1];
  }

  return result[n];
}

// optimize space: store only the last two numbers instead of the whole array
// http://introcs.cs.princeton.edu/java/13flow/Fibonacci.java.html
// O(n) time, O(1) space
function dynamicProgrammingOptimizedSpaceFibonacci(n: number): number {
  if (n < 2) {
    return n;
  }

  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b]; // swap "pointers" for the next loop
  }
  return b;
}

function dynamicProgrammingOptimizedSpaceFibonacci2(n: number): number {
  let current = 0;
  let next = 1;
  for (let i = 0; i < n; i++) {
    [current, next] = [next, next + current];
  }
  return current;
}

// O(log n) time, O(n) space - just re-implement the last solution from:
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

// Naive, most straight-forward implementation.
// O(2^n) time - binary tree with depth `n`
function recursiveFibonacci(n: number): number {
  if (n < 2) {
    return n;
  }

  return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
}

// O(n) time
// O(n) space (memo + call stack)
function recursiveTopDownWithMemo(
  n: number,
  memo: {[n: number]: number} = {0: 0, 1: 1, 2: 1},
): number {
  const fib = recursiveTopDownWithMemo; // alias function name so it's not confusing to read
  if (memo[n] == null) {
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  }
  return memo[n];
}

export default [
  dynamicProgrammingFibonacci,
  dynamicProgrammingOptimizedSpaceFibonacci,
  dynamicProgrammingOptimizedSpaceFibonacci2,
  chiragAgarwalFibonacci,
  recursiveFibonacci,
  recursiveTopDownWithMemo,
];

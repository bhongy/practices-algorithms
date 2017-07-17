/*
  Check if a number is a prime number. Assume inputs are integer (including negative).

  http://khan4019.github.io/front-end-Interview-Questions/js1.html#isPrime
*/


function bruteForce(input: number): boolean {
  if (input < 2) {
    return false;
  }

  for (let divisor = 2; divisor < input; divisor++) {
    if (input % divisor === 0) {
      return false;
    }
  }

  return true;
}

function bruteForceIncrementTwo(input: number): boolean {
  if (input < 2) {
    return false;
  }

  // return `false` for all even numbers except 2 (exit early)
  if (input % 2 === 0) {
    return input === 2;
  }

  // after 2, we know that no other even numbers are prime
  // so that we can increment 2 at a time (3, 5, 7, 9, ..., 2n + 1)
  // and we know that we need to check up to half of the input value
  for (let divisor = 3; divisor < input / 2; divisor += 2) {
    if (input % divisor === 0) {
      return false;
    }
  }

  return true;
}

function squareRootMethod(input: number): boolean {
  if (input < 2) {
    return false;
  }

  // return `false` for all even numbers except 2 (exit early)
  if (input % 2 === 0) {
    return input === 2;
  }

  for (let divisor = 3; divisor * divisor <= input; divisor += 2) {
    if (input % divisor === 0) {
      return false;
    }
  }

  return true;
}

export default [
  bruteForce,
  bruteForceIncrementTwo,
  squareRootMethod,
];

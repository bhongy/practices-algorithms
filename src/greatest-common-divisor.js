/*
  Given two numbers (a, b) that are greater than or equal to 2.
  Return their greatest common divisor.

  @flow
*/

// O(n) time where n is the higher value between a, b
// O(1) space
function findGreatestCommonDivisor(a: number, b: number): number {
  let divisor = 2;
  let greatestCommonDivisor = 1;

  for (let divisor = 2; a >= divisor && b >= divisor; divisor++) {
    if (a % divisor === 0 && b % divisor === 0) {
      greatestCommonDivisor = divisor;
    }
  }

  return greatestCommonDivisor;
}

export default findGreatestCommonDivisor;

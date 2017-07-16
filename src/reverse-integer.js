/*
  Reverse digits of an interger such as 123 becomes 321 or -123 becomes -321.

  The input is assumed to be a 32-bit signed integer.
  Return 0 when the reversed integer overflows.

  https://leetcode.com/problems/reverse-integer

  @flow
*/

// leetcode problem asserts againsts 32-bit signed integer
export const MIN_INTEGER = -Math.pow(2, 31);
export const MAX_INTEGER = Math.pow(2, 31) - 1;

// did not come up with the solution myself
// solution heavily inspired by:
// https://discuss.leetcode.com/topic/6104/my-accepted-15-lines-of-code-for-java/2
function reverse(value: number) {
  let result = 0;

  // go through each digit from the back
  while (value !== 0) {
    // get the last digit, `parseInt` to avoid Javascript integer gotcha
    let tail = parseInt(value % 10, 10);
    // move pointer of the digit to process (next)
    // `parseInt` to drop decimals so we can compare with 0
    value = parseInt(value / 10, 10);
    // update new integer result:
    //   move previous result 1 digit and the current digit
    //   and append the "processing" digit to the result
    //   e.g. result: 12, tail: 3 -> newResult: 123
    let newResult = result * 10 + tail;

    // the check here is awkward because Javascript's Number.MAX_SAFE_INTEGER
    // uses double-precision floating-point format numbers -> Math.pow(2, 53) - 1
    // but use this check here because leetcode test uses Java
    // which expects the value to be 32-bit signed integer
    if (newResult < MIN_INTEGER || newResult > MAX_INTEGER) {
    // the correct check for Javascript would be:
    // if (newResult + 1 === MAX_INTEGER || newResult - 1 === MIN_INTEGER) {
      return 0;
    }

    result = newResult;
  }

  return result;
}

export default reverse;

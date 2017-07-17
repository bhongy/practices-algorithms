/*
  Given a string, determine if it is a palindrome,
  considering only alphanumeric characters and ignoring cases.

  https://leetcode.com/problems/valid-palindrome

  @flow
*/

function isPalindrome(input: string): boolean {
  // add small complexity, micro optimization - exit early
  if (input === '') {
    return true;
  }

  const cleanedInput = input.toLowerCase().replace(/\W/g, '');

  // for easy version, this is enough
  // `return cleanedInput = cleanedInput.split('').reverse().join('');`

  const lastIndex = cleanedInput.length - 1;
  // `cleanedInput.length / 2` works too
  // but it will check the middle char againsts
  // itself for odd lengths - just slightly slower
  const middleIndex = (cleanedInput.length - 1) / 2;

  for (let i = 0; i < middleIndex; i++) {
    if (cleanedInput[i] !== cleanedInput[lastIndex - i]) {
      return false;
    }
  }

  return true;
}

export default isPalindrome;

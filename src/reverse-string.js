/*
  Reverse a string so that "hello" becomes "olleh".

  @flow
*/

// avoid doing .substring
// just loop through without touching the original
function reverseString(s: string): string {
  // special case
  if (s === '') {
    return s;
  }

  let result = '';

  for (let i = s.length - 1; i >= 0; i--) {
    result += s[i];
  }

  return result;
}

export default reverseString;

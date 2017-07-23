/*
  Given a string containing just the characters "(", ")", "{", "}", "[" and "]",
  determine if the input string is valid.

  The brackets must close in the correct order,
  "()" and "()[]{}" are all valid but "(]" and "([)]" are not.

  https://leetcode.com/problems/valid-parentheses

  @flow
*/

const closeBraceOf: { [key: string]: string } = {
  '(': ')',
  '{': '}',
  '[': ']',
};

// avoid using Array push, pop
function isValidParentheses(source: string): boolean {
  const openBraces = []; // stack
  let pointer = -1; // pointer of the stack (index - top of the stack)

  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    const isOpenBrace = '({['.indexOf(char) > -1;
    const isClosingBrace = ')}]'.indexOf(char) > -1;

    if (isOpenBrace) {
      pointer += 1;
      openBraces[pointer] = char;
      continue;
    }

    if (isClosingBrace) {
      const lastOpenBrace = openBraces[pointer];

      if (char !== closeBraceOf[lastOpenBrace]) {
        // alternatively, can throw an error with `i`
        // to indicate the point where the error happens
        // e.g. -> throw new Error(`failed at ${source.substring(0, i + 1)} <`)
        return false;
      }

      // remove the last brace from the stack
      // could do `openBraces.length = pointer` instead but this shows the intent better
      openBraces.length -= 1;
      // update the position of the pointer since we "pop" the stack
      pointer -= 1;
    }
  }

  // return pointer === -1;
  return openBraces.length === 0;
}

export default isValidParentheses;

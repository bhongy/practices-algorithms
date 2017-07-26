// @flow

import isValidParentheses from './valid-parentheses';

describe('Valid Parentheses', () => {
  it('should return `true` for valid cases', () => {
    const expected = true;

    [
      '()',
      '[]',
      '{}',
      '({})',
      '{[]}',
      '()[]{}',
      '{[()]}',
      '({[{[]}]})',
      '[()]{}{[()()]()}',
      '(183.23)',
      'callback(() => { return (<div />); });',
      'const { foo } = myObj["bar"].props;',
      'function foo({ length }) { return (length - 1).toString(); }',
    ].forEach((input) => {
      expect(isValidParentheses(input)).toBe(expected);
    });
  });

  it('should return `false` if any pair of braces are left unclosed', () => {
    const expected = false;

    ['(31', 'smth]()', '[{)}', 'const { a = myObj["baz"];'].forEach((input) => {
      expect(isValidParentheses(input)).toBe(expected);
    });
  });

  it('should return `false` if any braces are matched in the wrong order', () => {
    const expected = false;

    ['[{]}', ')(', '[}{]', 'callback(() => {)};'].forEach((input) => {
      expect(isValidParentheses(input)).toBe(expected);
    });
  });
});

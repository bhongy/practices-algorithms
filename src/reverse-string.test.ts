import reverseString from './reverse-string';

describe('Reverse String', () => {
  // it('should return an empty string if input is an empty string')
  // it('should return an empty string if input not a type string')
  it('should return a reversed string correctly', () => {
    [
      ['', ''],
      ['hello', 'olleh'],
      ['Is Fiber ready yet?', '?tey ydaer rebiF sI'],
    ].forEach(([input, expected]) => {
      expect(reverseString(input)).toBe(expected);
    });
  });
});

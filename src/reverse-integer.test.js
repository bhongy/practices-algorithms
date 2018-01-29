import reverseInteger, { MIN_INTEGER, MAX_INTEGER } from './reverse-integer';

describe('Reverse Integer', () => {
  it('should reverse positive integer correctly', () => {
    [[123, 321], [0, 0], [919, 919]].forEach(([input, expected]: [
      number,
      number,
    ]) => {
      expect(reverseInteger(input)).toBe(expected);
    });
  });

  it('should reverse negative integer correctly', () => {
    [[37711, 11773], [-0, 0], [-55, -55]].forEach(([input, expected]: [
      number,
      number,
    ]) => {
      expect(reverseInteger(input)).toBe(expected);
    });
  });

  it('should return 0 if the revered value exceeds max 32-bit signed integer', () => {
    expect(reverseInteger(MAX_INTEGER)).toBe(0);
  });

  it('should return 0 if the revered value exceeds min 32-bit signed integer', () => {
    expect(reverseInteger(MIN_INTEGER)).toBe(0);
  });
});

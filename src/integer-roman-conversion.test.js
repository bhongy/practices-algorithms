import {
  romanToInteger,
  romanToIntegerSimpler,
} from './integer-roman-conversion';

const romanToIntegerTestcases = [
  ['I', 1],
  ['II', 2],
  ['IV', 4],
  ['V', 5],
  ['VII', 7],
  ['IX', 9],
  ['X', 10],
  ['XVIII', 18],
  ['XXX', 30],
  ['XL', 40],
  ['L', 50],
  ['LX', 60],
  ['XC', 90],
  ['C', 100],
  ['CX', 110],
  ['CL', 150],
  ['CC', 200],
  ['CD', 400],
  ['D', 500],
  ['DC', 600],
  ['CM', 900],
  ['M', 1000],
  ['MM', 2000],
  ['MMDLXXVIII', 2578],
  ['MMMCMXCIX', 3999],
];

describe('Roman to Integer (1 to 3999) - v1', () => {
  romanToIntegerTestcases.forEach(([input, expected]) => {
    it(`should convert ${input} to ${expected}`, () => {
      expect(romanToInteger(input)).toBe(expected);
    });
  });
});

describe('Roman to Integer (1 to 3999) - simpler', () => {
  romanToIntegerTestcases.forEach(([input, expected]) => {
    it(`should convert ${input} to ${expected}`, () => {
      expect(romanToIntegerSimpler(input)).toBe(expected);
    });
  });
});
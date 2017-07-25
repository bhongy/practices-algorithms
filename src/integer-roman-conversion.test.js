import {
  romanToInteger,
  romanToIntegerSimpler,
  integerToRoman,
  integerToRomanSimpler,
} from './integer-roman-conversion';

const romanToIntegerTestcases: Array<[string, number]> = [
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
  romanToIntegerTestcases.forEach(([input, expected]: [string, number]) => {
    it(`should convert ${input} to ${expected}`, () => {
      expect(romanToInteger(input)).toBe(expected);
    });
  });
});

describe('Roman to Integer (1 to 3999) - simpler', () => {
  romanToIntegerTestcases.forEach(([input, expected]: [string, number]) => {
    it(`should convert ${input} to ${expected}`, () => {
      expect(romanToIntegerSimpler(input)).toBe(expected);
    });
  });
});

function swapKeyValue([k, v]: [number, string]): [string, number] {
  return [v, k];
}

const integerToRomanTestcases: Array<
  [number, string]
> = romanToIntegerTestcases.map(swapKeyValue);

describe('Integer to Roman (1 to 3999) - v1', () => {
  integerToRomanTestcases.forEach(([input, expected]: [number, string]) => {
    it(`should convert ${input} to ${expected}`, () => {
      expect(integerToRoman(input)).toBe(expected);
    });
  });
});

describe('Integer to Roman (1 to 3999) - simpler', () => {
  integerToRomanTestcases.forEach(([input, expected]: [number, string]) => {
    it(`should convert ${input} to ${expected}`, () => {
      expect(integerToRomanSimpler(input)).toBe(expected);
    });
  });
});

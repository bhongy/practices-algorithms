/*
  Convert between Roman Numerals to Integer. Values are integers between 1 to 3999.

  https://leetcode.com/problems/roman-to-integer

  @flow
*/

const intFor: { [key: string]: number } = {
  i: 1,
  v: 5,
  x: 10,
  l: 50,
  c: 100,
  d: 500,
  m: 1000,
};

// Linear time O(n) (worst case) where `n` is the length of the roman numeral
// Constant space O(1)
export function romanToInteger(roman: string): number {
  const r = roman.toLowerCase();
  let position = 0;
  let result = 0;

  while (position < r.length) {
    const currentInt = intFor[r[position]];
    const nextInt = intFor[r[position + 1]];

    if (typeof nextInt === 'undefined') {
      result += currentInt;
      return result;
    }

    if (nextInt > currentInt) {
      result += nextInt - currentInt;
      position += 2;
    } else {
      // since the answer for 3900 is MMMCM we cannot use
      // `result += nextInt + currentInt` with `position += 2`
      // because it behaves differently than the lower numerals.
      result += currentInt;
      position += 1;
    }
  }

  return result;
}

// Linear time O(n) (worst case) where `n` is the length of the roman numeral
// Constant space O(1)
export function romanToIntegerSimpler(roman: string): number {
  const r = roman.toLowerCase();
  let position = r.length - 1; // start from the last position
  let result = 0;

  while (position >= 0) {
    const currentInt = intFor[r[position]];
    const prevInt = intFor[r[position + 1]];

    if (currentInt < prevInt) {
      result -= currentInt;
    } else {
      result += currentInt;
    }

    position -= 1;
  }

  return result;
}

// TODO: implement only without 2 character map - e.g. 'CM', 'IX'
const integersToRomansMap: Array<[number, string]> = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

export function integerToRomanSimpler(int: number): string {
  let result = '';

  integersToRomansMap.forEach(([integer, romanChar]: [
    number,
    string,
  ]): void => {
    while (int >= integer) {
      result += romanChar;
      int -= integer;
    }
  });

  return result;
}

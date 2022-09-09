/*
  Convert between Roman Numerals to Integer.
  Values are integers between 1 to 3999.

  https://leetcode.com/problems/roman-to-integer
*/

const intFor: {[key: string]: number} = {
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

// Javascript object key must be string
// numbers will be converted with `toString` if given as keys
const romanForMap: {[key: string]: string} = {
  '1': 'i',
  '5': 'v',
  '10': 'x',
  '50': 'l',
  '100': 'c',
  '500': 'd',
  '1000': 'm',
};

// just convenience so we don't have to deal with implicit type coercion
// when using number to as an object key
function romanFor(key: number): string {
  return romanForMap[key.toString()];
}

function repeat(char: string, count: number): string {
  return new Array(count + 1).join(char);
}

function isBase10(value: number): boolean {
  return Number.isInteger(Math.log10(value));
}

export function integerToRoman(int: number): string {
  let remaining = int;
  let result = '';

  [1000, 500, 100, 50, 10, 5, 1].forEach((factor) => {
    while (remaining >= factor) {
      const n = Math.trunc(remaining / factor);
      const next =
        n < 4
          ? repeat(romanFor(factor), n)
          : romanFor(factor) + romanFor(factor * 5);

      result += next;
      remaining -= n * factor;
    }

    // after the while loop, `int` is less than the current `factor`
    if (isBase10(factor) && remaining >= factor * (9 / 10)) {
      result += romanFor(factor / 10) + romanFor(factor);
      remaining -= factor * (9 / 10);
    }
  });

  return result.toUpperCase();
}

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
  let remaining = int;
  let result = '';

  integersToRomansMap.forEach(
    ([integer, romanChar]: [number, string]): void => {
      while (remaining >= integer) {
        result += romanChar;
        remaining -= integer;
      }
    },
  );

  return result;
}

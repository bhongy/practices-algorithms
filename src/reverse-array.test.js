// @flow

import reverseArrayVersions from './reverse-array';

describe('Reverse Array', () => {
  reverseArrayVersions.forEach(reverseArray => {
    describe(`... ${reverseArray.name}`, () => {
      it('should reverse the elements in the array', () => {
        [
          { input: [], expected: [] },
          { input: [null], expected: [null] },
          { input: [97], expected: [97] },
          { input: [{ foo: 'bar' }], expected: [{ foo: 'bar' }] },
          { input: [1, 3, 5], expected: [5, 3, 1] },
          {
            input: [5, 'typescript', 30, null],
            expected: [null, 30, 'typescript', 5],
          },
          {
            input: [{ lang: 'ocaml' }, [1, 2, 3]],
            expected: [[1, 2, 3], { lang: 'ocaml' }],
          },
          {
            input: [12, 37, 14, 55, 32, 54, 1],
            expected: [1, 54, 32, 55, 14, 37, 12],
          },
        ].forEach(({ input, expected }) => {
          expect(reverseArray(input)).toEqual(expected);
        });
      });
    });
  });
});

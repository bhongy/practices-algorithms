import reverseArrayVersions from './reverse-array';

describe('Reverse Array', () => {
  reverseArrayVersions.forEach((reverseArray) => {
    describe(`... ${reverseArray.name}`, () => {
      it('should reverse the elements in the array', () => {
        const testCases: Array<[unknown[], unknown[]]> = [
          [[], []],
          [[null], [null]],
          [[97], [97]],
          [[{foo: 'bar'}], [{foo: 'bar'}]],
          [
            [1, 3, 5],
            [5, 3, 1],
          ],
          [
            [5, 'typescript', 30, null],
            [null, 30, 'typescript', 5],
          ],
          [
            [{lang: 'ocaml'}, [1, 2, 3]],
            [[1, 2, 3], {lang: 'ocaml'}],
          ],
          [
            [12, 37, 14, 55, 32, 54, 1],
            [1, 54, 32, 55, 14, 37, 12],
          ],
        ];

        testCases.forEach(([input, expected]) => {
          expect(reverseArray(input)).toEqual(expected);
        });
      });
    });
  });
});

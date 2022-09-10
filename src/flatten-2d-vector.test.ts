import {flattenCustom, flattenGenerator, Vector2d} from './flatten-2d-vector';

describe('Flatten 2D Vector', () => {
  describe(`${flattenCustom.name}`, () => {
    it('returns the correct result for an empty vector', () => {
      const vector = flattenCustom([]);

      expect(vector.hasNext()).toBe(false);
      expect(vector.next()).toBeUndefined();
      // next() doesn't change the result
      expect(vector.hasNext()).toBe(false);
      expect(vector.next()).toBeUndefined();
    });

    it('returns the correct values one-by-one', () => {
      const vector = flattenCustom([[1, 2], [3], [4, 5, 6]]);
      [1, 2, 3, 4, 5, 6].forEach((n) => {
        expect(vector.next()).toBe(n);
      });
      expect(vector.next()).toBeUndefined();
    });

    it('returns the correct values when calling `hasNext`', () => {
      const vector = flattenCustom([[12.34]]);
      expect(vector.hasNext()).toBe(true);
      expect(vector.next()).toBe(12.34);
      expect(vector.hasNext()).toBe(false);
    });
  });

  describe(`${flattenGenerator.name}`, () => {
    it('returns the correct result for an empty vector', () => {
      const vector = flattenGenerator([]);

      expect(vector.next()).toEqual({done: true});
      // next() doesn't change the result
      expect(vector.next()).toEqual({done: true});
      expect([...vector]).toEqual([]);
    });

    it('returns the correct values one-by-one', () => {
      const vector = flattenGenerator([[1, 2], [3], [4, 5, 6]]);
      expect([...vector]).toEqual([1, 2, 3, 4, 5, 6]);
      expect(vector.next()).toEqual({done: true});
    });
  });

  describe(`class ${Vector2d.name}`, () => {
    it('returns the correct result for an empty vector', () => {
      const vector = new Vector2d([]);
      expect([...vector]).toEqual([]);
    });

    it('returns the correct values one-by-one', () => {
      const vector = new Vector2d([[1, 2], [3], [4, 5, 6]]);
      expect([...vector]).toEqual([1, 2, 3, 4, 5, 6]);
      // returns a new iterator
      expect([...vector]).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});

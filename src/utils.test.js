// @flow

import { isNil } from './utils';

describe('Utils', () => {
  describe('isNil', () => {
    it('should return `true` for `null`', () => {
      expect(isNil(null)).toBe(true);
    });

    it('should return `true` for `undefined`', () => {
      expect(isNil(undefined)).toBe(true);
    });

    it('should return `false` for other types', () => {
      [0, 10, Infinity, NaN, '', 'foo', { foo: 'bar' }, [1, 2, 3]].forEach(
        v => {
          expect(isNil(v)).toBe(false);
        }
      );
    });
  });
});

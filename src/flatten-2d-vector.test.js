// @flow

import Vector2d from './flatten-2d-vector';

describe('Flatten 2D Vector', () => {
  let vector;

  it('should return the correct values one-by-one', () => {
    vector = new Vector2d([[1, 2], [3], [4, 5, 6]]);

    expect(vector.next()).toBe(1);
    expect(vector.next()).toBe(2);
    expect(vector.next()).toBe(3);
    expect(vector.next()).toBe(4);
    expect(vector.next()).toBe(5);
    expect(vector.next()).toBe(6);
    expect(vector.next()).toBeNull();
  });

  it('should return correct values when calling `hasNext`', () => {
    vector = new Vector2d([[12.34]]);
    expect(vector.hasNext()).toBe(true);

    expect(vector.next()).toBe(12.34);
    expect(vector.hasNext()).toBe(false);
  });
});

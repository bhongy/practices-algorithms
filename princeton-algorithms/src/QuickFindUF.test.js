// @flow
const { connected, union } = require('./QuickFindUF');

describe('QuickFindUF', () => {
  function createStore(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  function applyUnions<T: number[]>(store: T): T {
    return [
      [4, 3],
      [3, 8],
      [6, 5],
      [9, 4],
      [2, 1],
      [5, 0],
      [7, 2],
    ].reduce((prev, [p, q]) => union(prev, p, q), store);
  }

  it('unions correctly', () => {
    const initial = createStore(10);
    expect(initial).toMatchSnapshot('Initial State');

    const unioned = applyUnions(initial);
    expect(unioned).toMatchSnapshot('After unions');
  });

  it('checks connetions correctly', () => {
    const s = applyUnions(createStore(10));

    expect(connected(s, 6, 0)).toBe(true);
    expect(connected(s, 8, 9)).toBe(true);

    expect(connected(s, 2, 0)).toBe(false);
    expect(connected(s, 3, 7)).toBe(false);
  });

  it('handles out of range indices', () => {
    [
      { fn: union, p: -1, q: 5 },
      { fn: union, p: 1, q: 12 },
      { fn: connected, p: -3, q: 12 },
      { fn: connected, p: 12, q: -3 },
    ].forEach(({ fn, p, q }) => {
      const s = applyUnions(createStore(10));
      expect(() => fn(s, p, q)).toThrowErrorMatchingSnapshot();
    });
  });
});

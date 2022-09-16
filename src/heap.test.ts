// @flow
import {MinHeap} from './heap';

describe('MinHeap', () => {
  function initializeMinHeap<T extends number>(values: Array<T>): MinHeap<T> {
    return values.reduce((heap, v) => heap.push(v), new MinHeap<T>());
  }

  describe('.peek()', () => {
    it('returns `null` if the heap is empty', () => {
      const heap = new MinHeap();
      expect(heap.peek()).toBeNull();
    });

    it('returns the only value', () => {
      const heap = initializeMinHeap([58]);
      expect(heap.peek()).toEqual(58);
    });

    it('returns the smallest value without removing the items', () => {
      const heap = initializeMinHeap([5, 3, 1.5, -1.2]);
      expect(heap.items).toEqual([-1.2, 1.5, 3, 5]);
      expect(heap.peek()).toEqual(-1.2);
      expect(heap.peek()).toEqual(-1.2);
      expect(heap.items).toEqual([-1.2, 1.5, 3, 5]);
    });
  });

  describe('.push()', () => {
    it('works on an empty heap', () => {
      const heap = new MinHeap();
      heap.push(73.3);
      expect(heap.items).toEqual([73.3]);
    });

    it('maintains invariant when pushes a bunch of unsorted values', () => {
      // prettier-ignore
      const data = [
        174, -16, 122, 287, 244, 100, 273, -30, 83, 225,
        178, 199, 190, 286, -29, 192, -36, 233, 272, 182,
      ];
      const heap = initializeMinHeap(data);
      // prettier-ignore
      expect(heap.items).toEqual([
        -36,
        -30, -29,
        -16, 178, 122, 100,
        83, 174, 182, 225, 199, 190, 286, 273,
        287, 192, 233, 272, 244,
      ]);
    });
  });

  describe('.pop()', () => {
    it('returns `null` if the heap is empty', () => {
      const heap = new MinHeap();
      expect(heap.pop()).toBeNull();
    });

    it('returns the only value and results to an empty heap', () => {
      const heap = initializeMinHeap([46.54]);
      expect(heap.pop()).toEqual(46.54);
      expect(heap.items).toEqual([]);
    });

    it('returns the smallest value', () => {
      const heap = initializeMinHeap([1.304, -10, 0, 5, 3, 1.5, -1.2]);
      expect(heap.pop()).toEqual(-10);
      expect(heap.pop()).toEqual(-1.2);
      expect(heap.pop()).toEqual(0);
      expect(heap.pop()).toEqual(1.304);
    });

    it('maintains invariant', () => {
      const heap = initializeMinHeap([1, 2, 3, 4]);
      heap.pop();
      expect(heap.items).toEqual([2, 4, 3]);
      heap.pop();
      expect(heap.items).toEqual([3, 4]);
    });
  });
});

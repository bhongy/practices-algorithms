/*
  Implement an "iterator" to flatten a 2d vector.
  For example, Given 2d vector:

  ```
  [
    [1,2],
    [3],
    [4,5,6]
  ]
  ```

  By calling `next` repeatedly until `hasNext` returns false,
  the order of elements returned by next should be: 1, 2, 3, 4, 5, 6.

  Assume that the input is guaranteed to be number[][].

  https://leetcode.com/problems/flatten-2d-vector
*/

interface CustomIterator {
  next(): number | undefined;
  hasNext(): boolean;
}

export function flattenCustom(vector: number[][]): CustomIterator {
  let i = 0;
  let j = 0;

  function advanceCursors() {
    if (j < vector[i].length - 1) {
      j += 1;
    } else {
      i += 1;
      j = 0;
    }
  }

  return {
    next() {
      if (this.hasNext()) {
        const v = vector[i][j];
        advanceCursors();
        return v;
      }
    },

    hasNext() {
      return i < vector.length;
    },
  };
}

// returns an iterator over the vector
export function* flattenGenerator(vector: number[][]): Generator<number> {
  for (let row of vector) {
    for (let v of row) {
      yield v;
    }
  }
}

// returns an iterable that produces iterator over vector
export class Vector2d {
  constructor(private readonly vector: number[][]) {}

  *[Symbol.iterator](): Iterator<number> {
    for (let a of this.vector) {
      for (let b of a) {
        yield b;
      }
    }
  }
}

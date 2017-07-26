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

  Assume that the input is guaranteed to be 2d matrix.

  https://leetcode.com/problems/flatten-2d-vector

  @flow
*/

function flatten(vector2d: Array<Array<number>>): Array<number> {
  const result: Array<number> = [];

  for (let i = 0; i < vector2d.length; i++) {
    const currentRow = vector2d[i];

    for (let j = 0; j < currentRow.length; j++) {
      // practice "not" using push
      result[result.length] = currentRow[j];
    }
  }

  return result;
}

class Vector2d {
  values: Array<number>;
  pointer: number;

  constructor(input: number[][]): void {
    this.values = flatten(input);
    this.pointer = 0;
  }

  next(): ?number {
    if (!this.hasNext()) {
      return null;
    }

    const result = this.values[this.pointer];
    this.pointer += 1;
    return result;
  }

  hasNext(): boolean {
    return this.pointer < this.values.length;
  }
}

export default Vector2d;

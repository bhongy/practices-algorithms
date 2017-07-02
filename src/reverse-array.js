// @flow

/*
  Reverse array without using any Array.prototype methods.
  Aim for O(n) time and O(1) space.
*/

// type with Array<mixed> instead of Array<T> - allow mixed types of elements
function switchElementsHalfArray(list: Array<mixed>): Array<mixed> {
  for (let head = 0; head <= (list.length / 2) - 1; head++) {
    const tail = list.length - head - 1
    const temp = list[head];

    list[head] = list[tail]
    list[tail] = temp
  }

  return list;
}

export default [switchElementsHalfArray];

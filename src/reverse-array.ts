/*
  Reverse array without using any Array.prototype methods.
  Aim for O(n) time and O(1) space.
*/

function switchElementsHalfArray<T>(list: Array<T>): Array<T> {
  for (let head = 0; head <= (list.length - 1) / 2; head++) {
    const tail = list.length - head - 1;
    const temp = list[head];

    list[head] = list[tail];
    list[tail] = temp;
  }

  return list;
}

export default [switchElementsHalfArray];

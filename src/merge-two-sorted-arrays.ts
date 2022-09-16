/*
  Given two sorted arrays of numbers - merge them so that the result is sorted.
  Assume that the arrays are not sparsed.
  Assume that the arrays contain only safe numbers (no NaN, undefined, null).

  Bonus: achieve time complexity O(n)

  http://khan4019.github.io/front-end-Interview-Questions/js1.html#mergeSotedArray
*/

// O(n) time, O(n) space
function mergeSortedArrays(a: Array<number>, b: Array<number>): Array<number> {
  const an = a.length;
  let ai = 0;

  const bn = b.length;
  let bi = 0;

  const merged = new Array(an + bn);
  let mi = 0;

  while (ai < an && bi < b.length) {
    merged[mi++] = a[ai] < b[bi] ? a[ai++] : b[bi++];
  }

  while (ai < an) {
    merged[mi++] = a[ai++];
  }

  while (bi < b.length) {
    merged[mi++] = b[bi++];
  }

  return merged;
}

export function mergeSortedArrays2(
  a: Array<number>,
  b: Array<number>,
): Array<number> {
  const an = a.length;
  const bn = b.length;

  const merged = new Array(an + bn);
  let ai = 0;
  let bi = 0;

  for (let i = 0; i < an + bn; i++) {
    if (ai >= an || a[ai] > b[bi]) {
      merged[i] = b[bi++];
    } else {
      merged[i] = a[ai++];
    }
  }

  return merged;
}

export default mergeSortedArrays;

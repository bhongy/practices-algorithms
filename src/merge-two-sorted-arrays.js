/*
  Given two sorted arrays of numbers - merge them so that the result is sorted.
  Assume that the arrays are not sparsed.
  Assume that the arrays contain only safe numbers (no NaN, undefined, null).

  Bonus: achieve time complexity O(n)

  http://khan4019.github.io/front-end-Interview-Questions/js1.html#mergeSotedArray

  @flow
*/

// O(n)
function mergeSortedArrays(a: Array<number>, b: Array<number>): Array<number> {
  // micro-optimization - cache constant value access
  const lenA = a.length;
  const lenB = b.length;

  // special case, one of the input is an empty array
  // avoid doing extra work if not necessary
  if (lenA === 0) return b;
  if (lenB === 0) return a;

  let merged = [];
  let iA = 0;
  let iB = 0;

  while (true) {
    // want to try a different style
    if (iA >= lenA && iB >= lenB) {
      break;
    }

    // from here, we know that we won't have a case
    // where both iA and iB are out of bound

    const valA = a[iA];
    const valB = b[iB];

    if (iA >= lenA || valA > valB) {
      // practice: avoid using Array.prototype.push
      merged[iA + iB] = valB;
      iB++;
    } else {
      merged[iA + iB] = valA;
      iA++;
    }
  }

  return merged;
}

export default mergeSortedArrays;

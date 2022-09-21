/*
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

Assume: xs.length >= 2
*/

/*
A product of any position i in the array is a product of all items before i multiply by
the product of all items after i.

product([1,2,3,4], index=2) -> [1,2] * [4]

pre     | post
[]      * [2,3,4]
[1]     *   [3,4]
[1,2]   *     [4]
[1,2,3] *      []

The solution is to calculate the products of pre/post up to each i
then the answer is pre[i] * post[i].

xs:   [1,2,3,4]
pre:  [1,1,2,6]
post: [24,12,4,1]
out:  [24,12,8,6]
*/

// Straight-forward solution but _fails_ the requirement
// i.e. it does not run in O(n) time
//
// O(n^2) time - calculate product is O(n) and we do that ~2n times
// O(n) space - copy sub arrays in each iteration
export function naive(xs: number[]): number[] {
  const product = (xs: number[]): number => xs.reduce((acc, x) => acc * x, 1);
  const n = xs.length;
  const products = new Array(n);
  for (let i = 0; i < n; i++) {
    products[i] = product(xs.slice(0, i)) * product(xs.slice(i + 1));
  }
  return products;
}

// O(n) time - traverse the array 3 times
// O(n) space - need 2 extra arrays of length n (pre, post)
//   besides the result products array
export function twoArrays(xs: number[]): number[] {
  const n = xs.length;
  const pre = new Array(n); // products of all items up to i
  const post = new Array(n); // products of all items after i
  const products = new Array(n);

  /*
  xs:  [_, _, _, ..., _]
  pre: [1, _, _, ..., _]
           i
  */
  pre[0] = 1; // 1 (i.e. identity) because product([], [first]) should result to first
  for (let i = 1; i < n; i++) {
    pre[i] = pre[i - 1] * xs[i - 1];
  }

  /*
  xs:   [_, _, ..., _, _]
  post: [_, _, ..., _, 1]
                    i
  */
  post[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    post[i] = post[i + 1] * xs[i + 1];
  }

  for (let i = 0; i < n; i++) {
    products[i] = pre[i] * post[i];
  }
  return products;
}

/*
Same algorithm as the previous one but use the products array to keep track of pre.
Post calculation is just keep multiplying post to xs(i - 1)
*/

// O(n) time - iterate through xs two times
// O(n) space - no extra space besides the products array (output)
export function spaceOptimized(xs: number[]): number[] {
  const n = xs.length;
  const products = new Array(n);

  let pre = 1; // accumulated product of all items up to i
  for (let i = 0; i < n; i++) {
    // store the products of all elements up to i (excl. i)
    products[i] = pre;
    pre *= xs[i];
    /*
    xs: [1,2,3,4]

           0    1    2    3
    p[i]   1    1    2    6
    pre:   1    2    6   24
    */
  }

  let post = 1;
  for (let i = n - 1; i >= 0; i--) {
    const pre = products[i];
    products[i] = pre * post;
    post *= xs[i];
    /*
    xs: [1,2,3,4]

             0    1    2    3
    post:   24   12    4    1
    p'[i]    1    1    2    6
    p[i]    24   12    8    6
    */
  }

  return products;
}

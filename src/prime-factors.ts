/*
  Find all prime factors of a number. Return an array of all prime factors
  with duplicate prime numbers if applicable.

  http://khan4019.github.io/front-end-Interview-Questions/js1.html#primFactors
*/

function getPrimeFactors(input: number): Array<number> {
  const factors = [];
  let reminder = input;
  let divisor = 2;

  while (divisor <= reminder) {
    if (reminder % divisor === 0) {
      factors.push(divisor);
      reminder /= divisor;
    } else {
      divisor += divisor === 2 ? 1 : 2;
    }
  }

  return factors;
}

export default getPrimeFactors;

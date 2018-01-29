// @flow

function validateId(id: number, max: number): void {
  if (id < 0 || id > max) {
    throw new RangeError(`id is out of bound. Expect between [0, ${max}] but received ${id}`);
  }
}

export function connected(store: number[], p: number, q: number): boolean {
  const max = store.length - 1;
  validateId(p, max);
  validateId(q, max);
  return store[p] === store[q];
}

export function union<T: number[]>(store: T, p: number, q: number): T {
  const max = store.length - 1;
  validateId(p, max);
  validateId(q, max);

  const vp = store[p];
  const vq = store[q];
  if (vp === vq) {
    return store;
  }
  return store.map(v => (v === vp ? vq : v));
}

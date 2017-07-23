/*
  Implement Linked List in Javascript.

  @flow
*/

import { isNil } from './utils';

export class Node<T> {
  value: T;
  next: ?Node<T>;

  constructor(v: T): void {
    this.value = v;
    this.next = null;
  }
}

// cannot handle circular linked list
// - i.e. the iterator do not know when to terminate
//
// do not return `this` for method chaining
class LinkedList<T> {
  head: ?Node<T>;

  constructor(): void {
    // favor explicitness
    // it is clearer to others & my future self
    this.head = null;
  }

  // O(1) time
  prepend(v: T): void {
    const newHead = new Node(v);

    if (!this.isEmpty()) {
      newHead.next = this.head;
    }

    this.head = newHead;
  }

  // O(1) time
  shift(): ?Node<T> {
    if (this.isEmpty()) {
      return null;
    }

    const prevHead = this.head;
    // $FlowFixMe: isEmpty already checked that `this.head` is not null
    this.head = this.head.next;
    return prevHead;
  }

  // O(n) time (worst case)
  append(v: T): void {
    if (this.isEmpty()) {
      this.head = new Node(v);
      return;
    }

    let current = this.head;
    // $FlowFixMe: isEmpty already checked that `this.head` is not null
    while (current.next) {
      current = current.next;
    }
    // $FlowFixMe: isEmpty already checked that `this.head` is not null
    current.next = new Node(v);
  }

  // O(n) time (worst case)
  pop(): ?Node<T> {
    if (this.isEmpty()) {
      return null;
    }

    if (this.size() === 1) {
      return this.shift();
    }

    let current = this.head;
    // $FlowFixMe: isEmpty already checked that `this.head` is not null
    while (current.next) {
      if (!current.next.next) {
        const last = current.next;
        // $FlowFixMe: isEmpty already checked that `this.head` is not null
        current.next = null;
        return last;
      }

      current = current.next;
    }
  }

  // O(n) time (worst case)
  removeWithValue(v: T): ?Node<T> {
    if (this.isEmpty()) {
      return null;
    }

    if (this.size() === 1) {
      return this.shift();
    }

    if (this.head.value === v) {
      const removed = this.head;
      this.head = this.head.next;
      return removed;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === v) {
        const removed = current.next;
        // skip the current.next and use the one after
        current.next = current.next.next;
        return removed;
      }

      current = current.next;
    }

    // `v` is not in the linked list
    return null;
  }

  // O(1) time
  isEmpty(): boolean {
    return isNil(this.head);
  }

  // O(n) time
  _forEach(iteratee: (node: Node<T>) => void): void {
    let current = this.head;

    while (current) {
      iteratee(current);
      current = current.next;
    }
  }

  // O(n) time
  _reduce<R>(
    iteratee: (accumulator: R, node: Node<T>) => R,
    accumulator: R
  ): R {
    this._forEach((node: Node<T>): void => {
      accumulator = iteratee(accumulator, node);
    });

    return accumulator;
  }

  // O(n) time
  size(): number {
    return this._reduce(length => length += 1, 0);
  }

  // O(n) time
  toString(): string {
    const values = this._reduce((acc: Array<string>, node) => {
      // $FlowFixMe: uncovered. how to type that `T` must have `toString` method
      acc.push(node.value.toString());
      return acc;
    }, []);

    return values.join(' -> ');
  }
}

export default LinkedList;

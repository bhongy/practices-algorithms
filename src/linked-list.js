/*
  Implement Linked List in Javascript.

  @flow
*/

export class Node<T> {
  value: T;
  next: ?Node<T>;

  constructor(v: T): void {
    this.value = v;
    this.next = null;
  }
}

// this implementation guarantees to always have a head
// e.g. do not allow removing the last node in the list
// do not return `this` for method chaining - by design
class LinkedList<T> {
  head: Node<T>;

  constructor(v: T): void {
    this.head = new Node(v);
  }

  // O(1) time
  prepend(v: T): Node<T> {
    const newHead = new Node(v);

    newHead.next = this.head;
    this.head = newHead;

    return newHead;
  }

  // O(1) time
  shift(): ?Node<T> {
    // head is the only node
    if (!this.head.next) {
      return;
    }

    const removed = this.head;
    this.head = this.head.next;
    return removed;
  }

  // O(n) time
  append(v: T): Node<T> {
    const newTail = new Node(v);

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newTail;

    return newTail;
  }

  // O(n) time
  pop(): ?Node<T> {
    // head is the only node
    if (!this.head.next) {
      return;
    }

    let current = this.head;
    while (current.next) {
      // current.next is the last node
      if (!current.next.next) {
        const removed = current.next;
        current.next = null;
        return removed;
      }

      current = current.next;
    }
  }

  // O(n) time
  removeWithValue(v: T): ?Node<T> {
    if (this.head.value === v) {
      // head is the only node
      if (!this.head.next) {
        return;
      }

      const removed = this.head
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
    return;
  }

  // O(n) time
  forEach(callback: (v: T) => void): void {
    let current = this.head;
    while (current) {
      callback(current.value);
      current = current.next;
    }
  }

  // O(n) time
  toString(): string {
    let result: Array<string> = [];

    this.forEach((v: T): void => {
      // $FlowFixMe: how to type that `T` must have `toString` method
      result.push(v.toString());
    });

    return result.join(' -> ');
  }
}

export default LinkedList;

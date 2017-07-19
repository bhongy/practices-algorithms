/*
  Implement Linked List in Javascript.

  @flow
*/

class Node<T> {
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
  prepend(v: T): void {
    const newHead = new Node(v);
    newHead.next = this.head;
    this.head = newHead;
  }

  // O(1) time
  shift(): void {
    // head is not the only node
    if (this.head.next) {
      this.head = this.head.next;
    }
  }

  // O(n) time
  append(v: T): void {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = new Node(v);
  }

  // O(n) time
  pop(): void {
    // head is the only node
    if (!this.head.next) {
      return;
    }

    let current = this.head;
    while (current.next) {
      // current.next is the last node
      if (!current.next.next) {
        current.next = null;
        return;
      }
      current = current.next;
    }
  }

  // O(n) time
  removeWithValue(v: T): void {
    if (this.head.value === v) {
      // head is not the only node
      if (this.head.next) {
        this.head = this.head.next;
      }
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === v) {
        // skip the current.next and use the one after
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
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

    this.forEach(v => {
      result.push(JSON.stringify(v));
    });

    return result.join(' -> ');
  }
}

export default LinkedList;

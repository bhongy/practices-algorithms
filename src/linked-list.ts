/*
  Implement Linked List in Javascript.
*/

class Node<T> {
  data: T;
  next: Node<T> | null;

  constructor(v: T) {
    this.data = v;
    this.next = null;
  }
}

// cannot handle circular linked list
// - i.e. the iterator do not know when to terminate
class LinkedList<T> {
  head: Node<T> | null;

  constructor() {
    // favor explicitness
    // it is clearer to others & my future self
    this.head = null;
  }

  // O(1) time
  prepend(v: T): void {
    const n = new Node(v);
    n.next = this.head;
    this.head = n;
  }

  // O(1) time
  shift(): T | null {
    if (!this.head) {
      return null;
    }

    const {data, next} = this.head;
    this.head = next;
    return data;
  }

  // O(n) time (worst case)
  append(v: T): void {
    if (!this.head) {
      this.head = new Node(v);
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = new Node(v);
  }

  // O(n) time (worst case)
  pop(): T | null {
    if (!this.head) {
      return null;
    }

    // for a linked list of one item, remove the head
    if (!this.head.next) {
      const {data} = this.head;
      this.head = null;
      return data;
    }

    let prev = this.head;
    let last = this.head;
    while (last.next) {
      prev = last;
      last = last.next;
    }

    // detach last node
    prev.next = null;
    return last.data;
  }

  // O(n) time (worst case)
  // true - success
  // false - v is not found
  removeWithValue(v: T): boolean {
    if (!this.head) {
      return false;
    }

    // removing head, need to update head reference
    if (this.head.data === v) {
      // get reference to the next node after head
      const {next} = this.head;
      // detach current head node from the list
      this.head.next = null;
      // use the next node as head
      this.head = next;
      return true;
    }

    let prev = this.head;
    // already dealt with head
    let current = this.head.next;
    while (current) {
      if (current.data === v) {
        prev.next = current.next;
        return true;
      }

      prev = current;
      current = current.next;
    }

    return false;
  }

  // O(1) time
  isEmpty(): boolean {
    return !this.head;
  }

  // O(n) time
  forEach(iteratee: (node: Node<T>) => void): void {
    let current = this.head;

    while (current) {
      iteratee(current);
      current = current.next;
    }
  }

  // O(n) time
  reduce<R>(iteratee: (accumulator: R, node: Node<T>) => R, accumulator: R): R {
    this.forEach((node) => {
      accumulator = iteratee(accumulator, node);
    });

    return accumulator;
  }

  // O(n) time
  size(): number {
    return this.reduce((length) => (length += 1), 0);
  }

  // O(n) time
  toString(): string {
    const values = this.reduce((acc: Array<string>, node) => {
      acc.push(`${node.data}`);
      return acc;
    }, []);

    return values.join(' -> ');
  }
}

export default LinkedList;

export function deleteMiddleNode<T>(
  list: LinkedList<T>,
  valueToRemove: T,
): boolean {
  if (!list.head || list.size() <= 2) {
    return false;
  }

  let prev = list.head;
  // skip head because we don't remove it
  let current = list.head.next;

  while (current) {
    // don't remove last node
    if (!current.next) {
      break;
    }

    if (current.data === valueToRemove) {
      // skip current
      prev.next = current.next;
      return true;
    }

    prev = current;
    current = current.next;
  }

  return false;

  /*
  ---
  alternative, don't use `prev` variable --

  I prefer using two variables because it's easier for anyone reading
  the code to understand.
  ---

  let current: Node<T> = list.head;

  while (current.next) {
    if (isLastNode(current.next)) {
      return null;
    }

    if (current.next.value === valueToRemove) {
      const removed = current.next;
      current.next = current.next.next;
      return removed;
    }

    current = current.next;
  }

  return null;
  */
}

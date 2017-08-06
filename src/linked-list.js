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

    if (this.head) {
      newHead.next = this.head;
    }

    this.head = newHead;
  }

  // O(1) time
  shift(): ?Node<T> {
    // TODO: figure out how to type so that I can use `this.isEmpty()` here
    //   really don't like not being able to express intent that `!this.head`
    //   actually means the list is empty.
    // ---
    // flow don't understand that `this.head` is already checked
    // if doing `if (this.isEmpty()) { return null; }`
    if (!this.head) {
      return null;
    }

    const prevHead = this.head;
    this.head = this.head.next;
    return prevHead;
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
  pop(): ?Node<T> {
    if (!this.head || !this.head.next) {
      return this.shift();
    }

    let current = this.head;
    let removed = null;

    // for a linked list `while (current.next)` is enough
    // (we don't really need `current` check)
    // but I guess Flow cannot guarantee that
    while (current && current.next) {
      if (!current.next.next) {
        removed = current.next;
        current.next = null;
        break;
      }

      current = current.next;
    }

    return removed;
  }

  // O(n) time (worst case)
  removeWithValue(v: T): ?Node<T> {
    // the first two checks `!this.head` (isEmpty)
    // and `!this.head.next` (head is the only node)
    // happens in all "removal" methods
    // is there a better and expressive way to handle this?
    // (must maintain reability)
    // ---
    // special case for `this.head.value === v`
    // because `this.head` needs to be updated when removing head
    if (!this.head || !this.head.next || this.head.value === v) {
      return this.shift();
    }

    let current = this.head;
    let removed = null;

    while (current && current.next) {
      if (current.next.value === v) {
        removed = current.next;
        // skip the current.next and use the one after
        current.next = current.next.next;
        break;
      }

      current = current.next;
    }

    // `v` is not in the list
    return removed;
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
    this.forEach((node: Node<T>): void => {
      // eslint-disable-next-line no-param-reassign
      accumulator = iteratee(accumulator, node);
    });

    return accumulator;
  }

  // O(n) time
  size(): number {
    // eslint-disable-next-line no-return-assign, no-param-reassign
    return this.reduce(length => (length += 1), 0);
  }

  // O(n) time
  toString(): string {
    const values = this.reduce((acc: Array<string>, node) => {
      // $FlowFixMe: uncovered. how to type that `T` must have `toString` method
      acc.push(node.value.toString());
      return acc;
    }, []);

    return values.join(' -> ');
  }
}

export default LinkedList;

function isLastNode<T>(node: Node<T>): boolean {
  return !node.next;
}

// can't think of a way that having `return null` at the end is needed
// adding it causes test coverage to go down (can't think of the way to test)
// eslint-disable-next-line consistent-return
export function deleteMiddleNode<T>(list: LinkedList<T>, valueToRemove: T): ?Node<T> {
  // don't actually need to check `list.head` because size === 0 is the same
  // but Flow don't know that
  if (!list.head || list.size() <= 2) {
    return null;
  }

  let prev: Node<T> = list.head;
  // skip head because we don't remove it
  let current: ?Node<T> = list.head.next;

  while (current) {
    // don't remove last node
    if (isLastNode(current)) {
      return null;
    }

    if (current.value === valueToRemove) {
      // skip current
      prev.next = current.next;
      return current;
    }

    prev = current;
    current = current.next;
  }

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

/*
  Compose Stack and Queue in Javascript using Linked List.
  Favor composition over inheritance.

  @flow
*/

import LinkedList, { Node } from './linked-list';

interface Stack<T> {
  peek(): ?Node<T>,
  push(v: T): void,
  pop(): ?Node<T>,
  toString(): string,
}

export function createStack<T>(): Stack<T> {
  const stack = new LinkedList();
  let top = null;

  return {
    peek() {
      return top;
    },

    push(v) {
      stack.prepend(v);
      top = stack.head;
    },

    pop() {
      return stack.shift();
    },

    toString() {
      return stack.toString();
    },
  };
}

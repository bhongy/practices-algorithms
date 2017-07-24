/*
  Compose Stack and Queue in Javascript using Linked List.
  Favor composition over inheritance.

  @flow
*/

import LinkedList, { Node } from './linked-list';

export interface Stack<T> {
  peek(): ?Node<T>,
  push(v: T): void,
  pop(): ?Node<T>,
  isEmpty(): boolean,
  size(): number,
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

    pop: stack.shift.bind(stack),
    isEmpty: stack.isEmpty.bind(stack),
    size: stack.size.bind(stack),
    toString: stack.toString.bind(stack),
  };
}

export interface Queue<T> {
  enqueue(v: T): void,
  dequeue(): ?Node<T>,
  isEmpty(): boolean,
  size(): number,
  toString(): string,
}

export function createQueue<T>(): Queue<T> {
  const queue = new LinkedList();

  return {
    enqueue: queue.prepend.bind(queue),
    // O(n) time
    dequeue: queue.pop.bind(queue),
    isEmpty: queue.isEmpty.bind(queue),
    size: queue.size.bind(queue),
    toString: queue.toString.bind(queue),
  };
}

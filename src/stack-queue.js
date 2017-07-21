/*
  Compose Stack and Queue in Javascript using Linked List.
  Favor composition over inheritance.

  @flow
*/

import LinkedList, { Node } from './linked-list';

export class Stack<T> {
  stack: LinkedList<T>;
  top: Node<T>;

  constructor(v: T): void {
    const list = new LinkedList(v);

    this.stack = list;
    this.top = list.head;
  }

  push(v: T): Node<T> {
    this.top = this.stack.append(v);
    return this.top;
  }

  pop(): ?Node<T> {
    return this.stack.pop();
  }

  toString(): string {
    return this.stack.toString();
  }
}

export class Queue<T> {

}

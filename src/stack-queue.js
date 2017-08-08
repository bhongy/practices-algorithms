/*
  Compose Stack and Queue in Javascript using Linked List.
  Favor composition over inheritance.

  @flow
*/

import LinkedList from './linked-list';

export interface Stack<T> {
  peek(): ?T,
  push(v: T): void,
  pop(): ?T,
  isEmpty(): boolean,
  size(): number,
  toString(): string,
}

export function createStack<T>(): Stack<T> {
  const stack = new LinkedList();

  return {
    peek() {
      return stack.head ? stack.head.data : null;
    },

    push: stack.prepend.bind(stack),
    pop: stack.shift.bind(stack),
    isEmpty: stack.isEmpty.bind(stack),
    size: stack.size.bind(stack),
    toString: stack.toString.bind(stack),
  };
}

/*
alternative, implement Stack with object

// #1 as a class
class Stack<T> {
  storage: { [number]: T };
  top: number;

  constructor(): void {
    this.storage = {};
    this.top = -1;
  }

  peek(): ?T {
    if (this.top < 0) {
      return null;
    }

    return this.storage[this.top];
  }

  push(data: T): void {
    this.top += 1;
    this.storage[this.top] = data;
  }

  pop(): ?T {
    if (this.top < 0) {
      return null;
    }

    const data = this.storage[this.top];
    delete this.storage[this.top];
    this.top -= 1;
    return data;
  }

  isEmpty(): boolean {
    return this.top < 0;
  }

  size(): number {
    return this.top + 1;
  }

  toString(): string {
    const result = [];
    Object.keys(this.storage).reverse().forEach((key) => {
      result.push(this.storage[key]);
    });
    return result.join(' -> ');
  }
}

// #2 as a factory
//   less memory efficient (new functions for each instance)
export function createStack<T>(): Stack<T> {
  const storage: { [number]: T } = {};
  let top: number = -1;

  return {
    peek() {
      if (top < 0) {
        return null;
      }
      return storage[top];
    },

    push(data) {
      top += 1;
      storage[top] = data;
    },

    pop() {
      if (top < 0) {
        return null;
      }

      const data = storage[top];
      delete storage[top]; // also remove the "key"
      top -= 1;
      return data;
    },

    isEmpty() {
      return top < 0;
    },

    size() {
      return top + 1;
    },

    toString() {
      const result = [];
      Object.keys(storage).reverse().forEach((key) => {
        result.push(storage[key]);
      });
      return result.join(' -> ');
    },
  };
}
*/

export interface Queue<T> {
  enqueue(v: T): void,
  dequeue(): ?T,
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

// @flow

import type { Stack, Queue } from './stack-queue';
import { createStack, createQueue } from './stack-queue';

describe('Stack', () => {
  let stack;

  // perform side-effect on input, return nothing
  function populateData(s: Stack<string>): void {
    s.push('smoothie');
    s.push('apple');
    s.push('banana');
  }

  beforeEach(() => {
    stack = createStack();
  });

  it('should start with no node when instantiate', () => {
    expect(stack.toString()).toBe('');
  });

  describe('Peek', () => {
    it('should return value at the node from the top of the stack', () => {
      populateData(stack);
      expect(stack.peek()).toBe('banana');
    });

    it('should return `null` if stack is empty', () => {
      expect(stack.peek()).toBeNull();
    });
  });

  it('should push new nodes to the top of the stack', () => {
    populateData(stack);
    expect(stack.toString()).toBe('banana -> apple -> smoothie');
  });

  // could have tested that it delegates the call to LinkedList shift method
  describe('pop', () => {
    it('should remove the node from the top of the stack', () => {
      populateData(stack);

      stack.pop();
      expect(stack.toString()).toBe('apple -> smoothie');

      stack.pop();
      expect(stack.toString()).toBe('smoothie');

      stack.pop();
      expect(stack.toString()).toBe('');
    });

    it('should return the removed node', () => {
      populateData(stack);
      expect(stack.pop()).toBe('banana');
    });

    it('should remove the last node correctly', () => {
      stack.push('raspberry');

      expect(stack.pop()).toBe('raspberry');
      expect(stack.toString()).toBe('');
    });

    it('should not remove node and return `null` when the stack is empty', () => {
      expect(stack.pop()).toBeNull();
      expect(() => stack.pop()).not.toThrow();
    });
  });

  describe('isEmpty', () => {
    it('should return boolean result whether the stack is empty', () => {
      expect(stack.isEmpty()).toBe(true);

      stack.push('^_^');
      expect(stack.isEmpty()).toBe(false);

      stack.pop();
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('size', () => {
    it('should return the size of the stack', () => {
      expect(stack.size()).toBe(0);

      populateData(stack);
      expect(stack.size()).toBe(3);
    });
  });
});

describe('Queue', () => {
  let queue;

  // perform side-effect on input, return nothing
  function populateData(q: Queue<string>): void {
    q.enqueue('scissor');
    q.enqueue('paper');
    q.enqueue('rock');
  }

  beforeEach(() => {
    queue = createQueue();
  });

  it('should start with no node when instantiate', () => {
    expect(queue.toString()).toBe('');
  });

  it('should enqueue new nodes to the back of the queue', () => {
    populateData(queue);
    // head (left) is the back
    expect(queue.toString()).toBe('rock -> paper -> scissor');
  });

  describe('dequeue', () => {
    it('should remove the node from the front of the queue', () => {
      populateData(queue);

      queue.dequeue();
      expect(queue.toString()).toBe('rock -> paper');

      queue.dequeue();
      expect(queue.toString()).toBe('rock');

      queue.dequeue();
      expect(queue.toString()).toBe('');
    });

    it('should return the removed node', () => {
      populateData(queue);
      expect(queue.dequeue()).toBe('scissor');
    });

    it('should remove the last node correctly', () => {
      queue.enqueue('dragon');

      expect(queue.dequeue()).toBe('dragon');
      expect(queue.toString()).toBe('');
    });

    it('should not remove node and return `null` when the queue is empty', () => {
      expect(queue.dequeue()).toBeNull();
      expect(() => queue.dequeue()).not.toThrow();
    });
  });

  describe('isEmpty', () => {
    it('should return boolean result whether the queue is empty', () => {
      queue = createQueue();
      expect(queue.isEmpty()).toBe(true);

      queue.enqueue('dragon');
      expect(queue.isEmpty()).toBe(false);

      queue.dequeue();
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('size', () => {
    it('should return the size of the queue', () => {
      queue = createQueue();
      expect(queue.size()).toBe(0);

      populateData(queue);
      expect(queue.size()).toBe(3);
    });
  });
});

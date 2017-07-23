// @flow

import { createStack } from './stack-queue';
import { expectValue } from './linked-list.test';

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = createStack();
    stack.push('smoothie');
    stack.push('apple');
    stack.push('banana');
  });

  it('should start with no node when instantiate', () => {
    stack = createStack();
    expect(stack.toString()).toBe('');
  });

  it('should return the node at the top of the stack when calling peek', () => {
    expectValue(stack.peek(), 'banana');
  });

  it('should push new nodes to the top of the stack', () => {
    expect(stack.toString()).toBe('banana -> apple -> smoothie');
  });

  describe('pop', () => {
    it('should remove the node from the top of the stack', () => {
      stack.pop();
      expect(stack.toString()).toBe('apple -> smoothie');

      stack.pop();
      expect(stack.toString()).toBe('smoothie');

      stack.pop();
      expect(stack.toString()).toBe('');
    });

    it('should return the removed node', () => {
      expectValue(stack.pop(), 'banana');
    });

    it('should remove the last node correctly', () => {
      stack = createStack();
      stack.push('raspberry');

      expectValue(stack.pop(), 'raspberry');
      expect(stack.toString()).toBe('');
    });

    it('should not remove node and return `null` when the stack is empty', () => {
      stack = createStack();

      expect(stack.pop()).toBeNull();
      expect(() => stack.pop()).not.toThrow();
    });
  });
});

// describe('Queue');

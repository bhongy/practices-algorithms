// @flow

import { Stack, Queue } from './stack-queue';

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack('banana');
  });

  it('should start with a node when instantiate', () => {
    expect(stack.toString()).toBe('banana');
  });

  it('should push new values to the top of the stack', () => {
    stack.push('apple');
    stack.push('smoothie');

    expect(stack.top.value).toBe('smoothie');
    expect(stack.toString()).toBe('banana -> apple -> smoothie');
  });

  it('should pop the value out from the top of the stack', () => {
    stack.push('apple');
    stack.push('smoothie');

    stack.pop();
    expect(stack.toString()).toBe('banana -> apple');

    stack.pop();
    expect(stack.toString()).toBe('banana');
  });

  // TODO: change this - must change LinkedList
  it('should not pop the value when there is one node left', () => {
    stack.pop();
    expect(stack.toString()).toBe('banana');
  });
});

// describe('Queue');

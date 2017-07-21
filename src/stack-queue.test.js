// @flow

import { createStack } from './stack-queue';

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = createStack('banana');
    stack.push('apple');
    stack.push('smoothie');
  });

  it('should start with a node when instantiate', () => {
    stack = createStack('strawberry');
    expect(stack.toString()).toBe('strawberry');
  });

  it('should return the node at the top of the stack when calling peek', () => {
    expect(stack.peek().value).toBe('smoothie');
  });

  it('should push new values to the top of the stack', () => {
    expect(stack.toString()).toBe('banana -> apple -> smoothie');
  });

  it('should pop the value out from the top of the stack', () => {
    stack.pop();
    expect(stack.toString()).toBe('banana -> apple');

    stack.pop();
    expect(stack.toString()).toBe('banana');
  });

  // TODO: change this - must change LinkedList
  it('should not pop the value when there is one node left', () => {
    stack = createStack('strawberry');

    stack.pop();
    expect(stack.toString()).toBe('strawberry');
  });
});

// describe('Queue');

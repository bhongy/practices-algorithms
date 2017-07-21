// @flow

import LinkedList from './linked-list';

describe('Linked List', () => {
  let list;

  beforeEach(() => {
    list = new LinkedList(1);
  });

  it('should start with a node when instantiate', () => {
    expect(list.toString()).toBe('1');
  });

  it('should prepend and update head with the new node', () => {
    list.prepend(99);
    list.prepend(100);

    expect(list.toString()).toBe('100 -> 99 -> 1');
  });

  it('should return the reference of the prepended node', () => {
    const newNode = list.prepend(24.01);
    expect(newNode.value).toBe(24.01);
  });

  it('should shift head node and update head reference', () => {
    list.prepend(5);
    list.prepend(10);

    expect(list.toString()).toBe('10 -> 5 -> 1');

    list.shift();
    expect(list.toString()).toBe('5 -> 1');

    list.shift();
    expect(list.toString()).toBe('1');
  });

  it('should return the reference of the shifted node', () => {
    list.prepend(10);
    list.prepend(100);
    expect(list.toString()).toBe('100 -> 10 -> 1');

    const removed = list.shift();
    // $FlowExpectError: `removed` is nullable (we know, here, it is not)
    expect(removed.value).toBe(100);
  });

  it('should not shift when there is one node left', () => {
    list.shift();
    expect(list.toString()).toBe('1');
  });

  it('should return `undefined` when trying to shift the last remaining node', () => {
    const removed = list.shift();
    expect(removed).toBeUndefined();
  });

  it('should append with the new node correctly', () => {
    list.append(-2);
    list.append(1.6);

    expect(list.toString()).toBe('1 -> -2 -> 1.6');
  });

  it('should return the reference of the appended node', () => {
    const newNode = list.append(981);
    expect(newNode.value).toBe(981);
  });

  it('should pop the last node', () => {
    list.prepend(14);
    list.append(-14);

    expect(list.toString()).toBe('14 -> 1 -> -14');

    list.pop();
    expect(list.toString()).toBe('14 -> 1');

    list.pop();
    expect(list.toString()).toBe('14');
  });

  // power of writing tests! I implemented this wrong and caught it with the test.
  it('should return the reference of the popped node', () => {
    list.prepend(4);
    list.append(16);
    expect(list.toString()).toBe('4 -> 1 -> 16');

    const removed = list.pop();
    // $FlowExpectError: `removed` is nullable (we know, here, it is not)
    expect(removed.value).toBe(16);
  });

  it('should not pop when there is one node left', () => {
    list.pop();
    expect(list.toString()).toBe('1');
  });

  it('should return `undefined` when trying to shift the last remaining node', () => {
    const removed = list.pop();
    expect(removed).toBeUndefined();
  });

  describe('removeWithValue', () => {
    beforeEach(() => {
      list.append(3);
      list.append(2);
      list.append(3);
      list.append(4);
    });

    it('should not change the list if the value is not found', () => {
      list.removeWithValue(10);
      expect(list.toString()).toBe('1 -> 3 -> 2 -> 3 -> 4');
    });

    it('should return `undefined` if no removal is performed', () => {
      const removed = list.removeWithValue(10);
      expect(removed).toBeUndefined();
    });

    it('should remove the first node containing the value', () => {
      list.removeWithValue(3);
      expect(list.toString()).toBe('1 -> 2 -> 3 -> 4');

      list.removeWithValue(2);
      expect(list.toString()).toBe('1 -> 3 -> 4');
    });

    // same. implemented this incorrectly and caught it with the test.
    it('should return the reference of the removed node', () => {
      const removed = list.removeWithValue(4);
      // $FlowExpectError: `removed` is nullable (we know, here, it is not)
      expect(removed.value).toBe(4);
    })

    it('should remove the head node when applicable', () => {
      list.removeWithValue(1);
      expect(list.toString()).toBe('3 -> 2 -> 3 -> 4');
    });

    it('should not remove when there is one node left', () => {
      list = new LinkedList(0);

      const removed = list.removeWithValue(0);

      expect(list.toString()).toBe('0');
      expect(removed).toBeUndefined();
    });
  });
});

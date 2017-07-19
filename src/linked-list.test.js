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

  it('should shift head node and update head reference', () => {
    list.prepend(5);
    list.prepend(10);

    expect(list.toString()).toBe('10 -> 5 -> 1');

    list.shift();
    expect(list.toString()).toBe('5 -> 1');

    list.shift();
    expect(list.toString()).toBe('1');
  });

  it('should not shift when there is one node left', () => {
    list.shift();
    expect(list.toString()).toBe('1');
  });

  it('should append with the new node correctly', () => {
    list.append(-2);
    list.append(1.6);

    expect(list.toString()).toBe('1 -> -2 -> 1.6');
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

  it('should not pop when there is one node left', () => {
    list.pop();
    expect(list.toString()).toBe('1');
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

    it('should remove the first node containing the value', () => {
      list.removeWithValue(3);
      expect(list.toString()).toBe('1 -> 2 -> 3 -> 4');

      list.removeWithValue(2);
      expect(list.toString()).toBe('1 -> 3 -> 4');
    });

    it('should remove the head node when applicable', () => {
      list.removeWithValue(1);
      expect(list.toString()).toBe('3 -> 2 -> 3 -> 4');
    });
  });
});

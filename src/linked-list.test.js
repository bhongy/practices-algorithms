// @flow

import LinkedList, { Node, deleteMiddleNode } from './linked-list';

// "importing" this module to other modules will cause the tests to double run
function expectValue<T>(node: ?Node<T>, value: T) {
  expect(node).toEqual(expect.objectContaining({ value }));
}

describe('Linked List', () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  it('should start with no node when instantiate', () => {
    expect(list.toString()).toBe('');
  });

  describe('prepend', () => {
    it('should add the new node to the beginning of the list and update head', () => {
      list.prepend(5);
      list.prepend(99);
      list.prepend(100);

      expect(list.toString()).toBe('100 -> 99 -> 5');
    });
  });

  describe('shift', () => {
    it('should remove the head node and update head reference', () => {
      list.prepend(5);
      list.prepend(0);
      list.prepend(10);

      expect(list.toString()).toBe('10 -> 0 -> 5');

      list.shift();
      expect(list.toString()).toBe('0 -> 5');

      list.shift();
      expect(list.toString()).toBe('5');
    });

    it('should return the removed node', () => {
      list.prepend(8);
      expectValue(list.shift(), 8);
    });

    it('should remove the last node correctly', () => {
      list.append(64);

      expectValue(list.shift(), 64);
      expect(list.toString()).toBe('');
    });

    it('should not remove node and return `null` when the list is empty', () => {
      expect(list.shift()).toBeNull();
      expect(() => list.shift()).not.toThrow();
    });
  });

  describe('append', () => {
    it('should add the new node to the end of the list', () => {
      list.append(0);
      list.append(-2);
      list.append(1.6);

      expect(list.toString()).toBe('0 -> -2 -> 1.6');
    });
  });

  describe('pop', () => {
    it('should remove the tail node and update head reference', () => {
      list.append(1);
      list.prepend(4);
      list.append(16);

      expect(list.toString()).toBe('4 -> 1 -> 16');

      list.pop();
      expect(list.toString()).toBe('4 -> 1');

      list.pop();
      expect(list.toString()).toBe('4');
    });

    it('should return the removed node', () => {
      list.prepend(4);
      list.append(16);

      expectValue(list.pop(), 16);
    });

    it('should remove the last node correctly', () => {
      list.append(8);

      expectValue(list.pop(), 8);
      expect(list.toString()).toBe('');
    });

    it('should not remove node and return `null` when the list is empty', () => {
      expect(list.pop()).toBeNull();
      expect(() => list.shift()).not.toThrow();
    });
  });

  describe('removeWithValue', () => {
    beforeEach(() => {
      [1, 3, 2, 3, 4].forEach(v => list.append(v));
    });

    it('should not change the list if the value is not found', () => {
      list.removeWithValue(10);
      expect(list.toString()).toBe('1 -> 3 -> 2 -> 3 -> 4');
    });

    it('should return `null` if no removal is performed', () => {
      expect(list.removeWithValue(10)).toBeNull();
    });

    it('should remove the first node containing the value', () => {
      list.removeWithValue(3);
      expect(list.toString()).toBe('1 -> 2 -> 3 -> 4');

      list.removeWithValue(2);
      expect(list.toString()).toBe('1 -> 3 -> 4');
    });

    it('should return the reference of the removed node', () => {
      expectValue(list.removeWithValue(4), 4);
    });

    it('should remove the head node when applicable', () => {
      list.removeWithValue(1);
      expect(list.toString()).toBe('3 -> 2 -> 3 -> 4');
    });

    it('should not remove node and return `null` when the list is empty', () => {
      list = new LinkedList();

      expect(list.removeWithValue(1)).toBeNull();
      expect(list.removeWithValue(NaN)).toBeNull();
      expect(() => list.shift()).not.toThrow();
    });
  });

  describe('isEmpty', () => {
    it('should return `true` when head is null', () => {
      expect(list.isEmpty()).toBe(true);
    });

    it('should return `false` when head is not null', () => {
      list.prepend('^_^');

      expect(list.head).not.toBeNull();
      expect(list.isEmpty()).toBe(false);
    });
  });

  describe('size', () => {
    it('should return the number of nodes in the list', () => {
      expect(list.size()).toBe(0);

      list.prepend(-1.2);
      expect(list.size()).toBe(1);

      list.prepend(30);
      list.append(15.85);
      expect(list.size()).toBe(3);

      list.pop();
      expect(list.size()).toBe(2);

      list.shift();
      expect(list.size()).toBe(1);
    });
  });

  describe('Delete Middle Node', () => {
    let originalResult;

    beforeEach(() => {
      list = new LinkedList();
      ['a', 'bb', 'c', 'ddd', 'e', 'f'].forEach((v: string) => {
        list.append(v);
      });

      originalResult = list.toString();
    });

    describe('When the value to remove is in the list', () => {
      it('should delete the node in the middle', () => {
        deleteMiddleNode(list, 'c');
        expect(list.toString()).toBe('a -> bb -> ddd -> e -> f');

        deleteMiddleNode(list, 'ddd');
        expect(list.toString()).toBe('a -> bb -> e -> f');
      });

      it('should return the removed node', () => {
        const removedNode = deleteMiddleNode(list, 'ddd');
        expectValue(removedNode, 'ddd');
      });

      it('should not remove the first or the last nodes', () => {
        deleteMiddleNode(list, 'a');
        deleteMiddleNode(list, 'f');
        expect(list.toString()).toBe(originalResult);
      });

      it('should not remove any node if list.size is less than 3', () => {
        let removedNode;

        list = new LinkedList();
        removedNode = deleteMiddleNode(list, 'anything');
        expect(removedNode).toBeNull();
        expect(list.toString()).toBe('');

        list.append('abc');
        list.append('def');

        removedNode = deleteMiddleNode(list, 'def');
        expect(removedNode).toBeNull();
        expect(list.toString()).toBe('abc -> def');
      });
    });

    describe('When the value to remove is *not* in the list', () => {
      it('should not do anything and return `null`', () => {
        const removedNode = deleteMiddleNode(list, 'should_not_find');
        expect(removedNode).toBeNull();
        expect(list.toString()).toBe(originalResult);
      });
    });
  });
});

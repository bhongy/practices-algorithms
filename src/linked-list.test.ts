import LinkedList, {deleteMiddleNode} from './linked-list';

describe('Linked List', () => {
  let list: LinkedList<number>;

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
      expect(list.shift()).toBe(8);
    });

    it('should remove the last node correctly', () => {
      list.append(64);

      expect(list.shift()).toBe(64);
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

      [
        // keep multi-line format
        '4 -> 1 -> 16',
        '4 -> 1',
        '4',
      ].forEach((want) => {
        expect(`${list}`).toBe(want);
        list.pop();
      });
    });

    it('should return the removed node', () => {
      list.prepend(4);
      list.append(16);

      expect(list.pop()).toBe(16);
    });

    it('should remove the last node correctly', () => {
      list.append(8);

      expect(list.pop()).toBe(8);
      expect(list.toString()).toBe('');
    });

    it('should not remove node and return `null` when the list is empty', () => {
      expect(list.pop()).toBeNull();
      expect(() => list.shift()).not.toThrow();
    });
  });

  describe('removeWithValue', () => {
    beforeEach(() => {
      [1, 3, 2, 3, 4].forEach((v) => list.append(v));
    });

    it('should not change the list if the value is not found', () => {
      list.removeWithValue(10);
      expect(list.toString()).toBe('1 -> 3 -> 2 -> 3 -> 4');
    });

    it('should return `false` if no removal is performed', () => {
      expect(list.removeWithValue(10)).toBe(false);
    });

    it('should remove the first node containing the value', () => {
      list.removeWithValue(3);
      expect(list.toString()).toBe('1 -> 2 -> 3 -> 4');

      list.removeWithValue(2);
      expect(list.toString()).toBe('1 -> 3 -> 4');
    });

    it('should return `true` if a removal is performed', () => {
      expect(list.removeWithValue(4)).toBe(true);
    });

    it('should remove the head node when applicable', () => {
      list.removeWithValue(1);
      expect(list.toString()).toBe('3 -> 2 -> 3 -> 4');
    });

    it('should not remove node and return `false` when the list is empty', () => {
      list = new LinkedList();

      expect(list.removeWithValue(1)).toBe(false);
      expect(list.removeWithValue(NaN)).toBe(false);
      expect(() => list.shift()).not.toThrow();
    });
  });

  describe('isEmpty', () => {
    it('should return `true` when head is null', () => {
      expect(list.isEmpty()).toBe(true);
    });

    it('should return `false` when head is not null', () => {
      list.prepend(150);

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
    let list: LinkedList<string>;
    let originalResult: string;

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

      it('should not remove the first or the last nodes', () => {
        deleteMiddleNode(list, 'a');
        deleteMiddleNode(list, 'f');
        expect(list.toString()).toBe(originalResult);
      });

      it('should not remove any node if list.size is less than 3', () => {
        list = new LinkedList();
        deleteMiddleNode(list, 'anything');
        expect(list.toString()).toBe('');

        list.append('abc');
        list.append('def');

        deleteMiddleNode(list, 'def');
        expect(list.toString()).toBe('abc -> def');
      });
    });

    describe('When the value to remove is *not* in the list', () => {
      it('should not do anything and return `false`', () => {
        const success = deleteMiddleNode(list, 'should_not_find');
        expect(success).toBe(false);
        expect(list.toString()).toBe(originalResult);
      });
    });
  });
});

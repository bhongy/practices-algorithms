/*
0 - 1 - 3 - 7
          - 8
      - 4 - 9
          - 10
  - 2 - 5 - 11
          - 12
      - 6 - 13
          - 14
*/
const util = {
  leftChildIndex(i: number): number {
    return 2 * i + 1;
  },
  rightChildIndex(i: number): number {
    return 2 * i + 2;
  },
  parentIndex(i: number): number {
    if (i <= 0) {
      // throw new RangeError(`${i} does not have a parent.`);
      return -1;
    }
    return Math.trunc((i - 1) / 2);
  },
  swap<T>(xs: Array<T>, i: number, j: number): void {
    const temp = xs[i];
    xs[i] = xs[j];
    xs[j] = temp;
  },
};

export class MinHeap<T extends number> {
  store: Array<T> = [];

  // constructor() {
  //   this.store = [];
  // }

  peek(): T | null {
    if (this.store.length === 0) {
      return null;
    }
    return this.store[0];
  }

  pop(): T | null {
    if (this.store.length === 0) {
      return null;
    }
    const item = this.store[0]; // take the first item
    const lastIndex = this.store.length - 1;
    this.store[0] = this.store[lastIndex];
    this.store.pop();
    this.heapifyDown();
    return item;
  }

  heapifyDown(): void {
    let currentIndex = 0;
    let leftChildIndex = util.leftChildIndex(currentIndex);
    let leftChild = this.store[leftChildIndex];
    // 0 is falsy, don't `while (leftChild)`
    while (leftChild != null) {
      const rightChildIndex = util.rightChildIndex(currentIndex);
      const rightChild = this.store[rightChildIndex];
      let smallerChildIndex = leftChildIndex;
      if (rightChild != null && rightChild < leftChild) {
        smallerChildIndex = rightChildIndex;
      }
      if (this.store[currentIndex] <= this.store[smallerChildIndex]) {
        return;
      }
      util.swap(this.store, currentIndex, smallerChildIndex);
      currentIndex = smallerChildIndex;
      leftChildIndex = util.leftChildIndex(currentIndex);
      leftChild = this.store[leftChildIndex];
    }
  }

  push(item: T): this {
    this.store.push(item);
    this.heapifyUp();
    return this; // so user can cleanly chain/reduce
  }

  heapifyUp(): void {
    let currentIndex = this.store.length - 1;
    let parentIndex = util.parentIndex(currentIndex);
    while (
      parentIndex > -1 &&
      this.store[currentIndex] < this.store[parentIndex]
    ) {
      util.swap(this.store, currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = util.parentIndex(currentIndex);
    }
  }
}

export default undefined;

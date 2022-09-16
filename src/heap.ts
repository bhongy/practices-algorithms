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

export class MinHeap<T extends number> {
  items: Array<T> = [];

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  peek(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  pop(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const item = this.items[0];
    const lastIndex = this.items.length - 1;
    this.items[0] = this.items[lastIndex];
    this.items.pop(); // shrink the array
    this.heapifyDown();
    return item;
  }

  push(item: T): this {
    this.items.push(item);
    this.heapifyUp();
    return this; // so user can cleanly chain/reduce
  }

  private static leftChildIndex(i: number): number {
    return 2 * i + 1;
  }

  private static rightChildIndex(i: number): number {
    return 2 * i + 2;
  }

  private static parentIndex(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  private hasLeftChild(i: number): boolean {
    return MinHeap.leftChildIndex(i) < this.items.length;
  }

  private hasRightChild(i: number): boolean {
    return MinHeap.rightChildIndex(i) < this.items.length;
  }

  private hasParent(i: number): boolean {
    return MinHeap.parentIndex(i) >= 0;
  }

  private leftChild(i: number): number {
    return this.items[MinHeap.leftChildIndex(i)];
  }

  private rightChild(i: number): number {
    return this.items[MinHeap.rightChildIndex(i)];
  }

  private parent(i: number): number {
    return this.items[MinHeap.parentIndex(i)];
  }

  private swap(i: number, j: number): void {
    const xs = this.items;
    [xs[i], xs[j]] = [xs[j], xs[i]];
  }

  private heapifyDown(): void {
    let i = 0;
    while (this.hasLeftChild(i)) {
      const smallerChildIndex =
        this.hasRightChild(i) && this.rightChild(i) < this.leftChild(i)
          ? MinHeap.rightChildIndex(i)
          : MinHeap.leftChildIndex(i);

      if (this.items[i] <= this.items[smallerChildIndex]) {
        return;
      }

      this.swap(i, smallerChildIndex);
      i = smallerChildIndex;
    }
  }

  private heapifyUp(): void {
    let i = this.items.length - 1;
    while (this.hasParent(i) && this.parent(i) > this.items[i]) {
      const pi = MinHeap.parentIndex(i);
      this.swap(i, pi);
      i = pi;
    }
  }
}

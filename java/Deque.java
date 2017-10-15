import edu.princeton.cs.algs4.StdOut;

import java.util.Iterator;
import java.util.NoSuchElementException;

public class Deque<Item> implements Iterable<Item> {
    private Item[] store;
    private int itemCount;
    private int head;
    private int tail;

    public Deque() {
        store = (Item[]) new Object[1]; // can we start with 2
        itemCount = 0;
        // this implementation: the pointers point to the live store position
        // i.e. we move pointer first then put the value
        // so the current position of the pointers are the recently added values
        head = 0;
        tail = 0;
    }

    public boolean isEmpty() {
        return itemCount == 0;
    }

    public int size() {
        return itemCount;
    }

    // immutable, return a new index within [0, store.length - 1] (wrap-around)
    private int wrapAround(int index) {
        int n = store.length;
        return (index + n) % n;
    }

    private void resize(int capacity) {
        Item[] copy = (Item[]) new Object[capacity];
        for (int i = 0; i < itemCount; i++) {
            copy[i] = store[wrapAround(i + head)];
        }
        store = copy;
        head = 0;
        tail = itemCount - 1;
    }

    private void validateItemType(Item item) {
        if (item == null) {
            throw new IllegalArgumentException("Must provide non-null value as the item argument.");
        }
    }

    private void ensureCapacity() {
        if (itemCount == store.length) {
            resize(store.length * 2);
        }
    }

    public void addFirst(Item item) {
        validateItemType(item);
        ensureCapacity();
        head = wrapAround(head - 1);
        store[head] = item;
        itemCount++;
    }

    public void addLast(Item item) {
        validateItemType(item);
        ensureCapacity();
        tail = wrapAround(tail + 1);
        store[tail] = item;
        itemCount++;
    }

    private void ensureItemAvailability() {
        if (isEmpty()) {
            throw new NoSuchElementException();
        }
    }

    private void compactCapacityAtThreshold() {
        if (itemCount > 0 && itemCount <= store.length / 4) {
            resize(store.length / 2);
        }
    }

    private Item remove(int i) {
        Item item = store[i];
        store[i] = null;
        itemCount--;
        compactCapacityAtThreshold();
        return item;
    }

    public Item removeFirst() {
        // don't put in `removeItemAt` because we have to guard changing pointer
        ensureItemAvailability();

        int i = head;
        head = wrapAround(head + 1);
        return remove(i);
    }

    public Item removeLast() {
        // don't put in `removeItemAt` because we have to guard changing pointer
        ensureItemAvailability();

        int i = tail;
        tail = wrapAround(tail - 1);
        return remove(i);
    }

    private class ArrayIterator implements Iterator<Item> {
        private int i = 0;

        public boolean hasNext() {
            return i < itemCount;
        }

        public Item next() {
            // cannot use `ensureItemAvailability`
            // because conditional to check is different
            // here we check against `iterator.i`
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            Item item = store[wrapAround(i + head)];
            i++;
            return item;
        }

        public void remove() {
            throw new UnsupportedOperationException();
        }
    }

    public Iterator<Item> iterator() {
        return new ArrayIterator();
    }

    public static void main(String[] args) {
        StdOut.println("- Initialize");
        Deque<Integer> intDeque = new Deque<>();
        StdOut.println("Expect empty: " + intDeque.isEmpty());
        StdOut.println();

        StdOut.println("- Add 3 items");
        intDeque.addLast(-1);
        intDeque.addFirst(13);
        intDeque.addFirst(2);
        StdOut.print("Expect: 2, 13, -1, -> Actual: ");
        for (int num : intDeque) {
            StdOut.print(num + ", ");
        }
        StdOut.println();
        StdOut.println("Current size: " + intDeque.size() + " (expect 3)");
        StdOut.println();

        StdOut.println("- Remove 2 items");
        StdOut.println("Remove first: "+ intDeque.removeFirst());
        StdOut.println("Remove last: "+ intDeque.removeLast());
        StdOut.print("Expect: 13, -> Actual: ");
        for (int num : intDeque) {
            StdOut.print(num + ", ");
        }
        StdOut.println();
        StdOut.println();

        StdOut.println("- Removing the last item");
        intDeque.removeFirst();
        StdOut.println("Expect empty: " + intDeque.isEmpty());
        StdOut.println();

        StdOut.println("- Add 2 items");
        intDeque.addFirst(28);
        intDeque.addLast(-74);
        StdOut.print("Expect: 28, -74, -> Actual: ");
        for (int num : intDeque) {
            StdOut.print(num + ", ");
        }
        StdOut.println();
        StdOut.println();

        StdOut.println("- use multiple instances of iterators in the same time");
        StdOut.println("Expect:");
        StdOut.println("(28,28)");
        StdOut.println("(28,-74)");
        StdOut.println("(-74,28)");
        StdOut.println("(-74,-74)");
        StdOut.println("Actual:");
        for (int x : intDeque) {
            for (int y : intDeque) {
                StdOut.println("(" + x + "," + y + ")");
            }
        }
    }
}

import edu.princeton.cs.algs4.StdOut;
import edu.princeton.cs.algs4.StdRandom;

import java.util.Iterator;
import java.util.NoSuchElementException;

public class RandomizedQueue<Item> implements Iterable<Item> {
    private Item[] store;
    private int n;

    public RandomizedQueue() {
        store = (Item[]) new Object[1];
        n = 0;
    }

    public boolean isEmpty() {
        return n == 0;
    }

    public int size() {
        return n;
    }

    private void resize(int capacity) {
        Item[] copy = (Item[]) new Object[capacity];
        for (int i = 0; i < n; i++) {
            copy[i] = store[i];
        }
        store = copy;
    }

    private void ensureCapacity() {
        if (n == store.length) {
            resize(store.length * 2);
        }
    }

    private void compactCapacity() {
        if (n > 0 && n <= store.length / 4) {
            resize(store.length / 2);
        }
    }

    private void swap(int i, int j) {
        if (i == j) return;
        Item temp = store[i];
        store[i] = store[j];
        store[j] = temp;
    }

    /*
    anytime we enqueue, we swap it with one of what we currently have
    so in effect, we enqueue new item to a random position

    - put the new item at the end of the queue (more like a top of stack)
      (position `n`) - at this point, `n` is where we'll "write"
    - get a random number from [0, n] (inclusive)
    - swap store[n] and store[randomIndex] -> note: randomIndex can be `n`
      note: I want to include (n, n) so there's equal chance that
            the enqueuing item will go to the end of the queue
    - increment n
     */
    public void enqueue(Item item) {
        if (item == null) {
            throw new IllegalArgumentException("Must provide non-null value as the item argument.");
        }

        ensureCapacity();
        store[n] = item;
        // if swap(n, n) - it'll be noop
        swap(n, StdRandom.uniform(n + 1)); // + 1 because we want to include `n`
        n++;
    }

    private void ensureItemAvailability() {
        if (isEmpty()) {
            throw new NoSuchElementException();
        }
    }

    // remove and return a random item
    // only need to return the top of the stack since we enqueue random
    public Item dequeue() {
        ensureItemAvailability();

        // note: `n` points to "empty, to-write" spot
        // so we need to decrement before grabbing the last value
        n--;
        Item item = store[n];
        store[n] = null; // de-reference, avoid loitering
        compactCapacity();
        return item;
    }

    // return a random item (but do not remove it)
    public Item sample() {
        ensureItemAvailability();

        // `n` instead of `n + 1` because we only want "live" nodes
        return store[StdRandom.uniform(n)];
    }

    private class RandomizedArrayIterator implements Iterator<Item> {
        private final Item[] randomizedStore;
        private int i;

        public RandomizedArrayIterator() {
            randomizedStore = (Item[]) new Object[n]; // only live nodes
            for (int j = 0; j < n; j++) {
                randomizedStore[j] = store[j];
            }
            StdRandom.shuffle(randomizedStore);
            i = 0;
        }

        public boolean hasNext() {
            return i < n;
        }

        public Item next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            Item item = randomizedStore[i];
            i++;
            return item;
        }

        public void remove() {
            throw new UnsupportedOperationException();
        }
    }

    public Iterator<Item> iterator() {
        return new RandomizedArrayIterator();
    }

    public static void main(String[] args) {
        StdOut.println("- Initialize");
        RandomizedQueue<Integer> q = new RandomizedQueue<Integer>();
        StdOut.println("Expect empty: " + q.isEmpty());
        StdOut.println();

        q.enqueue(4);
        q.dequeue();
        q.enqueue(12);
        q.enqueue(1);
        q.enqueue(2);
        q.dequeue();
        q.enqueue(100);
        StdOut.println("Expect size: 3 -> Actual: " + q.size());
        StdOut.println("numbers left in queue: ");
        for (int num : q) {
            StdOut.print(num + ", ");
        }

        q.dequeue();
        q.dequeue();
        q.dequeue();
        StdOut.println("Expect empty: " + q.isEmpty());
    }
}

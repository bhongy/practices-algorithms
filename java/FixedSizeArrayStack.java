import java.util.Iterator;
import java.util.NoSuchElementException;

// naive implementation - asking client to manage capacity
public class FixedSizeArrayStack<Item> implements Iterable<Item> {
    private Item[] s;
    private int n = 0;

    public FixedSizeArrayStack(int capacity) {
        // array of generics does not support in Java
        // s = new Item[capacity];
        s = (Item[]) new Object[capacity];
    }

    public boolean isEmpty() {
        return n == 0;
    }

    public void push(Item item) {
        s[n] = item;
        n++;
    }

    public Item pop() {
        n--;
        Item item = s[n];
        s[n] = null; // de-reference to avoid loitering
        return item;
    }

    public class ReverseArrayIterator implements Iterator<Item> {
        private int i = n - 1;

        public boolean hasNext() {
            return i >= 0;
        }

        public void remove() {
            throw new UnsupportedOperationException();
        }

        public Item next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            Item item = s[i];
            i--;
            return item;
            // return s[i--];
        }
    }

    public Iterator<Item> iterator() {
        return new ReverseArrayIterator();
    }
}
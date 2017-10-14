import java.util.Iterator;
import java.util.NoSuchElementException;

public class LinkedQueue<Item> implements Iterable<Item> {
    private Node front, back;
    private class Node {
        Item item;
        Node next;
    }

    public boolean isEmpty() {
        return front == null;
    }

    public void enqueue(Item item) {
        Node node = new Node();
        node.item = item;

        if (isEmpty()) {
            front = node;
            back = node;
        } else {
            back.next = node;
            back = back.next;
        }
    }

    // identical to Stack.pop()
    public Item dequeue() {
        Item item = front.item;
        front = front.next;
        if (isEmpty()) {
            back = null;
        }
        return item;
    }

    private class ListIterator implements Iterator<Item> {
        private Node current = front;

        public boolean hasNext() {
            return current != null;
        }

        public void remove() {
            throw new UnsupportedOperationException();
        }

        public Item next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            Item item = current.item;
            current = current.next;
            return item;
        }
    }

    public Iterator<Item> iterator() {
        return new ListIterator();
    }
}

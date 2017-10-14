import java.util.Iterator;
import java.util.NoSuchElementException;

public class LinkedStack<Item> implements Iterable<Item> {
    private Node top = null;
    private class Node {
        Item item;
        Node next;
    }

    public boolean isEmpty() {
        return top == null;
    }

    public void push(Item item) {
        Node node = new Node();
        node.item = item;
        node.next = top;
        top = node;
        /*
        Node prevTop = top;
        top = new Node();
        top.item = item;
        top.next = prevTop;
        */
    }

    public Item pop() {
        Item item = top.item;
        top = top.next;
        return item;
    }

    private class ListIterator implements Iterator<Item> {
        private Node current = top;

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

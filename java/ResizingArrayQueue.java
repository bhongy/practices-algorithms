import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;

import java.util.NoSuchElementException;

public class ResizingArrayQueue<Item> {
    private Item[] q;
    private int n;
    private int head;
    private int tail;

    public ResizingArrayQueue() {
        q = (Item[]) new Object[1];
        n = 0;
        head = 0;
        tail = 0;
    }

    private void resize(int capacity) {
        Item[] copy = (Item[]) new Object[capacity];
        for (int i = 0; i < n; i++) {
            copy[i] = q[(head + i) % q.length];
        }
        q = copy;
        head = 0;
        tail = n; // next empty position to "enqueue"
    }

    public boolean isEmpty() {
        return n == 0;
    }

    public int size() {
        return n;
    }

    public void enqueue(Item item) {
        if (n == q.length) {
            resize(q.length * 2);
        }
        q[tail] = item;
        // move tail pointer to the next, wrap-around to 0 if out-of-bound
        tail = (tail + 1) % q.length;
        n++;
    }

    public Item dequeue() {
        if (isEmpty()) {
            throw new NoSuchElementException("Attempting to dequeue an empty queue.");
        }

        Item item = q[head];
        q[head] = null;
        head = (head + 1) % q.length;
        n--;
        if (n > 0 && n == q.length / 4) {
            resize(q.length / 2);
        }
        return item;
    }

    public static void main(String[] args) {
        ResizingArrayQueue<String> queue = new ResizingArrayQueue<>();
        while (!StdIn.isEmpty()) {
            String s = StdIn.readString();
            if (s.equals("-")) {
                if (queue.isEmpty()) {
                    StdOut.println("Cannot dequeue. The queue is empty.");
                } else {
                    StdOut.println("Dequeued: " + queue.dequeue());
                }
            } else {
                queue.enqueue(s);
            }
        }
        StdOut.println("(" + queue.size() + " left on queue)");
    }
}

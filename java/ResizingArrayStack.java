import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;
import java.util.NoSuchElementException;

public class ResizingArrayStack<Item> {
    private Item[] s;
    private int n;

    public ResizingArrayStack() {
        s = (Item[]) new Object[1];
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
            copy[i] = s[i];
        }
        s = copy;
    }

    public void push(Item item) {
        // if n == s.length the array is full and we cannot set at s[n] (out of bound index)
        // need to double the size before "pushing" the new item
        if (n == s.length) {
            resize(s.length * 2);
        }
        s[n] = item;
        n++;
    }

    public Item pop() {
        if (isEmpty()) {
            throw new NoSuchElementException("Attempting to pop an empty stack.");
        }

        n--;
        Item item = s[n];
        s[n] = null; // de-reference to avoid loitering
        if (n > 0 && n == s.length / 4) {
            resize(s.length / 2);
        }
        return item;
    }

    public static void main(String[] args) {
        ResizingArrayStack<String> stack = new ResizingArrayStack<>();
        while (!StdIn.isEmpty()) {
            String s = StdIn.readString();
            if (s.equals("-")) {
                if (!stack.isEmpty()) StdOut.println("Popped: " + stack.pop());
            } else {
                stack.push(s);
            }
        }
        StdOut.println("(" + stack.size() + " left on stack)");
    }
}

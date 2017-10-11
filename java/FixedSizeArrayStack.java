// naive implementation - asking client to manage capacity
public class FixedSizeArrayStack<Item> {
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
}

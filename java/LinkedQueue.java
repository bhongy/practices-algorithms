public class LinkedQueue<Item> {
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
}

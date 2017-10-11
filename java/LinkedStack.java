public class LinkedStack<Item> {
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
}

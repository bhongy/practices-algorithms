public class QueueFromTwoStacks<Item> {
    private ResizingArrayStack<Item> inbox = new ResizingArrayStack<>();
    private ResizingArrayStack<Item> outbox = new ResizingArrayStack<>();

    public boolean isEmpty() {
        return inbox.isEmpty() && outbox.isEmpty();
    }

    public int size() {
        return inbox.size() + outbox.size();
    }

    public void enqueue(Item item) {
        inbox.push(item);
    }

    public Item dequeue() {
        // outbox is always in the reversed order of entries
        // popping guarantees returning the oldest item
        if (!outbox.isEmpty()) {
            return outbox.pop();
        }

        // if outbox is empty move all elements from inbox to outbox
        // which, in effect, create a stack of reverse entries
        while (!inbox.isEmpty()) {
            outbox.push(inbox.pop());
        }
        return outbox.pop();
    }
}

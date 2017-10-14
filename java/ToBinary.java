import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;

public class ToBinary {
    public static void main(String[] args) {
        while (!StdIn.isEmpty()) {
            ResizingArrayStack<Integer> stack = new ResizingArrayStack<>();
            int num = StdIn.readInt();
            while (num > 0) {
                stack.push(num % 2);
                num = num / 2;
            }
            for (int digit : stack) {
                StdOut.print(digit);
            }
            StdOut.println();
        }
    }
}

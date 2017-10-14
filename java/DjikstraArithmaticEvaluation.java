import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;

public class DjikstraArithmaticEvaluation {
    public static void main(String[] args) {
        ResizingArrayStack<String> operators = new ResizingArrayStack<>();
        ResizingArrayStack<Double> values = new ResizingArrayStack<>();
        while (!StdIn.isEmpty()) {
            String s = StdIn.readString();
            switch (s) {
                case "(":
                    break;
                case "+":
                case "*":
                    operators.push(s);
                    break;
                case ")":
                    double a = values.pop();
                    double b = values.pop();
                    double result = 0.0;

                    switch (operators.pop()) {
                        case "+":
                            result = a + b;
                            break;
                        case "*":
                            result = a * b;
                            break;
                    }

                    values.push(result);
                    break;
                default:
                    values.push(Double.parseDouble(s));
            }
        }
        StdOut.println(values.pop());
    }
}

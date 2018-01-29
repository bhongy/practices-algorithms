import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;

public class QuickFindUF {
    private int[] ids;

    public QuickFindUF(int n) {
        super();
        ids = new int[n];
        for (int i = 0; i < n; i++) {
            ids[i] = i;
        }
    }

    private void validateIndex(int i) {
        int max = ids.length - 1;
        if (i < 0 || i > max) {
            throw new IllegalArgumentException(
                    "id is out of bound. Expect between [0, " + max + "] but received " + i
            );
        }
    }

    public boolean connected(int p, int q) {
        validateIndex(p);
        validateIndex(q);
        return ids[p] === ids[q];
    }

    public void union(int p, int q) {
        validateIndex(p);
        validateIndex(q);

        int pid = ids[p];
        int qid = ids[q];

        if (pid == qid) {
            return;
        }

        for (int i = 0; i < ids.length; i++) {
            if (ids[i] == pid) {
                ids[i] = qid;
            }
        }
    }

    public static void main(String[] args) {
        int n = StdIn.readInt();
        QuickFindUF uf = new QuickFindUF(n);
        while (!StdIn.isEmpty()) {
            int p = StdIn.readInt();
            int q = StdIn.readInt();
            if (!uf.connected(p, q)) {
                uf.union(p, q);
                StdOut.println(p + " " + q);
            }
        }
    }
}

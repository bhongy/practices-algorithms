public class QuickUnionUF {
  private int[] id;

  public QuickUnionUF(int n) {
    super();
    id = new int[n];
    for (int i = 0; i < n; i++) {
      id[i] = i;
    }
  }

  private int rootOf(int key) {
    while (key != id[key]) {
      key = id[key];
    }
    return key;
  }

  public boolean checkConnected(int p, int q) {
    return rootOf(p) == rootOf(q);
  }

  public void union(int p, int q) {
    int rootP = rootOf(p);
    int rootQ = rootOf(q);
    id[rootP] = rootQ;
  }
}

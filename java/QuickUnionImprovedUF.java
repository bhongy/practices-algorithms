public class QuickUnionImprovedUF {
  private int[] id;
  private int[] size;

  public QuickUnionImprovedUF(int n) {
    super();
    id = new int[n];
    size = new int[n];
    for (int i = 0; i < n; i++) {
      id[i] = i;
      size[i] = 1;
    }
  }

  private int rootOf(int key) {
    while (key != id[key]) {
      // make every other node in path point to its grandparent
      // not as good as totally flattening but close, in practice
      id[key] = id[id[key]];
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
    if (rootP == rootQ) {
      return;
    }

    int sizeP = size[rootP];
    int sizeQ = size[rootQ];
    if (sizeP < sizeQ) {
      id[rootP] = rootQ;
      size[sizeQ] += sizeP;
    } else {
      id[rootQ] = rootP;
      size[rootP] = sizeQ;
    }
  }
}

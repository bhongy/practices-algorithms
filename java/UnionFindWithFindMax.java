public class UnionFindWithFindMax {
  private int[] ids;
  private int[] max;
  private int[] sizes;

  public UnionFindWithFindMax(int n) {
    super();
    ids = new int[n];
    max = new int[n];
    sizes = new int[n];
    for (int i = 0; i < n; i++) {
      ids[i] = i;
      max[i] = i;
      sizes[i] = 1;
    }
  }

  private int rootOf(int id) {
    while (id != ids[id]) {
      int parent = ids[id];
      int grandParent = ids[parent];
      ids[id] = grandParent;
      id = grandParent;
    }
    return id;
  }

  public boolean connected(int p, int q) {
    return rootOf(p) == rootOf(q);
  }

  public int find(int id) {
    return max[rootOf(id)];
  }

  public void union(int p, int q) {
    int rootP = rootOf(p);
    int rootQ = rootOf(q);
    if (rootP == rootQ) {
      return;
    }

    // anytime we union, maintain the max value of the tree
    // as with size, we only care that the root of the tree has the correct value
    int maxP = max[rootP];
    int maxQ = max[rootQ];
    if (maxP < maxQ) {
      max[rootP] = maxQ;
    } else {
      max[rootQ] = maxP;
    }

    int nP = sizes[rootP];
    int nQ = sizes[rootQ];
    if (nP < nQ) {
      ids[rootP] = rootQ;
      sizes[rootQ] += nP;
    } else {
      ids[rootQ] = rootP;
      sizes[rootP] += nQ;
    }
  }
}

public class SuccessorWithDelete {
  private int[] ids;
  private int[] max;
  private int[] sizes;

  public SuccessorWithDelete(int n) {
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

  private void union(int p, int q) {
    int rootP = rootOf(p);
    int rootQ = rootOf(q);
    if (rootP == rootQ) {
      return;
    }

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
      sizes[rootQ] += rootP;
    } else {
      ids[rootQ] = rootP;
      sizes[rootP] += rootQ;
    }
  }

  public void remove(int id) {
    if (id == ids[id]) {
      union(id, id + 1);
    }
  }

  // like find from UnionFindWithFindMax except we return value + 1
  public int successorOf(int id) {
    return max[rootOf(id)] + 1;
  }
}

/*
Idea for the solution:
  All users are connected when all node converge into a single tree.
  We keep track of the size of the tree
  using Weighted Quick-Union with Path Compression.

  Run through union opertations (m) from the log one by one until
  the size is equals to (n).
*/

public class SocialNetworkConnectivity {
  private int[] userIds;
  private int[] userConnections;

  public SocialNetworkConnectivity(int numUsers) {
    super();
    userIds = new int[numUsers];
    userConnections = new int[numUsers];
    for (int i = 0; i < numUsers; i++) {
      userIds[i] = i;
      userConnections[i] = 1;
    }
  }

  private int rootOf(int id) {
    while (id != userIds[id]) {
      int parent = userIds[id];
      int grandParent = userIds[parent];
      // === Path Compression ===
      // change current to point to grand parent
      // (or the parent if it's the root - pointing to itself)
      userIds[id] = grandParent;
      // do the "walk" after path compression
      // so we "jump" to the updated parent are the the tree is compressed
      id = grandParent;
    }
    return id;
  }

  // O(lg*n) time with path compression
  public boolean checkConnected(int p, int q) {
    return rootOf(p) == rootOf(q);
  }

  // O(lg*n) time with path compression via `rootOf`
  // mutative, change state of the instance
  public void connect(int p, int q) { // union
    int rootP = rootOf(p);
    int rootQ = rootOf(q);
    if (rootP == rootQ) {
      return;
    }

    int nP = userConnections[rootP];
    int nQ = userConnections[rootQ];
    if (nP < nQ) {
      // 1 is smaller, point root of 1 to 2
      // now size of 2 includes 1
      userIds[rootP] = rootQ;
      userConnections[rootQ] += nP;
    } else {
      userIds[rootQ] = rootP;
      userConnections[rootP] += nQ;
    }
  }

  // size of the connected component contains i
  public int size(int id) {
    int root = rootOf(id);
    return userConnections[root];
  }

  public static void main(String[] args) {
    // get n
    // get log of connections (length m)
    // run loop to process connections (<= m times) or until connect size >= n
    // keep track of loop count
    int n = Integer.parseInt(args[0]);
    // don't know how to get declare and get `connections`
    // int[] connections ... is it an array of tuples [p, q]
    int m = 0;
    SocialNetworkConnectivity network = new SocialNetworkConnectivity(n);

    for (int i = 0; i < m; i++) {
      // don't know how to get `p` and `q`
      int p = 0;
      int q = 0;
      network.connect(p, q);

      int size = Math.max(network.size(p), network.size(q));
      if (size >= n) {
        System.out.println("All users are connected.");
        System.out.println("The loop ran for " + (i + 1) + "times.");
        System.out.println("Current size of the tree: " + size);
        return;
      }
    }

    System.out.println("Exhausted the connections list but users are not all connected.");
  }
}

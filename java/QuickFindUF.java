public class QuickFindUF {
  private int[] id;

  public QuickFindUF(int N) {
    super();
    id = new int[N];
    for (int i = 0; i < N; i++) {
      id[i] = i;
    }
  }

  public boolean connected(int p, int q) {
    return id[p] == id[q];
  }

  public void union(int p, int q) {
    int pid = this.id[p];
    int qid = this.id[q];

    if (pid == qid) {
      return;
    }

    for (int i = 0; i < id.length; i++) {
      if (id[i] == pid) {
        id[i] = qid;
      }
    }
  }
}

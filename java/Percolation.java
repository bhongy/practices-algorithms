import edu.princeton.cs.algs4.WeightedQuickUnionUF;

public class Percolation {
  private final WeightedQuickUnionUF sites;
  private final int dimension; // use for validations, calculations
  private boolean[] openSites;
  private int openCount; // to return numberOfOpenSites() at constant time

  private final int top; // index of virtual top site
  private final int bottom; // index of virtual bottom site

  // O(n^2) time
  public Percolation(int n) {
    super();
    if (n <= 0) {
      throw new IllegalArgumentException();
    }

    // +2 to use `0` as virtual top site
    // and `length - 1` as virtual bottom site
    int length = (n * n) + 2;
    sites = new WeightedQuickUnionUF(length);
    openSites = new boolean[length];
    openCount = 0; // don't count virtual top site
    dimension = n;

    top = 0;
    openSites[top] = true;

    bottom = length - 1;
    openSites[bottom] = true;
  }

  private void validate(int row, int col) {
    if (row < 1 || row > dimension) {
      throw new IllegalArgumentException(
        "row " + row + " must be between 1 and " + dimension
      );
    }
    if (col < 1 || col > dimension) {
      throw new IllegalArgumentException(
        "col " + col + " must be between 1 and " + dimension
      );
    }
  }

  private int indexOf(int row, int col) {
    return (row - 1) * dimension + col;
  }

  private int indexOfWithValidation(int row, int col) {
    validate(row, col);
    return indexOf(row, col);
  }

  private void connectIfOpen(int selfIndex, int targetRow, int targetCol) {
    if (isOpen(targetRow, targetCol)) {
      sites.union(selfIndex, indexOf(targetRow, targetCol));
    }
  }

  public void open(int row, int col) {
    int i = indexOfWithValidation(row, col);
    if (!isOpen(row, col)) {
      openSites[i] = true;
      openCount += 1;

      if (row > 1) {
        connectIfOpen(i, row - 1, col);
      } else {
        sites.union(i, top);
      }

      if (row < dimension) {
        connectIfOpen(i, row + 1, col);
      } else {
        sites.union(i, bottom);
      }

      if (col > 1) {
        connectIfOpen(i, row, col - 1);
      }

      if (col < dimension) {
        connectIfOpen(i, row, col + 1);
      }
    }
  }

  public boolean isOpen(int row, int col) {
    int i = indexOfWithValidation(row, col);
    return openSites[i];
  }

  public boolean isFull(int row, int col) {
    int i = indexOfWithValidation(row, col);
    // short circuit with `isOpen` so we don't have to pay
    // log n time to call `sites.connected` if the site is not open
    return isOpen(row, col) && sites.connected(top, i);
  }

  public int numberOfOpenSites() {
    return openCount;
  }

  public boolean percolates() {
    return sites.connected(top, bottom);
  }
}

import edu.princeton.cs.algs4.StdOut;
import edu.princeton.cs.algs4.StdRandom;
import edu.princeton.cs.algs4.StdStats;

public class PercolationStats {
  private static final double Z95 = 1.96;
  private final double mean;
  private final double stddev;
  private final double count;

  public PercolationStats(int n, int numTrials) {
    super();
    if (n <= 0) {
      throw new IllegalArgumentException(n + " must be larger than 0");
    }
    if (numTrials <= 0) {
      throw new IllegalArgumentException(numTrials  + " must be larger than 0");
    }

    double[] records = new double[numTrials];
    for (int i = 0; i < numTrials; i++) {
      Percolation percolation = new Percolation(n);
      while (!percolation.percolates()) {
        int row = StdRandom.uniform(1, n + 1);
        int col = StdRandom.uniform(1, n + 1);
        percolation.open(row, col);
      }
      records[i] = 1.0 * percolation.numberOfOpenSites() / (n * n);
    }

    mean = StdStats.mean(records);
    stddev = StdStats.stddev(records);
    count = numTrials;
  }

  public double mean() {
    return mean;
  }

  public double stddev() {
    return stddev;
  }

  private double confidenceDiff() {
    return Z95 * stddev / Math.sqrt(count);
  }

  public double confidenceLo() {
    return mean - confidenceDiff();
  }

  public double confidenceHi() {
    return mean + confidenceDiff();
  }

  public static void main(String[] args) {
    int n = Integer.parseInt(args[0]);
    int numTrials = Integer.parseInt(args[1]);
    PercolationStats stat = new PercolationStats(n, numTrials);

    StdOut.println("mean                    = " + stat.mean());
    StdOut.println("stddev                  = " + stat.stddev());
    StdOut.println(
      "95% confidence interval = " +
      "[" +
      stat.confidenceLo() +
      ", " +
      stat.confidenceHi() +
      "]"
    );
  }
}

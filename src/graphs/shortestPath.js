const edges = [
  ['w', 'x'],
  ['x', 'y'],
  ['z', 'y'],
  ['z', 'v'],
  ['w', 'v'],
];

function toAdjacencyList(edges) {
  const graph = {};
  for (const [a, b] of edges) {
    graph[a] = graph[a] ?? [];
    graph[a].push(b);
    graph[b] = graph[b] ?? [];
    graph[b].push(a);
  }
  return graph;
}

function shortestPath(edges, src, dst) {
  const graph = toAdjacencyList(edges);
  const visited = new Set();
  const queue = [[src, 0]];

  while (queue.length > 0) {
    const [node, distance] = queue.shift();
    if (node === dst) {
      return distance;
    }
    if (visited.has(node)) {
      continue;
    }
    visited.add(node);
    queue.push(...graph[node].map((n) => [n, distance + 1]));
  }

  return -1;
}

console.log(shortestPath(edges, 'w', 'z')); // 2

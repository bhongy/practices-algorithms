const edges = [
  ['i', 'j'],
  ['k', 'i'],
  ['m', 'k'],
  ['k', 'l'],
  ['o', 'n'],
];

function buildGraph(edges) {
  const graph = {};
  for (const [a, b] of edges) {
    graph[a] = graph[a] ?? [];
    graph[a].push(b);
    graph[b] = graph[b] ?? [];
    graph[b].push(a);
  }
  return graph;
}

console.log(buildGraph(edges));

function hasPathDFS(edges, src, dst) {
  const graph = buildGraph(edges); // O(e) time, O(n) space
  // const stack = [src];
  const visited = new Set();
  return recurseHasPathDFS(graph, src, dst, visited);
  // while (stack.length > 0) {
  //   const current = stack.pop();
  //   if (current === dst) {
  //     return true;
  //   }
  //   if (visited.has(current)) {
  //     continue;
  //   }
  //   const neighbors = graph[current] ?? [];
  //   stack.push(...neighbors);
  //   visited.add(current);
  // }
  // return false;
}

function recurseHasPathDFS(graph, src, dst, visited) {
  if (src === dst) {
    return true;
  }

  if (visited.has(src)) {
    return false;
  }

  visited.add(src);
  return graph[src].some((n) => recurseHasPathDFS(graph, n, dst, visited));
}

// console.log(hasPathDFS(edges, 'j', 'm'));

function hasPathBFS(edges, src, dst) {
  const graph = buildGraph(edges); // O(e) time, O(n) space
  const queue = [src];
  const visited = new Set();
  while (queue.length > 0) {
    const current = queue.shift();
    if (current === dst) {
      return true;
    }
    if (visited.has(current)) {
      continue;
    }
    const neighbors = graph[current] ?? [];
    queue.push(...neighbors);
    visited.add(current);
  }
  return false;
}

console.log(hasPathBFS(edges, 'j', 'm'));

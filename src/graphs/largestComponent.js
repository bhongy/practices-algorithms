const graph = {
  0: [8, 1, 5],
  1: [0],
  5: [0, 8],
  8: [0, 5],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2],
};

function largestComponent(graph) {
  const visited = new Set();
  let largestSize = 0;
  for (const k of Object.keys(graph)) {
    const node = +k;
    if (visited.has(node)) {
      continue;
    }
    const size = exploreSizeDFS(graph, visited, node);
    // const size = exploreSizeBFS(graph, visited, node);
    largestSize = Math.max(largestSize, size);
  }
  return largestSize;
}

function exploreSizeDFS(graph, visited, current) {
  if (visited.has(current)) {
    return 0;
  }
  visited.add(current);
  return graph[current].reduce(
    (sum, n) => sum + exploreSizeBFS(graph, visited, n),
    1,
  );
}

function exploreSizeBFS(graph, visited, start) {
  let size = 0;
  const queue = [start];
  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) {
      continue;
    }
    visited.add(current);
    size += 1;
    queue.push(...graph[current]);
  }
  return size;
}

console.log(largestComponent(graph)); // 4

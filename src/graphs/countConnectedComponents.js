const graph = {
  1: [2],
  2: [1],
  3: [],
  4: [6],
  5: [6],
  6: [4, 5, 7, 8],
  7: [6],
  8: [6],
};

function connectedComponentsCount(graph) {
  const visited = new Set();
  let count = 0;
  for (const k of Object.keys(graph)) {
    const current = +k;
    if (visited.has(current)) {
      continue;
    }
    explore(graph, visited, current);
    count += 1;
  }
  return count;
}

function explore(graph, visited, current) {
  const queue = [current];
  while (queue.length > 0) {
    const node = queue.shift();
    if (visited.has(node)) {
      continue;
    }
    visited.add(node);
    queue.push(...graph[node]);
  }
}

console.log(connectedComponentsCount(graph)); // 3

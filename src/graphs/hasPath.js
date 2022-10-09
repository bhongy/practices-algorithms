const graph = {
  f: ['g', 'i'],
  g: ['h'],
  h: [],
  i: ['g', 'k'],
  j: ['i'],
  k: [],
};

function hasPath(graph, src, dest) {
  const queue = [src];
  while (queue.length > 0) {
    const current = queue.shift();
    if (current === dest) {
      return true;
    }
    queue.push(...graph[current]);
  }
  return false;
}

console.log(hasPath(graph, 'f', 'k'));

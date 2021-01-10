export const dataNormalize = (data) => {
  const result = {};
  const keys = Object.keys(data);

  keys.forEach((key) => {
    if (data[key]?.edges?.length > 1) {
      result[key] = [];
      data[key].edges.forEach((edge) => {
        result[key].push(edge.node.frontmatter);
      });
    } else {
      result[key] = data[key].edges[0].node.frontmatter;
    }
  });

  return result;
};

export const findConnectedNodes = (schema, nodeId, sorted = false) => {
  const node = schema.nodes.find(({ id }) => nodeId === id);
  if (!node) return [];
  const sortedNodes = schema.links.reduce(
    (acc, link) => {
      if (
        !Object.values(link).some(
          (id) =>
            node.inputs.map((i) => i.id).includes(id) ||
            node.outputs.map((i) => i.id).includes(id)
        )
      )
        return acc;

      const type = node.inputs.map((i) => i.id).includes(link.input)
        ? "outputs"
        : "inputs";
      const searchedNode = schema.nodes.find((n) =>
        n[type]
          .map((i) => i.id)
          .includes(type === "inputs" ? link.input : link.output)
      );
      searchedNode &&
        acc[type === "inputs" ? "outputs" : "inputs"].push(searchedNode);
      return acc;
    },
    { inputs: [], outputs: [] }
  );
  const connectedNodes = Object.values(sortedNodes).reduce(
    (acc, i) => [...acc, ...i],
    []
  );
  return sorted ? sortedNodes : connectedNodes;
};

export const calcSum = (schema, nodeId) => {
  const connectedNodes = findConnectedNodes(schema, nodeId);
  return connectedNodes.reduce((sum, node) => sum + (node.data.number || 0), 0);
};

export const calcProduct = (schema, nodeId) => {
  const connectedNodes = findConnectedNodes(schema, nodeId);
  return connectedNodes.reduce((sum, node) => sum * (node.data.number || 1), 1);
};

export const calcQuotient = (schema, nodeId) => {
  const connectedNodes = findConnectedNodes(schema, nodeId, true);
  return (
    connectedNodes.inputs.reduce((acc, i) => acc + (i.data.number || 0), 0) /
    connectedNodes.outputs.reduce((acc, i) => acc + (i.data.number || 0), 0)
  );
};

export const calcDifference = (schema, nodeId) => {
  const connectedNodes = findConnectedNodes(schema, nodeId, true);
  return (
    connectedNodes.inputs.reduce((acc, i) => acc + (i.data.number || 0), 0) -
    connectedNodes.outputs.reduce((acc, i) => acc + (i.data.number || 0), 0)
  );
};

const getUniqueNodes = (nodes) =>
  nodes.filter((i, idx, arr) => idx === arr.findIndex((t) => t.id === i.id));

export const findConnectedNodes = (schema, nodeId) => {
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

  return {
    inputs: getUniqueNodes(sortedNodes.inputs),
    outputs: getUniqueNodes(sortedNodes.outputs),
  };
};

const getDataSum = (data) =>
  Object.values(data).reduce(
    (acc, v) => (!data.freezed && typeof v === "number" ? acc + v : acc),
    0
  );

const validateNodes = (connectedNodes) => {
  if (Object.values(connectedNodes).some((i) => !i.length)) return false;

  const num1 = connectedNodes.inputs.reduce(
    (acc, i) => acc + getDataSum(i.data),
    0
  );
  const num2 = connectedNodes.outputs.reduce(
    (acc, i) => acc + getDataSum(i.data),
    0
  );
  return num1 && num2;
};

export const calcSum = (schema, nodeId) => {
  const connectedNodes = findConnectedNodes(schema, nodeId);
  return getUniqueNodes([
    ...connectedNodes.inputs,
    ...connectedNodes.outputs,
  ]).reduce((sum, node) => sum + getDataSum(node.data), 0);
};

export const calcProduct = (schema, nodeId) => {
  const connectedNodes = findConnectedNodes(schema, nodeId);
  const allNodes = [...connectedNodes.inputs, ...connectedNodes.outputs];

  if (allNodes.length < 2) return 0;

  return getUniqueNodes(allNodes).reduce(
    (sum, node) => sum * (!node.data.freezed ? getDataSum(node.data) : 1),
    1
  );
};

export const calcQuotient = (schema, nodeId) => {
  const connectedNodes = findConnectedNodes(schema, nodeId, true);
  if (!validateNodes(connectedNodes)) return 0;
  return (
    connectedNodes.inputs.reduce((acc, i) => acc + getDataSum(i.data), 0) /
    connectedNodes.outputs.reduce((acc, i) => acc + getDataSum(i.data), 0)
  );
};

export const calcDifference = (schema, nodeId) => {
  const connectedNodes = findConnectedNodes(schema, nodeId, true);
  if (!validateNodes(connectedNodes)) return 0;
  return (
    connectedNodes.inputs.reduce((acc, i) => acc + getDataSum(i.data), 0) -
    connectedNodes.outputs.reduce((acc, i) => acc + getDataSum(i.data), 0)
  );
};

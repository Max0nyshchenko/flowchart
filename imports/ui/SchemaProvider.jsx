import React, { useMemo, useContext, createContext, useEffect } from "react";
import {
  useSchema as useDiagramsSchema,
  createSchema,
} from "beautiful-react-diagrams";
import { v4 as genUUID } from "uuid";
import { InputNode } from "./nodes/Input";
import { AdditionNode } from "./nodes/Addition";
import { MultiplicationNode } from "./nodes/Multiplication";
import { calcProduct, calcSum } from "../lib/flowchart";

const initialSchema = createSchema({
  nodes: [],
  links: [],
});

const context = createContext();

const useSchema = () => useContext(context);

export const SchemaProvider = ({ children }) => {
  const [schema, { onChange, removeNode, addNode }] =
    useDiagramsSchema(initialSchema);

  console.log("schema: ", schema);

  const deleteNode = (id) => {
    const node = schema.nodes.find((i) => i.id === id);
    node && removeNode(node);
  };

  const changeNodeData = (data, nodeId) => {
    const nodeIndex = schema.nodes.findIndex((t) => t.id === nodeId);
    if (nodeIndex === -1) return;
    schema.nodes[nodeIndex].data = { ...schema.nodes[nodeIndex], ...data };
    schema.nodes = schema.nodes.map((node) => {
      return {
        ...node,
        data: {
          ...node.data,
          sum: calcSum(schema, node.id),
          product: calcProduct(schema, node.id),
        },
      };
    });
    onChange({ ...schema });
  };

  const addNewNode = (nodeType) => {
    const nodes = {
      input: InputNode,
      addition: AdditionNode,
      product: MultiplicationNode,
    };
    const node = {
      id: genUUID(),
      coordinates: [260, 100],
      render: nodes[nodeType],
      inputs: [{ id: genUUID() }, { id: genUUID() }],
      outputs: [{ id: genUUID() }, { id: genUUID() }],
      data: {
        deleteNode,
        product: 0,
        number: 0,
        sum: 0,
      },
    };
    addNode(node);
  };
  const clear = () => onChange({ ...initialSchema });

  return (
    <context.Provider
      value={{
        onChange,
        deleteNode,
        clear,
        schema,
        addNewNode,
        changeNodeData,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useNode = (nodeId, type) => {
  const { deleteNode, changeNodeData } = useSchema();

  return {
    deleteNode: () => deleteNode(nodeId),
    changeData: (data) => changeNodeData(data, nodeId),
  };
};

export const useFlowchart = () => {
  const { onChange, addNewNode, clear, schema } = useSchema();
  return { onChange, addNewNode, clear, schema };
};

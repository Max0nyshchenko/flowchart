import React, { useEffect, useContext, createContext } from "react";
import {
  useSchema as useDiagramsSchema,
  createSchema,
} from "beautiful-react-diagrams";
import { v4 as genUUID } from "uuid";
import {
  InputNode,
  AdditionNode,
  MultiplicationNode,
  DivisionNode,
  SubtractionNode,
} from "../nodes";
import {
  calcQuotient,
  calcDifference,
  calcProduct,
  calcSum,
} from "../../lib/flowchart";

const initialSchema = createSchema({
  nodes: [],
  links: [],
});

const context = createContext();

const useSchema = () => useContext(context);

export const SchemaProvider = ({ children }) => {
  const [schema, { onChange, removeNode, addNode }] =
    useDiagramsSchema(initialSchema);

  const deleteNode = (id) => {
    const node = schema.nodes.find((i) => i.id === id);
    node && removeNode(node);
  };

  const recalculateSchema = () => {
    schema.nodes = schema.nodes.map((node) => {
      return {
        ...node,
        data: {
          ...node.data,
          addition: calcSum(schema, node.id),
          multiplication: calcProduct(schema, node.id),
          division: calcQuotient(schema, node.id),
          subtraction: calcDifference(schema, node.id),
        },
      };
    });
    onChange({ ...schema });
  };

  const changeNodeData = (data, nodeId) => {
    const nodeIndex = schema.nodes.findIndex((t) => t.id === nodeId);
    if (nodeIndex === -1) return;
    schema.nodes[nodeIndex].data = { ...schema.nodes[nodeIndex], ...data };
    recalculateSchema();
  };

  useEffect(() => {
    recalculateSchema();
  }, [schema.links.length]);

  const addNewNode = (nodeType) => {
    const nodes = {
      input: InputNode,
      addition: AdditionNode,
      multiplication: MultiplicationNode,
      division: DivisionNode,
      subtraction: SubtractionNode,
    };
    const node = {
      id: genUUID(),
      coordinates: [
        !schema.nodes.length
          ? 250
          : schema.nodes[schema.nodes.length - 1].coordinates[0] + 150,
        !schema.nodes.length
          ? 250
          : schema.nodes[schema.nodes.length - 1].coordinates[1],
      ],
      render: nodes[nodeType],
      inputs: [{ id: genUUID() }],
      outputs: [{ id: genUUID() }],
      data: {
        deleteNode,
        multiplication: 0,
        division: 0,
        subtraction: 0,
        addition: 0,
        number: 0,
      },
    };
    addNode(node);
  };
  const clear = () => onChange({ nodes: [], links: [] });

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

export const useNode = (nodeId) => {
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

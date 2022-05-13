import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Flowchart } from "../imports/ui/diagrams/Flowchart";
import { SchemaProvider } from "../imports/ui/context/SchemaProvider";
import {
  calcDifference,
  calcQuotient,
  calcProduct,
  calcSum,
  findConnectedNodes,
} from "../imports/lib/flowchart";

describe("Flowchart - component for creating diagramms", () => {
  beforeEach(() => {
    render(<Flowchart />, { wrapper: SchemaProvider });
  });

  it("should create input node", async () => {
    await userEvent.click(screen.getByText("input"));

    expect(screen.getByText("Number goes here")).toBeInTheDocument();
  });

  it("should create addition node", async () => {
    await userEvent.click(screen.getByText("addition"));

    expect(screen.getByText("Result : 0")).toBeInTheDocument();
  });
});

describe("flowchart.js - schema manipulations, helper methods", () => {
  const schema = {
    nodes: [
      {
        data: { number: 24 },
        id: "node-1",
        inputs: [{ id: "1" }],
        outputs: [{ id: "a" }],
      },
      {
        data: { number: 12 },
        id: "node-2",
        inputs: [{ id: "2" }],
        outputs: [{ id: "b" }],
      },
      {
        data: { number: 0 },
        id: "node-3",
        inputs: [{ id: "3" }],
        outputs: [{ id: "c" }],
      },
    ],
    links: [
      { input: "1", output: "b" },
      { input: "1", output: "c" },
      { input: "3", output: "b" },
    ],
  };
  const secondSchema = {
    ...schema,
    links: [
      { input: "3", output: "a" },
      { input: "2", output: "c" },
    ],
  };

  const nodesData = [{ addition: 40 }, { subtraction: 4 }, { number: 0 }];
  const nonInputNodesSchema = {
    ...secondSchema,
    nodes: secondSchema.nodes.map((n, idx) => ({
      ...n,
      data: nodesData[idx],
    })),
  };

  it("findConnectedNodes - should return first level nodes", () => {
    expect(findConnectedNodes(schema, "node-3", true)).toEqual({
      inputs: [schema.nodes[1]],
      outputs: [schema.nodes[0]],
    });
  });

  describe("calcProduct - method for multiplication node calculations", () => {
    it("should return 0 if there is no nodes connected", () => {
      expect(calcProduct({ ...nonInputNodesSchema, links: [] }, "node-3")).toBe(
        0
      );
    });

    it("should return product from 2 non-input nodes", () => {
      expect(calcProduct(nonInputNodesSchema, "node-3")).toBe(160);
    });

    it("should return product", () => {
      expect(calcProduct(schema, "node-3")).toEqual(
        schema.nodes.reduce(
          (acc, i) => (i.id !== "node-3" ? acc * i.data.number : acc),
          1
        )
      );
    });

    it("should skip freezed nodes", () => {
      const schemaWithFreezedNode = {
        nodes: [
          {
            data: { number: 24 },
            id: "node-1",
            inputs: [{ id: "1" }],
            outputs: [{ id: "a" }],
          },
          {
            data: { number: 12 },
            id: "node-2",
            inputs: [{ id: "2" }],
            outputs: [{ id: "b" }],
          },
          {
            data: { number: 13 },
            id: "node-3",
            inputs: [{ id: "3" }],
            outputs: [{ id: "c" }],
          },
          {
            data: { number: 100, freezed: true },
            id: "node-4",
            inputs: [{ id: "4" }],
            outputs: [{ id: "d" }],
          },
        ],
        links: [
          { input: "2", output: "c" },
          { input: "4", output: "c" },
          { input: "3", output: "a" },
        ],
      };

      expect(calcProduct(schemaWithFreezedNode, "node-3")).toBe(288);
    });
  });

  describe("calcSum - method for addition node calculations", () => {
    it("should return connected nodes sum", () => {
      expect(calcSum(schema, "node-3")).toBe(
        schema.nodes.reduce(
          (acc, i) => (i.id !== "node-3" ? acc + i.data.number : acc),
          0
        )
      );
    });

    it("should return sum from 2 non-input nodes", () => {
      expect(calcSum(nonInputNodesSchema, "node-3")).toBe(44);
    });
  });

  describe("calcDifference - method for diffrence node calculations", () => {
    it("should return difference from subtraction", () => {
      expect(calcDifference(secondSchema, "node-3")).toBe(12);
    });

    it("should return difference from 2 non-input nodes", () => {
      expect(calcDifference(nonInputNodesSchema, "node-3")).toBe(36);
    });
  });

  describe("calcQuotient - method for division node calculations", () => {
    it("should return quotient from division", () => {
      expect(calcQuotient(secondSchema, "node-3")).toBe(2);
    });

    it("should return 0 if we divide by 0", () => {
      const newSchema = {
        ...secondSchema,
        nodes: secondSchema.nodes.map((i, idx) => {
          if (!idx || idx === 1) return { ...i, data: { number: 0 } };
          return i;
        }),
      };

      expect(calcQuotient(newSchema, "node-3")).toBe(0);
    });

    it("should return 0 if nodes is not connected", () => {
      const newSchema = {
        ...secondSchema,
        nodes: secondSchema.nodes.map((i, idx) => {
          if (!idx || idx === 1) return { ...i, data: { number: 0 } };
          return i;
        }),
        links: [],
      };

      expect(calcQuotient(newSchema, "node-3")).toBe(0);
    });

    it("should return quotient from 2 non-input nodes", () => {
      expect(calcQuotient(nonInputNodesSchema, "node-3")).toBe(10);
    });
  });
});

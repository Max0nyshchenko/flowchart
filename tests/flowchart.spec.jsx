import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Flowchart } from "../imports/ui/Flowchart";
import { SchemaProvider } from "../imports/ui/SchemaProvider";
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

  it("should create digit node", async () => {
    await userEvent.click(screen.getByText("Digit"));

    expect(screen.getByDisplayValue("0")).toBeInTheDocument();
  });

  it("should create addition node", async () => {
    await userEvent.click(screen.getByText("Addition"));

    expect(screen.getByText("Sum: 0")).toBeInTheDocument();
  });
});

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
      data: { sum: 0 },
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

describe("flowchart.js - schema manipulations, helper methods", () => {
  it("should return first level nodes", () => {
    expect(findConnectedNodes(schema, "node-3", true)).toEqual({
      inputs: [schema.nodes[1]],
      outputs: [schema.nodes[0]],
    });
  });

  it("should return product", () => {
    expect(calcProduct(schema, "node-3")).toEqual(
      schema.nodes.reduce(
        (acc, i) => (i.id !== "node-3" ? acc * i.data.number : acc),
        1
      )
    );
  });

  it("should return connected nodes sum", () => {
    expect(calcSum(schema, "node-3")).toBe(
      schema.nodes.reduce(
        (acc, i) => (i.id !== "node-3" ? acc + i.data.number : acc),
        0
      )
    );
  });

  it("should return quotient from subtraction", () => {
    const newSchema = {
      ...schema,
      links: [
        { input: "3", output: "a" },
        { input: "2", output: "c" },
      ],
    };

    expect(calcQuotient(newSchema, "node-3")).toBe(2);
  });

  it("should return difference from subtraction", () => {
    const newSchema = {
      ...schema,
      links: [
        { input: "3", output: "a" },
        { input: "2", output: "c" },
      ],
    };

    expect(calcDifference(newSchema, "node-3")).toBe(12);
  });
});

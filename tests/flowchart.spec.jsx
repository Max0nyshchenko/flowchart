import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Flowchart } from "../imports/ui/Flowchart";
import { SchemaProvider } from "../imports/ui/SchemaProvider";

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

describe("flowchart.js - schema manipulations, helper methods", () => {
  describe("findConnections - get links of the node", () => {
    it("should return first level nodes", () => {
      const schema = {
        nodes: [
          { id: "node-1", inputs: [{ id: "1" }], outputs: [{ id: "a" }] },
          { id: "node-2", inputs: [{ id: "2" }], outputs: [{ id: "b" }] },
        ],
        links: [{ input: "" }],
      };
    });
  });
});

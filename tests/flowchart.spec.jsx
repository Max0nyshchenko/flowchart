import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Flowchart } from "../imports/ui/Flowchart";

describe("Flowchart - component for creating diagramms", () => {
  beforeEach(() => {
    render(<Flowchart />);
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

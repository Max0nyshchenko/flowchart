import { render, screen } from "@testing-library/react";
import { click } from "@testing-library/user-event";
import { Flowchart } from "../imports/ui/Flowchart";

describe("Flowchart - component for creating diagramms", () => {
  it("should create node on click of add node button", () => {
    render(<Flowchart />);
    const button = screen.getByText("Add new digit node");
    click(button);
    expect(screen.getByText("0")).toBeTruthy();
  });
});

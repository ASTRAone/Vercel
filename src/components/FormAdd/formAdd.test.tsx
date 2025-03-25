import { fireEvent, render, screen } from "@testing-library/react";
import { FormAdd } from "./FormAdd";
import "@testing-library/jest-dom";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  Input: jest.fn((props) => <input {...props} />),
}));

describe("FormAdd Component", () => {
  it("correctly handles addedTodo prop", () => {
    const mockAddedTodo = jest.fn();
    render(<FormAdd addedTodo={mockAddedTodo} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Test" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockAddedTodo).toHaveBeenCalledWith("Test");
  });
});

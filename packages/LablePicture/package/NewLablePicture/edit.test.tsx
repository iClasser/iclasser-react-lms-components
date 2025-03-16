import { render, screen } from "@testing-library/react";
import Edit from "./edit";

describe("Edit Component", () => {
  it("renders the edit form", () => {
    render(<Edit imageUrl="" onSave={() => {}} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });
});
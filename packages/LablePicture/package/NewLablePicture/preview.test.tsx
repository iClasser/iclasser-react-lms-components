import { render, screen } from "@testing-library/react";
import Preview from "./preview";
import "@testing-library/jest-dom";

describe("Preview Component", () => {
  it("renders the image and edit button", () => {
    render(<Preview imageUrl="" onEdit={() => {}} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
  });
});
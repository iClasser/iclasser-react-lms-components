import { render, screen } from "@testing-library/react";
import Preview from "./preview";
import "@testing-library/jest-dom";

const mockProps = {
  componentIndex: 1,
  structureComponent: {
    textId: "test-text-id",
    props: {
      url: "https://example.com/animation.json",
      loop: true,
    },
  },
  textData: {},
  codingContents: {},
};

describe("Preview Component", () => {
  it("renders without crashing", () => {
    render(<Preview {...mockProps} />);
    expect(
      screen.getByRole("button", { name: /play animation/i })
    ).toBeInTheDocument();
  });

  it("does not render if URL is missing", () => {
    const { container } = render(
      <Preview
        {...mockProps}
        structureComponent={{
          textId: "test-text-id",
          props: { url: "", loop: true },
        }}
      />
    );
    expect(container.firstChild).toBeNull();
  });
});

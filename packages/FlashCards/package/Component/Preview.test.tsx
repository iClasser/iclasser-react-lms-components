import { render, screen, fireEvent } from "@testing-library/react";
import Preview from "./Preview"; // Adjust the import path if needed
import "@testing-library/jest-dom";

describe("Preview Component", () => {
  const mockTextData = {
    getText: jest.fn((textId) => `Mocked Text ${textId}`),
  };

  const defaultProps = {
    componentIndex: 1,
    structureComponent: {
      textId: "test-text-id",
      props: {
        flashcards: [
          {
            id: "flashcard_1",
            front: "front_text_1",
            front_image: "",
            back: "back_text_1",
          },
        ],
      },
    },
    textData: mockTextData,
  };

  it("renders correctly when flashcards are present", () => {
    render(<Preview {...defaultProps} />);

    // Since the front text appears twice (front and back), use getAllByText
    const frontTextElements = screen.getAllByText(/Mocked Text front_text_1/i);
    expect(frontTextElements.length).toBeGreaterThan(0);
    const backTextElements = screen.getAllByText(/Mocked Text back_text_1/i);
    expect(backTextElements.length).toBeGreaterThan(0);
  });

  it("returns null when no flashcards are present", () => {
    const { container } = render(
      <Preview
        {...defaultProps}
        structureComponent={{
          ...defaultProps.structureComponent,
          props: { flashcards: [] },
        }}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("flips the flashcard when clicked", () => {
    render(<Preview {...defaultProps} />);

    // There are two buttons (front and back) with similar text. Choose the first one.
    const buttons = screen.getAllByRole("button", { name: /Mocked Text front_text_1/i });
    expect(buttons.length).toBeGreaterThan(0);
    const frontButton = buttons[0];

    // Click the button to flip it.
    fireEvent.click(frontButton);

    // Expect the element to now include a "flipped" class.
    // (Your component adds `${style["flipped"]}` on flip.)
    expect(frontButton.className).toMatch(/flipped/);
  });
});

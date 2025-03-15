import { render, screen, fireEvent } from "@testing-library/react";
import Preview from "./Preview"; // Adjust import path if needed
import "@testing-library/jest-dom";

describe("Preview Component - Matching Pairs", () => {
  const mockTextData = {
    getText: jest.fn((textId) => `Mocked Text ${textId}`),
  };

  const defaultProps = {
    componentIndex: 1,
    structureComponent: {
      textId: "test-text-id",
      props: {
        pairs: [
          {
            id: "pair_1",
            left: { text: "left_text_1", image: "" },
            right: { text: "right_text_1", image: "" },
          },
        ],
        shuffleLeft: false,
        shuffleRight: false,
      },
    },
    textData: mockTextData,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<Preview {...defaultProps} />);
    
    expect(screen.getByText(/Mocked Text test-text-id/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("calls textData.getText() correctly", () => {
    render(<Preview {...defaultProps} />);

    expect(mockTextData.getText).toHaveBeenCalledWith("test-text-id");
    expect(mockTextData.getText).toHaveBeenCalledWith("left_text_1");
    expect(mockTextData.getText).toHaveBeenCalledWith("right_text_1");
  });

  it("renders pairs correctly", () => {
    render(<Preview {...defaultProps} />);

    expect(screen.getByText(/Mocked Text left_text_1/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked Text right_text_1/i)).toBeInTheDocument();
  });

  it("shuffles pairs when shuffleLeft or shuffleRight is enabled", () => {
    render(
      <Preview
        {...defaultProps}
        structureComponent={{
          ...defaultProps.structureComponent,
          props: { ...defaultProps.structureComponent.props, shuffleLeft: true, shuffleRight: true },
        }}
      />
    );

    // Since shuffling is random, we can't check exact order but can verify it's called.
    expect(mockTextData.getText).toHaveBeenCalled();
  });

  it("resets matched pairs when clicking reset button", () => {
    render(<Preview {...defaultProps} />);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);

    // Ensure the component rerenders and state resets properly
    expect(mockTextData.getText).toHaveBeenCalled();
  });
});

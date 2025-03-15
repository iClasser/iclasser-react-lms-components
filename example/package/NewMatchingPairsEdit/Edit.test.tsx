// Mock FileUploadButton before anything else
// jest.mock("@/components/index", () => ({
//   FileUploadButton: ({ onComplete, text }: { onComplete: () => void; text: string }) => (
//     <button onClick={() => onComplete({ url: "new-image-url" })}>
//       {text}
//     </button>
//   ),
// }));

import { render, screen, fireEvent } from "@testing-library/react";
import Edit from "./Edit"; // Adjust import path if needed
import "@testing-library/jest-dom";

describe("Edit Component - Matching Pairs", () => {
  const mockSetStructureVal = jest.fn();
  const mockGenerateNewTextKeys = jest.fn(() => ["pair_left_1", "pair_right_1"]);
  const mockInsertMultipleContentVals = jest.fn();
  const mockDeleteMultipleContentVals = jest.fn();
  const mockSetContentVal = jest.fn();
  const mockTextData = {
    getText: jest.fn((textId) => `Mocked Text ${textId}`),
  };

  const defaultProps = {
    sectionIndex: 1,
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
      },
    },
    codingContents: {},
    locale: "en-US",
    uploadOptions: {},
    textData: mockTextData,
    setStructureVal: mockSetStructureVal,
    generateNewTextKeys: mockGenerateNewTextKeys,
    insertMultipleContentVals: mockInsertMultipleContentVals,
    deleteMultipleContentVals: mockDeleteMultipleContentVals,
    setContentVal: mockSetContentVal,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<Edit {...defaultProps} />);
    expect(screen.getByText(/MatchingPairs/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Matching Pair/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Remove Pair/i })).toBeInTheDocument();
  });

  it("adds a new matching pair when clicking 'Add Matching Pair'", () => {
    render(<Edit {...defaultProps} />);
    const addButton = screen.getByRole("button", { name: /Add Matching Pair/i });

    fireEvent.click(addButton);

    expect(mockGenerateNewTextKeys).toHaveBeenCalledWith({
      numberOfKeys: 2,
      prefixObject: { 0: "pair_left", 1: "pair_right" },
    });

    expect(mockSetStructureVal).toHaveBeenCalledWith({
      key: "pairs",
      value: [
        ...defaultProps.structureComponent.props.pairs,
        {
          id: "pair_left_1",
          left: { text: "pair_left_1", image: "" },
          right: { text: "pair_right_1", image: "" },
        },
      ],
      mainKey: "props",
      sectionIndex: defaultProps.sectionIndex,
      currentComponentIndex: defaultProps.componentIndex,
    });

    expect(mockInsertMultipleContentVals).toHaveBeenCalledWith({
      list: [
        { textId: "pair_left_1", value: "" },
        { textId: "pair_right_1", value: "" },
      ],
      lang: "en",
      country: "US",
    });
  });

  it("removes a matching pair when clicking 'Remove Pair'", () => {
    render(<Edit {...defaultProps} />);
    const removeButton = screen.getByRole("button", { name: /Remove Pair/i });

    fireEvent.click(removeButton);

    expect(mockSetStructureVal).toHaveBeenCalledWith({
      key: "pairs",
      value: [],
      mainKey: "props",
      sectionIndex: defaultProps.sectionIndex,
      currentComponentIndex: defaultProps.componentIndex,
    });

    expect(mockDeleteMultipleContentVals).toHaveBeenCalledWith([
      { textId: "left_text_1", value: "" },
      { textId: "right_text_1", value: "" },
    ]);
  });

  // it("sets an image for the left side of a pair", () => {
  //   render(<Edit {...defaultProps} />);

  //   // Get all "Add image" buttons and select the first one for left side
  //   const addImageButtons = screen.getAllByRole("button", { name: /Add image/i });
  //   expect(addImageButtons.length).toBeGreaterThan(0);
  //   const leftImageButton = addImageButtons[0];

  //   // Click the "Add image" button for the left side
  //   fireEvent.click(leftImageButton);

  //   // The mocked FileUploadButton immediately calls onComplete with "new-image-url"
  //   expect(mockSetStructureVal).toHaveBeenCalledWith({
  //     key: "pairs",
  //     value: [
  //       {
  //         ...defaultProps.structureComponent.props.pairs[0],
  //         left: { ...defaultProps.structureComponent.props.pairs[0].left, image: "new-image-url" },
  //       },
  //     ],
  //     mainKey: "props",
  //     sectionIndex: defaultProps.sectionIndex,
  //     currentComponentIndex: defaultProps.componentIndex,
  //   });
  // });

  // it("sets an image for the right side of a pair", () => {
  //   render(<Edit {...defaultProps} />);

  //   // Get all "Add image" buttons and select the second one for the right side
  //   const addImageButtons = screen.getAllByRole("button", { name: /Add image/i });
  //   expect(addImageButtons.length).toBeGreaterThan(1);
  //   const rightImageButton = addImageButtons[1];

  //   // Click the "Add image" button for the right side
  //   fireEvent.click(rightImageButton);

  //   // The mocked FileUploadButton immediately calls onComplete with "new-image-url"
  //   expect(mockSetStructureVal).toHaveBeenCalledWith({
  //     key: "pairs",
  //     value: [
  //       {
  //         ...defaultProps.structureComponent.props.pairs[0],
  //         right: { ...defaultProps.structureComponent.props.pairs[0].right, image: "new-image-url" },
  //       },
  //     ],
  //     mainKey: "props",
  //     sectionIndex: defaultProps.sectionIndex,
  //     currentComponentIndex: defaultProps.componentIndex,
  //   });
  // });
});

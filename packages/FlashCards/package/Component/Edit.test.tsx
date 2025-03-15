// Mock FileUploadButton before anything else
// jest.mock("../../components/index", () => ({
//   FileUploadButton: ({ onComplete, text }: { onComplete: () => void; text: string }) => (
//     // Render a button that when clicked calls onComplete with a simulated URL.
//     <button onClick={() => onComplete({ url: "new-image-url" })}>
//       {text}
//     </button>
//   ),
// }));

import { render, screen, fireEvent } from "@testing-library/react";
import Edit from "./Edit"; // Adjust import path if needed
import "@testing-library/jest-dom";

describe("Edit Component", () => {
  const mockSetStructureVal = jest.fn();
  const mockGenerateNewTextKeys = jest.fn(() => ["flashcard_front_1", "flashcard_back_1"]);
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
    expect(screen.getByText(/Flashcards/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Flashcard/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Remove/i })).toBeInTheDocument();
  });

  it("adds a new flashcard when clicking 'Add Flashcard'", () => {
    render(<Edit {...defaultProps} />);
    const addButton = screen.getByRole("button", { name: /Add Flashcard/i });

    fireEvent.click(addButton);

    expect(mockGenerateNewTextKeys).toHaveBeenCalledWith({
      numberOfKeys: 2,
      prefixObject: { 0: "flashcard_front", 1: "flashcard_back" },
    });

    expect(mockSetStructureVal).toHaveBeenCalledWith({
      key: "flashcards",
      value: [
        ...defaultProps.structureComponent.props.flashcards,
        {
          id: "flashcard_front_1",
          front: "flashcard_front_1",
          front_image: "",
          back: "flashcard_back_1",
        },
      ],
      mainKey: "props",
      sectionIndex: defaultProps.sectionIndex,
      currentComponentIndex: defaultProps.componentIndex,
    });

    expect(mockInsertMultipleContentVals).toHaveBeenCalledWith({
      list: [
        { textId: "flashcard_front_1", value: "" },
        { textId: "flashcard_back_1", value: "" },
      ],
      lang: "en",
      country: "US",
    });
  });

  // it("sets an image for a flashcard", () => {
  //   render(<Edit {...defaultProps} />);

  //   // There may be multiple "Add image" buttons.
  //   // The first "Add image" button is rendered initially.
  //   const addImageButtonsBefore = screen.getAllByRole("button", { name: /Add image/i });
  //   expect(addImageButtonsBefore.length).toBeGreaterThan(0);
  //   const originalAddImageButton = addImageButtonsBefore[0];

  //   // Click the initial "Add image" button to activate the uploader.
  //   fireEvent.click(originalAddImageButton);

  //   // Now the FileUploadButton (our mock) should be rendered.
  //   // Because it renders a button with the same text ("Add image"),
  //   // we query all buttons again and assume the second one is the uploader.
  //   const addImageButtonsAfter = screen.getAllByRole("button", { name: /Add image/i });
  //   expect(addImageButtonsAfter.length).toBeGreaterThan(1);
  //   const fileUploadButton = addImageButtonsAfter[1];

  //   // Click the FileUploadButton's button which triggers onComplete.
  //   fireEvent.click(fileUploadButton);

  //   // Expect that mockSetStructureVal is called with updated flashcard that now has front_image set.
  //   expect(mockSetStructureVal).toHaveBeenCalledWith({
  //     key: "flashcards",
  //     value: [
  //       {
  //         ...defaultProps.structureComponent.props.flashcards[0],
  //         front_image: "new-image-url",
  //       },
  //     ],
  //     mainKey: "props",
  //     sectionIndex: defaultProps.sectionIndex,
  //     currentComponentIndex: defaultProps.componentIndex,
  //   });
  // });
});
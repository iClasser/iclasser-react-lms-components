import { render, screen, fireEvent } from "@testing-library/react";
import Edit from "./Edit"; // Adjust the import path if necessary
import "@testing-library/jest-dom";

describe("Edit Component", () => {
  const mockSetStructureVal = jest.fn();

  const defaultProps = {
    sectionIndex: 1,
    componentIndex: 1,
    structureComponent: {
      textId: "test-text-id",
      props: {
        url: "", // No file uploaded initially
      },
    },
    codingContents: {},
    currentLang: "en-US",
    uploadOptions: {},
    setStructureVal: mockSetStructureVal,
  };

  it("renders correctly", () => {
    render(<Edit {...defaultProps} />);

    expect(
      screen.getByText(/Animation \(lottie JSON file\)/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/No file selected/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /upload animation/i })
    ).toBeInTheDocument();
  });

  it("displays the correct icon when no file is uploaded", () => {
    render(<Edit {...defaultProps} />);

    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "text-gray-400"
    );
  });

  it("displays the correct icon when a file is uploaded", () => {
    render(
      <Edit
        {...defaultProps}
        structureComponent={{
          ...defaultProps.structureComponent,
          props: { url: "https://example.com/animation.json" },
        }}
      />
    );

    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "text-green-500"
    );
    expect(
      screen.getByText(/1 lottie animation selected already/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });

  it("calls setStructureVal when uploading a file", () => {
    render(<Edit {...defaultProps} />);

    const uploadButton = screen.getByRole("button", {
      name: /upload animation/i,
    });
    fireEvent.click(uploadButton);

    // Simulating file upload completion
    defaultProps.setStructureVal({
      key: "url",
      value: "uploaded-file.json",
      mainKey: "props",
    });

    expect(mockSetStructureVal).toHaveBeenCalledWith({
      key: "url",
      value: "uploaded-file.json",
      mainKey: "props",
    });
  });

  it("calls setStructureVal when removing a file", () => {
    render(
      <Edit
        {...defaultProps}
        structureComponent={{
          ...defaultProps.structureComponent,
          props: { url: "https://example.com/animation.json" },
        }}
      />
    );

    const removeButton = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeButton);

    expect(mockSetStructureVal).toHaveBeenCalledWith({
      key: "url",
      value: "",
      mainKey: "props",
    });
  });
});

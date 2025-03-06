"use client";
import { useState } from "react";
import StaticModal from "./StaticModal";
import FileUploader from "./FileUploader";
import Button from "./Button";

interface FileUploadButtonProps {
  text?: string;
  className?: string;
  small?: boolean;
  type?: string;
  classContainer?: string;
  options?: any;
  onComplete?: any;
  onCompleteCloseModal?: boolean;
  catchError?: any;
  isOpen?: any;
  resize?: any;
}
const FileUploadButton = (props: FileUploadButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [inprogress, setInprogress] = useState(false);
  const type = props.type || "btn-primary";
  const style = `btn ${
    props.className
      ? props.className
      : ` ${type} ${props.small ? "btn-sm" : ""}`
  }`;

  const handleShowModal = (val: boolean) => {
    setShowModal(val);
    if (props.isOpen) {
      props.isOpen(val);
    }
  };
  return (
    <div className={props.classContainer}>
      <Button className={style} onClick={() => handleShowModal(true)}>
        {props.text ? props.text : "Upload"}
      </Button>
      {showModal && (
        <StaticModal
          onClose={() => handleShowModal(false)}
          noButton={true}
          show={showModal}
        >
          <div className="flex flex-col gap-4 p-2">
            <FileUploader
              onComplete={props.onComplete}
              onCompleteCloseModal={
                props.onCompleteCloseModal
                  ? props.onCompleteCloseModal
                  : () => handleShowModal(false)
              }
            />
          </div>
        </StaticModal>
      )}
    </div>
  );
};

export default FileUploadButton;

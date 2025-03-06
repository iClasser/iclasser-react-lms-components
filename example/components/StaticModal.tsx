import { Fragment } from "react";
import Button from "./Button";

interface StaticModalProps {
  show: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  noButton?: boolean;
}
const StaticModal = (props: StaticModalProps) => {
  const { show } = props;
  const handleCloseDialog = () => {
    if (props.onClose) {
      props.onClose();
    }
  };
  if (!show) return null;
  return (
    <Fragment>
      {/* Background */}
      <div
        onClick={() => handleCloseDialog()}
        className={`fixed top-0 left-0  w-full h-full bg-black/30  z-[1023] cursor-pointer`}
      ></div>
      <div
        onClick={() => handleCloseDialog()}
        className={`mx-auto sm:w-3/4 md:w-full fixed inset-0 flex items-center z-[1024] cursor-pointer overflow-auto`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="m-auto cursor-default p-5 border sm:w-full md:max-w-2xl md:w-full shadow-lg rounded-md bg-white z-[1026]"
        >
          <div className="mt-3 text-center">
            <div className="mt-2 px-3 md:px-7 py-3">{props.children}</div>
            {!props.noButton && <div className="items-center px-4 py-3">
              <div className="flex justify-between gap-2">
                <Button onClick={() => handleCloseDialog()}>OK</Button>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </Fragment>
  );
};



export default StaticModal;

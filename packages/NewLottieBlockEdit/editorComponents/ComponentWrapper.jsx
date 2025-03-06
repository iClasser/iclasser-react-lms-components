import { Fragment, useState } from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InlineDialog = (props) => {
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
            <div className="items-center px-4 py-3">
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => handleCloseDialog()}
                  id="ok-btn"
                  className="px-4 py-2 bg-black text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const ComponentWrapper = (props) => {
  const {
    edit: EditComponent,
    preview: PreviewComponent,
    editButtonForm: EditButtonForm,
    extraButtonForm: ExtraButtonForm,
    alwaysShowEditButtonForm,
    hasEditForm,
  } = props;

  const [showEditButtonForm, setShowEditButtonForm] = useState(false);
  const [showAdditionalButton, setShowAdditionalButton] = useState(false);
  const [showClass, setShowClass] = useState("");

  const handleAddShowClassName = (val) => {
    setShowAdditionalButton(val);
    if (!val) {
      setShowClass("");
    }
    setTimeout(() => {
      setShowClass("show");
    }, 200);
  };

  return (
    <div className=" border-2 border-blue-500/20 p-4 bg-white rounded-md">
      {props.editMode ? (
        <div>
          <div className="grid grid-cols-12 border-b bg-white">
            <div
              onMouseEnter={() =>
                ExtraButtonForm ? handleAddShowClassName(true) : null
              }
              onMouseLeave={() =>
                ExtraButtonForm ? handleAddShowClassName(false) : null
              }
              className={`col-span-12 md:col-span-1 md:bg-none bg-gray-50 items-center justify-center flex flex-row md:flex-col`}
            >
              {hasEditForm && (
                <InlineDialog
                  show={showEditButtonForm}
                  onClose={setShowEditButtonForm}
                >
                  <EditButtonForm />
                </InlineDialog>
              )}

              {hasEditForm && (
                <button
                  className="btn btn-secondary btn-xs cursor-pointer
                     text-gray-500 
                    hover:text-gray-600  flex items-center 
                    justify-center"
                  onClick={() => setShowEditButtonForm(true)}
                >
                  <FontAwesomeIcon className="w-4 h-4" icon={faCog} />
                </button>
              )}

              {/* Extra buttons */}
              {((showAdditionalButton && ExtraButtonForm) ||
                alwaysShowEditButtonForm) && (
                <div
                  className={`transition-preview-pill ${
                    alwaysShowEditButtonForm ? "show" : showClass
                  }`}
                >
                  {ExtraButtonForm}
                </div>
              )}
            </div>
            <div className="col-span-12 md:col-span-11 relative pr-0 md:pr-12">
              {EditComponent && EditComponent}
            </div>
          </div>
        </div>
      ) : PreviewComponent ? (
        PreviewComponent
      ) : null}
    </div>
  );
};

export default ComponentWrapper;

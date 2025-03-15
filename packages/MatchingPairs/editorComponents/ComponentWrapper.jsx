import { Fragment, useState } from "react";

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
    <div className="border-2 border-blue-500/20 p-4 bg-white rounded-md">
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

              {!hasEditForm && (
                <button
                  className="btn btn-secondary btn-xs cursor-pointer
                     text-gray-500 
                    hover:text-gray-600  flex items-center 
                    justify-center"
                  onClick={() => setShowEditButtonForm(true)}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="gear"
                    className="w-4 h-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
                    ></path>
                  </svg>
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

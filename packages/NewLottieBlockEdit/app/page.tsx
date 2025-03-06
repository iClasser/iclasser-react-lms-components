"use client";

import AppContext from "@/context/appContext";
import NewLottieBlockEdit from "@/package/NewLottieBlockEdit";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import DEVELOPMENT_CONFIG from "@/package/development.config";
import { LottieBlockPreviewStructureProps } from "@/package/NewLottieBlockEdit/preview";

// Add index signature to LottieBlockPreviewStructureProps
// interface LottieBlockPreviewStructureProps {
//   [key: string]: any;
// }
import { LocaleTypes } from "@/funcs/courseModuleTypes";

export default function Home() {
  const [isEditMode, setIsEditMode] = useState(true);
  const [content, setContent] = useState({});
  const [structureComponent, updateComponentStructure] = useState(
    DEVELOPMENT_CONFIG.INITIAL_STRUCTURE as LottieBlockPreviewStructureProps
  );
  const [codingContents, setCodingContents] = useState(
    DEVELOPMENT_CONFIG.INITIAL_CODE_CONTENT
  );

  const sectionIndex: number = 0;
  const componentIndex: number = 0;
  const [textData, setTextData] = useState(
    DEVELOPMENT_CONFIG.INITIAL_TEXT_CONTENT
  );
  const [currentLang, setCurrentLang] = useState<LocaleTypes>(
    DEVELOPMENT_CONFIG.DEFAULT_LOCALE
  );

  const mergeProps = (key: string, value: any) => {
    updateComponentStructure((prev) => ({
      ...prev,
      props: {
        ...prev.props,
        [key]: value,
      },
    }));
  };
  const setProp = (data: any) => {
    updateComponentStructure((prev) => ({
      ...prev,
      props: data,
    }));
  };
  const setStructureVal = ({
    key,
    value,
    mainKey,
  }: {
    key: string;
    value: any;
    mainKey?: string;
  }) => {
    if (mainKey) {
      if (structureComponent[mainKey] === undefined) {
        updateComponentStructure((prev) => ({
          ...prev,
          [mainKey]: {
            [key]: value,
          },
        }));
        return;
      }
      updateComponentStructure((prev) => ({
        ...prev,
        [mainKey]: {
          ...prev[mainKey],
          [key]: value,
        },
      }));

      return;
    }
    updateComponentStructure((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        isEditMode,
        setIsEditMode,
        content,
        setContent,
        componentStructure: structureComponent,
        setComponentStructure: updateComponentStructure,
        componentIndex: 0,
        sectionIndex: 0,
        setTextData,
        textData,
        setProp,
        mergeProps,
        setStructureVal,
      }}
    >
      <main>
        <section className="m-auto container rounded-md leading-0.4 rounded-b-none">
          <h1 className="text-2xl  px-3">
            <strong>iClasser</strong> Playground
          </h1>
          <p className="px-3">
            This is a playground for you to test your new components.
          </p>
        </section>

        <section className="m-auto container border border-gray-500 bg-slate-100 min-h-screen p-4">
          <div className="flex justify-center mb-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                setIsEditMode(!isEditMode);
              }}
            >
              {isEditMode ? "Preview" : "Edit"}
            </button>
          </div>
          <div className="flex justify-center items-start h-full ">
            <div className="flex justify-center gap-10 flex-col items-center  w-4/6 h-full">
              {/* Component */}
              <div className="w-full pr-10">
                <h2 className="text-xl">
                  {isEditMode ? "Component Editor" : "Component Preview"}
                </h2>
                <div className="p-2 border border-gray-500/10 bg-gray-800 rounded-md min-h-96">
                  <NewLottieBlockEdit
                    structureComponent={structureComponent}
                    codingContents={codingContents}
                    uploadOptions={{}}
                    sectionIndex={sectionIndex}
                    componentIndex={componentIndex}
                    currentLang={currentLang}
                    textData={textData}
                    setStructureVal={setStructureVal}
                    editMode={isEditMode}
                  />
                </div>
              </div>
            </div>

            <div className="w-2/6 flex flex-col gap-4">
              <div>
                Structure
                <Editor
                  height="40vh"
                  value={JSON.stringify(structureComponent, null, 2)}
                  className="border border-blue-500 rounded-md p-2 bg-blue-300"
                  defaultLanguage="json"
                  options={{ readOnly: true }}
                  defaultValue={JSON.stringify(structureComponent, null, 2)}
                />
              </div>

              <div>
                Text Data
                <Editor
                  height="24vh"
                  value={JSON.stringify(textData, null, 2)}
                  className="border border-blue-500 rounded-md p-2 bg-blue-300"
                  defaultLanguage="json"
                  options={{ readOnly: true }}
                  defaultValue={JSON.stringify(textData, null, 2)}
                />
              </div>

              <div>
                Coding contents
                <Editor
                  height="24vh"
                  value={JSON.stringify(codingContents, null, 2)}
                  className="border border-blue-500 rounded-md p-2 bg-blue-300"
                  defaultLanguage="json"
                  options={{ readOnly: true }}
                  defaultValue={JSON.stringify(codingContents, null, 2)}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </AppContext.Provider>
  );
}

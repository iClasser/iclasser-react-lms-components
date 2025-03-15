"use client";

import AppContext from "@/context/appContext";
import Component from "@/package/Component";
import React, { useState } from "react";
import DEVELOPMENT_CONFIG from "@/package/development.config";
import { ComponentStructureProps } from "@/package/Component/preview";
import uniqid from "uniqid";

import {
  LocaleTypes,
  InsertMultipleContentVals,
  ContentType,
  GenerateNewTextKeysArgs,
} from "@/funcs/courseModuleTypes";

export default function Home() {
  const [isEditMode, setIsEditMode] = useState(true);
  const [content, setContent] = useState({});
  const [structureComponent, updateComponentStructure] = useState<any>(
    DEVELOPMENT_CONFIG.INITIAL_STRUCTURE as ComponentStructureProps
  );
  const [codingContents, setCodingContents] = useState(
    DEVELOPMENT_CONFIG.INITIAL_CODE_CONTENT
  );

  const sectionIndex: number = 0;
  const componentIndex: number = 0;
  const [allContents, setTextData] = useState<ContentType>(
    DEVELOPMENT_CONFIG.INITIAL_TEXT_CONTENT
  );
  const [currentLang, setCurrentLang] = useState<LocaleTypes>(
    DEVELOPMENT_CONFIG.DEFAULT_LOCALE
  );

  const mergeProps = (key: string, value: any) => {
    updateComponentStructure((prev: any) => ({
      ...prev,
      props: {
        ...prev.props,
        [key]: value,
      },
    }));
  };
  const setProp = ({
    sectionIndex,
    currentComponentIndex,
    value,
  }: {
    sectionIndex: number;
    currentComponentIndex: number;
    value: any;
  }) => {
    updateComponentStructure((prev: any) => ({
      ...prev,
      props: value,
    }));
  };

  const setStructureVal = ({
    key,
    value,
    mainKey,
    sectionIndex,
    currentComponentIndex,
  }: {
    key: string;
    value: any;
    mainKey?: string | any;
    sectionIndex: number;
    currentComponentIndex: number;
  }) => {
    if (mainKey) {
      if (structureComponent[mainKey] === undefined) {
        updateComponentStructure((prev: any) => ({
          ...prev,
          [mainKey]: {
            [key]: value,
          },
        }));
        return;
      }
      updateComponentStructure((prev: any) => ({
        ...prev,
        [mainKey]: {
          ...prev[mainKey],
          [key]: value,
        },
      }));

      return;
    }
    updateComponentStructure((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const setContentVal = (data: any) => {
    const {
      textId,
      value,
      // lang, country
    } = data;
    setTextData((prev) => ({
      ...prev,
      [textId]: value,
    }));
  };

  const insertMultipleContentVals = (data: InsertMultipleContentVals) => {
    const { list, lang, country } = data;
    list.forEach((item: any) => {
      const { textId, value } = item;
      setTextData((prev) => ({
        ...prev,
        [textId]: value,
      }));
    });
  };

  const deleteMultipleContentVals = (
    list: InsertMultipleContentVals["list"]
  ) => {
    list.forEach((item) => {
      const { textId } = item;
      setTextData((prev) => {
        const newTextData = { ...prev } as any;
        if (newTextData[textId] !== undefined) {
          delete newTextData[textId];
        }
        return newTextData;
      });
    });
  };

  const generateNewTextKeys = ({
    numberOfKeys,
    prefix = "",
    prefixObject = {},
  }: GenerateNewTextKeysArgs) => {
    // prefixObject tells
    // what prefix to use for each index
    const existingKeys = [...Object.keys(allContents)];

    // generate new keys for each index
    const newKeys = Array.from({ length: numberOfKeys }, (_, index) => {
      const currentPrefix = prefixObject?.[index] || prefix || "";
      while (true) {
        let newKey = `${currentPrefix}_${uniqid()}`;
        if (!existingKeys.includes(newKey)) {
          return newKey;
        }
      }
    });
    return newKeys;
  };

  const textData = {
    getText: (key: string) => {
      return allContents[key] || "";
    },
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
        textData: allContents,
        setProp,
        mergeProps,
        setStructureVal,
        generateNewTextKeys,
        insertMultipleContentVals,
      }}
    >
      <main>
        <section className="m-auto container rounded-md leading-0.4 rounded-b-none">
          <h1 className="text-2xl  px-3">
            <strong>iClasser</strong> <code>Component</code> Playground
          </h1>
          <p className="px-3">
            This is a playground for you to test your new components.
            <br /> To create a component run{" "}
            <code className="bg-gray-100 px-1 rounded-md">
              npx create-iclasser-react-component
            </code>
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
                  <Component
                    structureComponent={structureComponent}
                    codingContents={codingContents}
                    uploadOptions={{}}
                    sectionIndex={sectionIndex}
                    componentIndex={componentIndex}
                    currentLang={currentLang}
                    textData={textData}
                    setStructureVal={setStructureVal}
                    setContentVal={setContentVal}
                    editMode={isEditMode}
                    generateNewTextKeys={generateNewTextKeys}
                    insertMultipleContentVals={insertMultipleContentVals}
                    deleteMultipleContentVals={deleteMultipleContentVals}
                  />
                </div>
              </div>
            </div>

            <div className="w-2/6 flex flex-col gap-4">
              <div>
                Structure
                <pre className="overflow-x-auto bg-gray-200 p-2 rounded-md">
                  <code>{JSON.stringify(structureComponent, null, 2)}</code>
                </pre>
              </div>

              <div>
                Text Data
                <pre className="overflow-x-auto bg-gray-200 p-2 rounded-md">
                  <code>{JSON.stringify(allContents, null, 2)}</code>
                </pre>
              </div>

              <div>
                Coding contents
                <pre className="overflow-x-auto bg-gray-200 p-2 rounded-md">
                  <code>{JSON.stringify(codingContents, null, 2)}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AppContext.Provider>
  );
}

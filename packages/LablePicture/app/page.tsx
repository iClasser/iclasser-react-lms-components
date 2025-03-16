"use client";

import AppContext from "@/context/appContext";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import DEVELOPMENT_CONFIG from "@/package/development.config";
import uniqid from 'uniqid';
import { LocaleTypes, InsertMultipleContentVals, ContentType, GenerateNewTextKeysArgs } from "@/funcs/courseModuleTypes";
import LabelComponent from "@/package/NewLablePicture"; // Import your LabelComponent

export default function Home() {
  const [isEditMode, setIsEditMode] = useState(true);
  const [content, setContent] = useState({});
  const [structureComponent, updateComponentStructure] = useState(
    DEVELOPMENT_CONFIG.INITIAL_STRUCTURE
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
    updateComponentStructure((prev) => ({
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
    updateComponentStructure((prev) => ({
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
    mainKey?: string;
    sectionIndex: number;
    currentComponentIndex: number;
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

  const setContentVal = (data: any) => {
    const { textId, value } = data;
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

  const deleteMultipleContentVals = (list: InsertMultipleContentVals['list']) => {
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
    prefix = '',
    prefixObject = {}
  }: GenerateNewTextKeysArgs) => {
    const existingKeys = [...Object.keys(allContents)];
    const newKeys = Array.from({ length: numberOfKeys }, (_, index) => {
      const currentPrefix = prefixObject?.[index] || prefix || '';
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
    }
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
          <h1 className="text-2xl px-3">
            <strong>iClasser</strong> <code>Component</code> Playground
          </h1>
          <p className="px-3">
            This is a playground for you to test your new components.<br/> To create a component run <code className='bg-gray-100 px-1 rounded-md'>npx create-iclasser-react-component</code>
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
          <div className="flex justify-center items-start h-full">
            <div className="flex justify-center gap-10 flex-col items-center w-4/6 h-full">
             
              <div className="w-full pr-10">
                <h2 className="text-xl">
                  {isEditMode ? "Component Editor" : "Component Preview"}
                </h2>
                <div className="p-2 border border-gray-500/10 bg-gray-800 rounded-md min-h-96">
                  {/* Pass isEditMode to LabelComponent */}
                  <LabelComponent isEditMode={isEditMode} />
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
                  value={JSON.stringify(allContents, null, 2)}
                  className="border border-blue-500 rounded-md p-2 bg-blue-300"
                  defaultLanguage="json"
                  options={{ readOnly: true }}
                  defaultValue={JSON.stringify(allContents, null, 2)}
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
import style from "./style.module.css";
// import style from './style.module.css'
// import './style.module.css'

import { FileUploadButton } from "@/components/index";
import {
  ModuleCourseContentComponentContentType,
  LocaleTypes,
  ModuleCodingContentType,
  InsertMultipleContentVals,
  GenerateNewTextKeysArgs,
} from "@/funcs/courseModuleTypes";
import { useState } from "react";

interface FlashCardsStructureProps {
  textId?: string;
  props: {
    flashcards: {
      id: string;
      front: string;
      front_image?: string;
      back_title?: string;
      back: string;
    }[];
  };
  [key: string]: any;
}
type PrefixObj =
  | {
      [key: number]: string;
    }
  | undefined;

interface EditProps {
  sectionIndex: number;
  componentIndex: number;
  structureComponent: ModuleCourseContentComponentContentType;
  codingContents: ModuleCodingContentType;
  locale: LocaleTypes;
  uploadOptions: any;
  textData: any;
  setStructureVal: (args: {
    key: string;
    value: any;
    mainKey?: string;
    sectionIndex: number;
    currentComponentIndex: number;
  }) => void;
  setContentVal?: (data: any) => void;
  // crudCodeSubModuleByIndex: (sectionIndex: number, componentIndex: number, action: string, data: any) => void;
  generateNewTextKeys: (args: GenerateNewTextKeysArgs) => string[];
  insertMultipleContentVals?: (args: InsertMultipleContentVals) => void;
  deleteMultipleContentVals?: (list: InsertMultipleContentVals["list"]) => void;
}

const Edit = (props: EditProps) => {
  const {
    structureComponent,
    codingContents,
    uploadOptions,
    textData,
    setStructureVal,
    generateNewTextKeys,
    insertMultipleContentVals,
    deleteMultipleContentVals,
  } = props;
  const { textId, props: compProps } = structureComponent;
  const [lang, country] = props.locale.split("-");
  // const identifier = `${props.sectionIndex}_${props.componentIndex}`;

  type FlashCardsFlipStates = { [key: string]: boolean };
  const [flashcardsStates, setFlashcardsStates] =
    useState<FlashCardsFlipStates>({});

  const [activeFlashcardUploader, setActiveFlashcardUploader] =
    useState<string>("");

  const { flashcards } = compProps as FlashCardsStructureProps["props"];

  /** If code update needed: */
  /**
       const onCodeChange = (data) =>
    props.crudCodeSubModuleByIndex(
      props.sectionIndex,
      props.componentIndex,
      "set",
      {
        codeId: data.codeId,
        val: data.code,
      }
    );
  */

  const setFlashCardImage = (index: number, imageUrl: string) => {
    if (!flashcards || flashcards.length === 0 || !flashcards[index]) return;
    const newFlashcards = [...flashcards];
    newFlashcards[index].front_image = imageUrl;

    setStructureVal({
      key: "flashcards",
      value: newFlashcards,
      mainKey: "props",
      sectionIndex: props.sectionIndex,
      currentComponentIndex: props.componentIndex,
    });
  };

  const removeFlashCard = (index: number) => {
    if (!flashcards || flashcards.length === 0) return;
    let contentKeysToRemove = [] as string[];
    flashcards.forEach((flashcard) => {
      contentKeysToRemove.push(flashcard.front);
      contentKeysToRemove.push(flashcard.back);
    });
    const newFlashcards = [...flashcards];
    newFlashcards.splice(index, 1);
    // fix flascardstates
    setStructureVal({
      key: "flashcards",
      value: newFlashcards,
      mainKey: "props",
      sectionIndex: props.sectionIndex,
      currentComponentIndex: props.componentIndex,
    });
    // remove keys from setContentVal
    if (!deleteMultipleContentVals) return;
    deleteMultipleContentVals(
      contentKeysToRemove.map((textId) => ({
        textId,
        value: "",
      }))
    );
  };
  const createNewFlashCard = () => {
    let newContentKeys = generateNewTextKeys({
      numberOfKeys: 2,
      prefixObject: {
        0: "flashcard_front",
        1: "flashcard_back",
      },
    });
    const newFlashcard = {
      id: newContentKeys[0],
      front: newContentKeys[0],
      front_image: "",
      back: newContentKeys[1],
    };
    const newFlashcards = [...flashcards, newFlashcard];
    setStructureVal({
      key: "flashcards",
      value: newFlashcards,
      mainKey: "props",
      sectionIndex: props.sectionIndex,
      currentComponentIndex: props.componentIndex,
    });
    // add new keys to setContentVal
    if (!props.insertMultipleContentVals) return;

    props.insertMultipleContentVals({
      list: [
        {
          textId: newContentKeys[0],
          value: "",
        },
        {
          textId: newContentKeys[1],
          value: "",
        },
      ],
      lang,
      country,
    });
  };

  // const onFileUpload = ({ url: filePath }: { url: string }) => {
  //   setStructureVal({
  //     key: "url",
  //     value: filePath,
  //     mainKey: "props",
  //   });
  // };

  const flipCard = (id: string) => {
    setFlashcardsStates((prev: FlashCardsFlipStates) => {
      if (prev && prev[id]) {
        return { ...prev, [id]: !prev[id] };
      }
      return { ...prev, [id]: true };
    });
  };

  return (
    <div
      className="p-4 rounded-md block"
      style={{
        padding: "20px",
        direction: "ltr",
      }}
    >
      <span className="text-gray-500 italic ">Flashcards</span>
      <div className="relative z-[1] bg-white">
        <div className={`grid grid-cols-1 gap-4 ${style["flashcard_wrapper"]}`}>
          {flashcards.map((flashcard, index) => {
            return (
              <div
                key={flashcard.id}
                className={`col-span-1 ${style["flip"]} mb-5`}
              >
                <div className="absolute z-30 active:h-full m-auto w-full hover:bg-amber-500/20 rounded-md active:scale-95 transition-all">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFlashCard(index);
                    }}
                    className="w-2xs m-auto block bg-gray-100 cursor-pointer hover:text-amber-600 border  rounded-md"
                  >
                    Remove
                  </button>
                </div>
                <div className={style["card"]}>
                  {/* front */}
                  <div
                    className={
                      flashcardsStates[flashcard.id]
                        ? `${style["flipped"]} ${style["front"]}`
                        : style["front"]
                    }
                    role="button"
                    tabIndex={0}
                    onClick={() => flipCard(flashcard.id)}
                  >
                    <div className="flex flex-col items-center justify-center bg-gradient-to-bl from-blue-50 to-green-50">
                      <span className="relative mb-3">
                        {flashcard.front_image ? (
                          <img src={flashcard.front_image} alt="front" />
                        ) : (
                          <span className="text-gray-500 italic">No image</span>
                        )}
                        <span className="flex flex-row ">
                          {flashcard.front_image && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFlashCardImage(index, "");
                              }}
                              className="p-1 border rounded-md mb-2 cursor-pointer hover:text-gray-600"
                            >
                              remove image
                            </button>
                          )}
                          <span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveFlashcardUploader(flashcard.id);
                              }}
                              className="ml-2 p-1 border rounded-md mb-2 cursor-pointer hover:text-gray-600"
                            >
                              {flashcard.front_image
                                ? "Change image"
                                : "Add image"}
                            </button>

                            {activeFlashcardUploader === flashcard.id ? (
                              <FileUploadButton
                                modalOnly={true}
                                text={
                                  flashcard.front_image
                                    ? "Change image"
                                    : "Add image"
                                }
                                options={uploadOptions}
                                onComplete={(data: any) => {
                                  setFlashCardImage(index, data.url);
                                  setActiveFlashcardUploader("");
                                }}
                              />
                            ) : null}
                          </span>
                        </span>
                      </span>

                      <textarea
                        placeholder="Write front here"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onChange={(e) => {
                          if (!props.setContentVal) return;
                          props.setContentVal({
                            textId: flashcard.front,
                            value: e.target.value,
                            lang: props.locale.split("-")[0],
                            country: props.locale.split("-")[1],
                          });
                        }}
                        value={textData.getText(flashcard.front)}
                        className="w-full mx-2 border text-center"
                      ></textarea>
                    </div>
                  </div>

                  {/* back */}
                  <div
                    className={
                      flashcardsStates[flashcard.id]
                        ? `${style["flipped"]} ${style["back"]}`
                        : style["back"]
                    }
                    role="button"
                    tabIndex={0}
                    onClick={() => flipCard(flashcard.id)}
                  >
                    <div className="flex flex-col items-center justify-center bg-gradient-to-bl from-yellow-50 to-blue-50">
                      {flashcard.front && (
                        <h2>{textData.getText(flashcard.front)}</h2>
                      )}
                      <textarea
                        onChange={(e) => {
                          if (!props.setContentVal) return;
                          props.setContentVal({
                            textId: flashcard.back,
                            value: e.target.value,
                            lang: props.locale.split("-")[0],
                            country: props.locale.split("-")[1],
                          });
                        }}
                        placeholder="Write back here"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        value={textData.getText(flashcard.back)}
                        className="w-full mx-2 border text-center h-45"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => createNewFlashCard()}
        className="w-full m-auto block bg-gray-100 cursor-pointer hover:text-amber-600 border  rounded-md"
      >
        Add Flashcard
      </button>
    </div>
  );
};

export default Edit;

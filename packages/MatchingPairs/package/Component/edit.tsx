import style from "./style.module.css";
import { FileUploadButton } from "@/components/index";
import {
  ModuleCourseContentComponentContentType,
  LocaleTypes,
  ModuleCodingContentType,
  InsertMultipleContentVals,
  GenerateNewTextKeysArgs,
} from "@/funcs/courseModuleTypes";
import { useState } from "react";

interface MatchingPairsStructureProps {
  textId?: string;
  props: {
    pairs: {
      id: string;
      left: {
        text: string;
        image?: string;
      };
      right: {
        text: string;
        image?: string;
      };
    }[];
  };
  [key: string]: any;
}

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
  const { pairs } = compProps;

  // State to control which pair's image uploader is active.
  const [activeImageUploader, setActiveImageUploader] = useState<{
    pairId: string;
    side: "left" | "right";
  } | null>(null);

  // Update image for a specific side of a matching pair.
  const setPairImage = (
    pairIndex: number,
    side: "left" | "right",
    imageUrl: string
  ) => {
    if (!pairs || pairs.length === 0 || !pairs[pairIndex]) return;
    const newPairs = [...pairs];
    newPairs[pairIndex] = {
      ...newPairs[pairIndex],
      [side]: {
        ...newPairs[pairIndex][side],
        image: imageUrl,
      },
    };
    setStructureVal({
      key: "pairs",
      value: newPairs,
      mainKey: "props",
      sectionIndex: props.sectionIndex,
      currentComponentIndex: props.componentIndex,
    });
  };

  // Remove a matching pair.
  const removePair = (pairIndex: number) => {
    if (!pairs || pairs.length === 0) return;
    const newPairs = [...pairs];
    const pair = newPairs[pairIndex];
    const keysToRemove = [pair.left.text, pair.right.text];
    newPairs.splice(pairIndex, 1);
    setStructureVal({
      key: "pairs",
      value: newPairs,
      mainKey: "props",
      sectionIndex: props.sectionIndex,
      currentComponentIndex: props.componentIndex,
    });
    if (deleteMultipleContentVals) {
      deleteMultipleContentVals(
        keysToRemove.map((textId) => ({ textId, value: "" }))
      );
    }
  };

  // Create a new matching pair.
  const createNewPair = () => {
    const newContentKeys = generateNewTextKeys({
      numberOfKeys: 2,
      prefixObject: { 0: "pair_left", 1: "pair_right" },
    });
    const newPair = {
      id: newContentKeys[0],
      left: {
        text: newContentKeys[0],
        image: "",
      },
      right: {
        text: newContentKeys[1],
        image: "",
      },
    };
    const newPairs = [...pairs, newPair];
    setStructureVal({
      key: "pairs",
      value: newPairs,
      mainKey: "props",
      sectionIndex: props.sectionIndex,
      currentComponentIndex: props.componentIndex,
    });
    if (insertMultipleContentVals) {
      insertMultipleContentVals({
        list: [
          { textId: newContentKeys[0], value: "" },
          { textId: newContentKeys[1], value: "" },
        ],
        lang,
        country,
      });
    }
  };

  return (
    <div
      className="p-4 rounded-md block"
      style={{ padding: "20px", direction: "ltr" }}
    >
      <span className="text-gray-500 italic">MatchingPairs</span>
      <div className={`relative z-[1] bg-white ${style.matchingpairs_wrapper}`}>
        <div className={`grid grid-cols-1 gap-4 ${style.matchingpairs_grid}`}>
          {pairs.map((pair: MatchingPairsStructureProps, index: number) => (
            <div
              key={pair.id}
              className={`col-span-1 ${style.pair_container} mb-5 ${style.item}`}
            >
              <div className="flex gap-2 flex-row justify-between bg-white">
                {/* Left side */}
                <div className="w-1/2 p-2 border rounded-md">
                  <div className="flex flex-col items-center">
                    {pair.left.image ? (
                      <img src={pair.left.image} alt="left" className="mb-2 w-10" />
                    ) : (
                      <span className="text-gray-500 italic">No image</span>
                    )}
                    {pair.left.image && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPairImage(index, "left", "");
                        }}
                        className="p-1 border rounded-md cursor-pointer hover:text-gray-600 mb-2"
                      >
                        Remove image
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageUploader({
                          pairId: pair.id,
                          side: "left",
                        });
                      }}
                      className="p-1 border rounded-md cursor-pointer hover:text-gray-600 mb-2"
                    >
                      {pair.left.image ? "Change image" : "Add image"}
                    </button>
                    {activeImageUploader &&
                    activeImageUploader.pairId === pair.id &&
                    activeImageUploader.side === "left" ? (
                      <FileUploadButton
                        modalOnly={true}
                        text={pair.left.image ? "Change image" : "Add image"}
                        options={uploadOptions}
                        onComplete={(data: any) => {
                          setPairImage(index, "left", data.url);
                          setActiveImageUploader(null);
                        }}
                      />
                    ) : null}
                    <textarea
                      placeholder="Left text"
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        if (!props.setContentVal) return;
                        props.setContentVal({
                          textId: pair.left.text,
                          value: e.target.value,
                          lang,
                          country,
                        });
                      }}
                      value={textData.getText(pair.left.text)}
                      className="w-full mx-2 border text-center"
                    ></textarea>
                  </div>
                </div>
                <span className='text-red-500 font-light flex items-center'>=</span>
                {/* Right side */}
                <div className="w-1/2 p-2 border rounded-md">
                  <div className="flex flex-col items-center">
                    {pair.right.image ? (
                      <img
                        src={pair.right.image}
                        alt="right"
                        className="mb-2 w-10"
                      />
                    ) : (
                      <span className="text-gray-500 italic">No image</span>
                    )}
                    {pair.right.image && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPairImage(index, "right", "");
                        }}
                        className="p-1 border rounded-md cursor-pointer hover:text-gray-600 mb-2"
                      >
                        Remove image
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageUploader({
                          pairId: pair.id,
                          side: "right",
                        });
                      }}
                      className="p-1 border rounded-md cursor-pointer hover:text-gray-600 mb-2"
                    >
                      {pair.right.image ? "Change image" : "Add image"}
                    </button>
                    {activeImageUploader &&
                    activeImageUploader.pairId === pair.id &&
                    activeImageUploader.side === "right" ? (
                      <FileUploadButton
                        modalOnly={true}
                        text={pair.right.image ? "Change image" : "Add image"}
                        options={uploadOptions}
                        onComplete={(data: any) => {
                          setPairImage(index, "right", data.url);
                          setActiveImageUploader(null);
                        }}
                      />
                    ) : null}
                    <textarea
                      placeholder="Right text"
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        if (!props.setContentVal) return;
                        props.setContentVal({
                          textId: pair.right.text,
                          value: e.target.value,
                          lang,
                          country,
                        });
                      }}
                      value={textData.getText(pair.right.text)}
                      className="w-full mx-2 border text-center"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <button
                  onClick={() => removePair(index)}
                  className="bg-red-100 p-1 border rounded-md hover:text-red-600"
                >
                  Remove Pair
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => createNewPair()}
        className="w-full m-auto block bg-gray-100 cursor-pointer hover:text-amber-600 border rounded-md mt-4"
      >
        Add Matching Pair
      </button>
    </div>
  );
};

export default Edit;

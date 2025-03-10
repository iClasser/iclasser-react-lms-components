import style from "./style.module.css";

import "./style.module.css";
import { useState } from "react";

export interface FlashCardsPreviewStructureProps {
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

export interface FlashCardsPreviewProps {
  componentIndex: number;
  textData?: any;
  structureComponent: FlashCardsPreviewStructureProps;
  codingContents?: any;
}

const Preview = (props: FlashCardsPreviewProps) => {
  const {
    // componentIndex,
    textData,
    structureComponent,
    // codingContents,
  } = props;
  const {
    // textId,
    props: compProps,
  } = structureComponent;

  type FlashCardsFlipStates = { [key: string]: boolean };
  const [flashcardsStates, setFlashcardsStates] =
    useState<FlashCardsFlipStates>({});

  const { flashcards } = compProps;
  // console.log("flashcards", flashcards);
  const flipCard = (id: string) => {
    setFlashcardsStates((prev: FlashCardsFlipStates) => {
      if (prev && prev[id]) {
        return { ...prev, [id]: !prev[id] };
      }
      return { ...prev, [id]: true };
    });
  };

  if (!flashcards || flashcards.length === 0) {
    return null;
  }

  return (
    <div className="relative z-[1] grid grid-cols-1 gap-4">
      <div className={style["flashcard_wrapper"]}>
        {flashcards.map((flashcard, index) => {
          return (
            <div key={flashcard.id} className={style["flip"]}>
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
                  <div className="flex flex-col items-center justify-center">
                    {flashcard.front_image && (
                      <img src={flashcard.front_image} alt="front" />
                    )}
                    <h2>{textData.getText(flashcard.front)}</h2>
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
                  <div className="flex flex-col items-center justify-center">
                    {flashcard.front && (
                      <h2>{textData.getText(flashcard.front)}</h2>
                    )}
                    <p>{textData.getText(flashcard.back)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Preview;

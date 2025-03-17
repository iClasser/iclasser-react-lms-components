import style from "./style.module.css";
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

export type ComponentStructureProps = FlashCardsPreviewStructureProps;

export interface FlashCardsPreviewProps {
  componentIndex: number;
  textData?: any;
  structureComponent: FlashCardsPreviewStructureProps;
  codingContents?: any;
}

const Preview = (props: FlashCardsPreviewProps) => {
  const { textData, structureComponent } = props;
  const { props: compProps } = structureComponent;

  type FlashCardsFlipStates = { [key: string]: boolean };
  const [flashcardsStates, setFlashcardsStates] = useState<FlashCardsFlipStates>({});

  const { flashcards } = compProps;

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
            <div
              key={flashcard.id}
              className={`${style["flip"]} ${flashcardsStates[flashcard.id] ? style["flipped"] : ""}`}
              onClick={() => flipCard(flashcard.id)}
            >
              <div className={style["card"]}>
                {/* Front */}
                <div className={style["front"]}>
                  <div className="flex flex-col items-center justify-center bg-gradient-to-bl from-blue-50 to-green-50">
                    {flashcard.front_image && (
                      <img src={flashcard.front_image} alt="front" />
                    )}
                    <h2>{textData.getText(flashcard.front)}</h2>
                  </div>
                </div>

                {/* Back */}
                <div className={style["back"]}>
                  <div className="flex flex-col items-center justify-center bg-gradient-to-bl from-yellow-50 to-blue-50">
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

      {/* Add the enhanced hover animation styles with colorful shadow */}
      <style jsx>{`
        .${style["flip"]} {
          perspective: 1000px; /* Add perspective for 3D effect */
        }

        .${style["card"]} {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s ease-in-out;
          border-radius: 1rem; /* Add border-radius */
          overflow: hidden; /* Ensure child elements respect the border-radius */
        }

        .${style["front"]}, .${style["back"]} {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden; /* Hide the back face when flipped */
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1rem; /* Match border-radius */
        }

        .${style["front"]} {
          background: #fff; /* Front background color */
          border-top: 6px solid #007bff; /* Add a border to the front */
          transform: rotateY(0deg); /* Initially show the front */
          transition: transform 0.6s ease-in-out;
        }

        .${style["back"]} {
          background: #f0f0f0; /* Back background color */
          transform: rotateY(-180deg); /* Initially hide the back */
          transition: transform 0.6s ease-in-out;
        }

        .${style["flipped"]} .${style["front"]} {
          transform: rotateY(180deg); /* Flip the front */
        }

        .${style["flipped"]} .${style["back"]} {
          transform: rotateY(0deg); /* Show the back */
        }

        /* Hover animation with 10deg rotation */
        .${style["card"]}:hover {
          transform: rotateY(10deg); /* Rotate 10deg on hover */
          box-shadow: 0 10px 30px rgba(247, 186, 43, 0.6), 0 10px 30px rgba(234, 83, 88, 0.6); /* Colorful shadow */
        }
      `}</style>
    </div>
  );
};

export default Preview;
// Import necessary modules and components
import style from './style.module.css'; // Import CSS module for styling
import { FileUploadButton } from '@/components/index'; // Import FileUploadButton component
import {
  ModuleCourseContentComponentContentType,
  LocaleTypes,
  ModuleCodingContentType,
  InsertMultipleContentVals,
  GenerateNewTextKeysArgs,
} from '@/funcs/courseModuleTypes'; // Import types for course module functionality
import { useState } from 'react'; // Import useState hook for state management
import AnimatedButton from './AnimatedButton'; // Import AnimatedButton component for animated buttons

// Define the structure of the FlashCards component props
interface FlashCardsStructureProps {
  textId?: string; // Optional text ID
  props: {
    flashcards: {
      id: string; // Unique ID for each flashcard
      front: string; // Front content of the flashcard
      front_image?: string; // Optional image for the front of the flashcard
      back_title?: string; // Optional title for the back of the flashcard
      back: string; // Back content of the flashcard
    }[];
  };
  [key: string]: any; // Allow additional properties
}

// Define the props for the Edit component
interface EditProps {
  sectionIndex: number; // Index of the section
  componentIndex: number; // Index of the component
  structureComponent: ModuleCourseContentComponentContentType; // Structure of the component
  codingContents: ModuleCodingContentType; // Coding-related content
  locale: LocaleTypes; // Locale information (language and country)
  uploadOptions: any; // Options for file upload
  textData: any; // Text data for the flashcards
  setStructureVal: (args: {
    key: string;
    value: any;
    mainKey?: string;
    sectionIndex: number;
    currentComponentIndex: number;
  }) => void; // Function to update the structure
  setContentVal?: (data: any) => void; // Optional function to update content
  generateNewTextKeys: (args: GenerateNewTextKeysArgs) => string[]; // Function to generate new text keys
  insertMultipleContentVals?: (args: InsertMultipleContentVals) => void; // Optional function to insert multiple content values
  deleteMultipleContentVals?: (list: InsertMultipleContentVals['list']) => void; // Optional function to delete multiple content values
}

// Define the Edit component
const Edit = (props: EditProps) => {
  // Destructure props for easier access
  const {
    structureComponent,
    uploadOptions,
    textData,
    setStructureVal,
    generateNewTextKeys,
    insertMultipleContentVals,
    deleteMultipleContentVals,
  } = props;
  const { textId, props: compProps } = structureComponent; // Extract textId and component props
  const [lang, country] = props.locale.split('-'); // Split locale into language and country

  // Define state for tracking the flip state of each flashcard
  type FlashCardsFlipStates = { [key: string]: boolean };
  const [flashcardsStates, setFlashcardsStates] = useState<FlashCardsFlipStates>({});

  // Define state for tracking the active flashcard uploader
  const [activeFlashcardUploader, setActiveFlashcardUploader] = useState<string>('');

  // Extract flashcards from component props
  const { flashcards } = compProps as FlashCardsStructureProps['props'];

  // Calculate statistics for the flashcards
  const totalFlashcards = flashcards.length; // Total number of flashcards
  const flashcardsWithImages = flashcards.filter((card) => card.front_image).length; // Number of flashcards with images
  const incompleteFlashcards = flashcards.filter(
    (card) => !textData.getText(card.front) || !textData.getText(card.back),
  ).length; // Number of incomplete flashcards

  // Function to share flashcards
  const shareFlashcards = () => {
    const dataStr = JSON.stringify(flashcards, null, 2); // Convert flashcards to JSON string
    const encodedData = encodeURIComponent(dataStr); // Encode the JSON string
    const url = `${window.location.origin}/share?data=${encodedData}`; // Create shareable URL
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!'); // Show alert when URL is copied
    });
  };

  // Function to set the image for a flashcard
  const setFlashCardImage = (index: number, imageUrl: string) => {
    if (!flashcards || flashcards.length === 0 || !flashcards[index]) return; // Validate input
    const newFlashcards = [...flashcards]; // Create a copy of the flashcards array
    newFlashcards[index].front_image = imageUrl; // Update the image URL for the specified flashcard

    // Update the structure with the new flashcards array
    setStructureVal({
      key: 'flashcards',
      value: newFlashcards,
      mainKey: 'props',
      sectionIndex: props.sectionIndex,
      currentComponentIndex: props.componentIndex,
    });
  };

  // Function to remove a flashcard
  const removeFlashCard = (index: number) => {
    if (!flashcards || flashcards.length === 0) return; // Validate input
    let contentKeysToRemove = [] as string[]; // Array to store keys of content to remove
    flashcards.forEach((flashcard) => {
      contentKeysToRemove.push(flashcard.front); // Add front content key
      contentKeysToRemove.push(flashcard.back); // Add back content key
    });
    const newFlashcards = [...flashcards]; // Create a copy of the flashcards array
    newFlashcards.splice(index, 1); // Remove the flashcard at the specified index

    // Update the structure with the new flashcards array
    setStructureVal({
      key: 'flashcards',
      value: newFlashcards,
      mainKey: 'props',
      sectionIndex: props.sectionIndex,
      currentComponentIndex: props.componentIndex,
    });

    // Delete the associated content values
    if (!deleteMultipleContentVals) return;
    deleteMultipleContentVals(
      contentKeysToRemove.map((textId) => ({
        textId,
        value: '',
      })),
    );
  };

  // Function to create a new flashcard
  const createNewFlashCard = () => {
    // Generate new text keys for the front and back of the flashcard
    let newContentKeys = generateNewTextKeys({
      numberOfKeys: 2,
      prefixObject: {
        0: 'flashcard_front',
        1: 'flashcard_back',
      },
    });
    // Create a new flashcard object
    const newFlashcard = {
      id: newContentKeys[0],
      front: newContentKeys[0],
      front_image: '',
      back: newContentKeys[1],
    };
    const newFlashcards = [...flashcards, newFlashcard]; // Add the new flashcard to the array

    // Update the structure with the new flashcards array
    setStructureVal({
      key: 'flashcards',
      value: newFlashcards,
      mainKey: 'props',
      sectionIndex: props.sectionIndex,
      currentComponentIndex: props.componentIndex,
    });

    // Insert the new content values
    if (!props.insertMultipleContentVals) return;
    props.insertMultipleContentVals({
      list: [
        {
          textId: newContentKeys[0],
          value: '',
        },
        {
          textId: newContentKeys[1],
          value: '',
        },
      ],
      lang,
      country,
    });
  };

  // Function to flip a flashcard
  const flipCard = (id: string) => {
    setFlashcardsStates((prev: FlashCardsFlipStates) => {
      if (prev && prev[id]) {
        return { ...prev, [id]: !prev[id] }; // Toggle the flip state
      }
      return { ...prev, [id]: true }; // Set the flip state to true
    });
  };

  // Render the component
  return (
    <div className="p-4 rounded-md block">
      {/* Display the title */}
      <span className="text-gray-500 italic">Flashcards</span>

      {/* Flashcard Statistics */}
      <div className="mb-4 p-4 bg-gray-50 rounded-md">
        <h3 className="font-bold mb-2">Flashcard Statistics</h3>
        <p>Total Flashcards: {totalFlashcards}</p>
        <p>Flashcards with Images: {flashcardsWithImages}</p>
        <p>Incomplete Flashcards: {incompleteFlashcards}</p>
      </div>

      {/* Share Flashcards Button */}
      <div className="flex justify-center mb-4">
        <AnimatedButton onClick={shareFlashcards}>Share Flashcards</AnimatedButton>
      </div>

      {/* Existing flashcard content */}
      <div className="relative z-[1] bg-white">
        <div className={`grid grid-cols-1 gap-4 ${style['flashcard_wrapper']}`}>
          {flashcards.map((flashcard, index) => (
            <div key={flashcard.id} className={`col-span-1 ${style['flip']} mb-5`}>
              {/* Remove Button */}
              <div className="flex justify-center absolute z-30 w-full top-0">
                <AnimatedButton
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFlashCard(index);
                  }}
                  className="w-2xs bg-gray-100 cursor-pointer hover:text-amber-600 border rounded-md"
                >
                  Remove
                </AnimatedButton>
              </div>
              <div className={style['card']}>
                {/* Front of the flashcard */}
                <div
                  className={
                    flashcardsStates[flashcard.id]
                      ? `${style['flipped']} ${style['front']}`
                      : style['front']
                  }
                  role="button"
                  tabIndex={0}
                  onClick={() => flipCard(flashcard.id)}>
                  <div className="flex flex-col items-center justify-center bg-gradient-to-bl from-blue-50 to-green-50">
                    <span className="relative mb-3">
                      {flashcard.front_image ? (
                        <img src={flashcard.front_image} alt="front" />
                      ) : (
                        <span className="text-gray-500 italic">No image</span>
                      )}
                      <span className="flex flex-row">
                        {flashcard.front_image && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFlashCardImage(index, '');
                            }}
                            className="p-1 border rounded-md mb-2 cursor-pointer hover:text-gray-600">
                            Remove image
                          </button>
                        )}
                        <span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveFlashcardUploader(flashcard.id);
                            }}
                            className="ml-2 p-1 border rounded-md mb-2 cursor-pointer hover:text-gray-600">
                            {flashcard.front_image ? 'Change image' : 'Add image'}
                          </button>

                          {activeFlashcardUploader === flashcard.id ? (
                            <FileUploadButton
                              isOpen={(o: any) => {
                                if (!o) setActiveFlashcardUploader('');
                              }}
                              modalOnly={true}
                              text={
                                flashcard.front_image ? 'Change image' : 'Add image'
                              }
                              options={uploadOptions}
                              onComplete={(data: any) => {
                                setFlashCardImage(index, data.url);
                                setActiveFlashcardUploader('');
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
                          lang: props.locale.split('-')[0],
                          country: props.locale.split('-')[1],
                        });
                      }}
                      value={textData.getText(flashcard.front)}
                      className="w-full mx-2 border text-center"></textarea>
                  </div>
                </div>

                {/* Back of the flashcard */}
                <div
                  className={
                    flashcardsStates[flashcard.id]
                      ? `${style['flipped']} ${style['back']}`
                      : style['back']
                  }
                  role="button"
                  tabIndex={0}
                  onClick={() => flipCard(flashcard.id)}>
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
                          lang: props.locale.split('-')[0],
                          country: props.locale.split('-')[1],
                        });
                      }}
                      placeholder="Write back here"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      value={textData.getText(flashcard.back)}
                      className="w-full mx-2 border text-center h-45"></textarea>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Flashcard Button - Centered */}
      <div className="flex justify-center mt-4">
        <AnimatedButton onClick={createNewFlashCard}>Add Flashcard</AnimatedButton>
      </div>

      {/* Add border-radius to the flashcard */}
      <style jsx>{`
        .${style['card']} {
          border-radius: 1rem; /* Add border-radius of 1rem */
          overflow: hidden; /* Ensure child elements respect the border-radius */
        }

        .${style['front']}, .${style['back']} {
          border-radius: 1rem; /* Ensure front and back also have border-radius */
        }
      `}</style>
    </div>
  );
};

export default Edit;
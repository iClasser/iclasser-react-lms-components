import {
  ComponentWrapper,
  ComponentPropsToolbar,
} from "@/editorComponents/index";
import Preview, { FlashCardsPreviewStructureProps } from "./preview";
import { compKey as componentNameKey, FlashCardsPropsObj } from "./config";
import Edit from "./edit";
import getToolbarConfig from "@/funcs/getToolbarConfig";
import {
  LocaleTypes,
  // ModuleCourseContentComponentContentType,
  // ReservedPropsKeysTypes,
  // ModuleCourseContentType,
  // ModuleStructureType,
  // ModuleContentType,
  // ContentType,
  // ComponentPropTypes,
  // LocaleTypes,
  // CountryType,
  // LangType,
  InsertMultipleContentVals,
  GenerateNewTextKeysArgs,
  ModuleCodingContentType,
} from "@/funcs/courseModuleTypes";

// FlashCards
// ** Change when creating new component here ** //
type PrefixObj = {
  [key: number]: string;
} | undefined;
interface NewFlashCardsEditProps {
  structureComponent: FlashCardsPreviewStructureProps;
  codingContents: ModuleCodingContentType;
  uploadOptions: any;
  sectionIndex: number;
  componentIndex: number;
  currentLang: LocaleTypes;
  textData: any;
  editMode: boolean;
  setContentVal?: (data: any) => void;
  setStructureVal: ({
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
  }) => void;
  generateNewTextKeys: (args: GenerateNewTextKeysArgs) => string[];
  insertMultipleContentVals?:(args: InsertMultipleContentVals) => void;
  deleteMultipleContentVals?: (args: InsertMultipleContentVals['list']) => void;
}
const NewFlashCardsEdit = (props: NewFlashCardsEditProps) => {
  const {
    structureComponent,
    textData,
    codingContents,
    uploadOptions,
    sectionIndex,
    componentIndex,
    currentLang,
    editMode,
    setStructureVal,
    generateNewTextKeys,
    insertMultipleContentVals,
    deleteMultipleContentVals,
  } = props;
  const { textId, props: compProps } = structureComponent;
  const [lang, country] = currentLang.split("-");
  const identifier = `${sectionIndex}_${componentIndex}`;
  const COMP_PROP_TYPES = FlashCardsPropsObj?.FlashCards || {}; // COMPONENT_PROPS[componentNameKey] || {};

  const {
    showOneOfProps,
    showEachOfProps,
    showMultiChoiceProps,
    hasEditForm,
    toolbarProps,
  } = getToolbarConfig({
    COMP_PROP_TYPES,
    sectionIndex,
    componentIndex,
    compProps,
  });

  const compWrapperConfigProps = {
    name: componentNameKey,
    editMode: editMode,
    sectionIndex: sectionIndex,
    hasEditForm,
    componentIndex: componentIndex,
    /* change here if needed extra buttons: */
    // extraButtonForm: <></>
  };
  // const { url } = compProps;

  interface FlashCardSetContentVal {
    textId?: string;
    value?: string;
    lang?: string;
    country?: string;
  }
  const setContentVal = (data: FlashCardSetContentVal) => {
    if (!props.setContentVal) return;
    const { textId, value, lang, country } = data;
    props.setContentVal({
      textId,
      value,
      lang,
      country,
    });
  };

  return (
    <ComponentWrapper
      {...compWrapperConfigProps}
      alwaysShowEditButtonForm
      editButtonForm={() => (
        <div className="flex flex-col gap-2">
          <ComponentPropsToolbar {...toolbarProps} />
        </div>
      )}
      edit={
        <>
          <Edit
            structureComponent={structureComponent}
            codingContents={codingContents}
            sectionIndex={sectionIndex}
            componentIndex={componentIndex}
            locale={currentLang}
            uploadOptions={uploadOptions}
            textData={textData}
            setStructureVal={setStructureVal}
            setContentVal={setContentVal}
            generateNewTextKeys={generateNewTextKeys}
            insertMultipleContentVals={insertMultipleContentVals}
            deleteMultipleContentVals={deleteMultipleContentVals}
          />
        </>
      }
      preview={
        <Preview
          componentIndex={componentIndex}
          textData={textData}
          structureComponent={structureComponent}
          codingContents={codingContents}
        />
      }
    />
  );
};

export default NewFlashCardsEdit;

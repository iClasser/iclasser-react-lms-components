import {
  ComponentWrapper,
  ComponentPropsToolbar,
} from '@/editorComponents/index';
import Preview, { LottieBlockPreviewStructureProps } from './preview';
import { compKey as componentNameKey, LottieBlockPropsObj } from './config';
import Edit from './edit';
import getToolbarConfig from '@/funcs/getToolbarConfig';
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
  ModuleCodingContentType,
} from '@/funcs/courseModuleTypes';

// LottieBlock
// ** Change when creating new component here ** //
interface NewLottieBlockEditProps {
  structureComponent: LottieBlockPreviewStructureProps;
  codingContents: ModuleCodingContentType;
  uploadOptions: any;
  sectionIndex: number;
  componentIndex: number;
  currentLang: LocaleTypes;
  textData: any;
  editMode: boolean;
  setStructureVal: ({
    key,
    value,
    mainKey,
  }: {
    key: string;
    value: any;
    mainKey?: string;
  }) => void;
}
const NewLottieBlockEdit = (props: NewLottieBlockEditProps) => {
  const {
    structureComponent,
    textData,
    codingContents,
    uploadOptions,
    sectionIndex,
    componentIndex,
    currentLang,
    editMode,
  } = props;
  const { textId, props: compProps } = structureComponent;
  const [lang, country] = currentLang.split('-');
  const identifier = `${sectionIndex}_${componentIndex}`;
  const COMP_PROP_TYPES = LottieBlockPropsObj?.LottieBlock || {}; // COMPONENT_PROPS[componentNameKey] || {};

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
  const { url } = compProps;

  return (
    <ComponentWrapper
      {...compWrapperConfigProps}
      alwaysShowEditButtonForm
      editButtonForm={() => (
        <div className='flex flex-col gap-2'>
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
          currentLang={currentLang}
          uploadOptions={{}}
          setStructureVal={props.setStructureVal}
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

export default NewLottieBlockEdit;

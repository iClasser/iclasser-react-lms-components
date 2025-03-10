import "./style.module.css";
// import style from './style.module.css'
// import './style.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FileUploadButton } from "@/components/index";
import {
  ModuleCourseContentComponentContentType,
  LocaleTypes,
  ModuleCodingContentType,
} from "@/funcs/courseModuleTypes";

interface EditProps {
  sectionIndex: number;
  componentIndex: number;
  structureComponent: ModuleCourseContentComponentContentType;
  codingContents: ModuleCodingContentType;
  currentLang: LocaleTypes;
  uploadOptions: any;
  setStructureVal: (data: any) => void;
  // crudCodeSubModuleByIndex: (sectionIndex: number, componentIndex: number, action: string, data: any) => void;
}

const Edit = (props: EditProps) => {
  const { structureComponent, codingContents, uploadOptions } = props;
  const { textId, props: compProps } = structureComponent;
  // const [lang, country] = props.currentLang.split("-");
  // const identifier = `${props.sectionIndex}_${props.componentIndex}`;

  const { url } = compProps;

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

  

  const setStructureVal = (key: string, value: string, mainKey: string) => {
    props.setStructureVal({ key, value, mainKey });
  };

  const onFileUpload = ({ url: filePath }: { url: string }) => {
    setStructureVal("url", filePath, "props");
  };

  return (
    <div
      className="p-4 rounded-md block"
      style={{
        padding: "20px",
        direction: "ltr",
      }}
    >
      <span className="text-gray-500 italic ">
        Animation (lottie JSON file)
      </span>
      <div
        className={`mt-5 rounded-md p-4 flex gap-2 items-center justify-center mb-5 border border-gray-300 ${
          url ? "bg-green-50" : "bg-gray-100"
        } `}
      >
        <FontAwesomeIcon
          icon={url ? faCheckCircle : faCircle}
          className={`${
            url ? "text-green-500" : "text-gray-400"
          } animate-pulse w-40 h-40`}
        />
        <div>
          {url && (
            <div className="text-green-600">
              1 lottie animation selected already
            </div>
          )}
          {!url && <div>No file selected</div>}
          <FileUploadButton
            options={uploadOptions || {}} // { courseId, moduleId, blogId, isBlogPage }
            className="btn-sm btn-primary normal-case"
            text={url ? "Change Lottie Animation" : "Upload Animation"}
            onComplete={onFileUpload}
          />

          {url && (
            <button
              className="btn-sm btn-danger"
              onClick={() => setStructureVal("url", "", "props")}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;

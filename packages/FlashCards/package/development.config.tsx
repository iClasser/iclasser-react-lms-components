import { LocaleTypes } from "@/funcs/courseModuleTypes";
import { compKey } from "./Component/config";
import { ComponentStructureProps } from "./Component/preview";

// This constent can be used inside FileUploader component
const UPLOAD_URL1 =
  "https://iclasser-cloud.s3.amazonaws.com/iclasser/logo_dark_no-label_cfxsrh.png";

const DEVELOPMENT_CONFIG = {
  UPLOAD_URL1,
  //   initial state of the component:
  DEFAULT_LOCALE: "en-US" as LocaleTypes,
  INITIAL_CODE_CONTENT: [],
  INITIAL_TEXT_CONTENT: {
    flashcard1_front: "Verbal Evaluation",
    flashcard1_back:
      "Your speech evaluator will deliver a verbal evaluation before the club meeting is finished. The verbal evaluation is in front of the club. ",
  },
  INITIAL_STRUCTURE: {
    type: compKey,
    props: {
      pairs: [
        {
          id: "flashcard1",
          front: "flashcard1_front",
          front_image:
            "https://iclasser-cloud.s3.amazonaws.com/iclasser/logo_dark_no-label_cfxsrh.png",
          back: "flashcard1_back",
        },
      ],
      shuffleRight: true,
    },
  } as ComponentStructureProps,
};
export default DEVELOPMENT_CONFIG;

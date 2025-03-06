import { LocaleTypes } from "@/funcs/courseModuleTypes";
import { compKey } from "./NewLottieBlockEdit/config";
import { LottieBlockPreviewStructureProps } from "./NewLottieBlockEdit/preview";

// This constent can be used inside FileUploader component
const UPLOAD_URL1 =
  "https://iclasser-cloud.s3.amazonaws.com/animations/tick-simple.json";

const DEVELOPMENT_CONFIG = {
  UPLOAD_URL1,
  //   initial state of the component:
  DEFAULT_LOCALE: "en-US" as LocaleTypes,
  INITIAL_CODE_CONTENT: [],
  INITIAL_TEXT_CONTENT: {},
  INITIAL_STRUCTURE: {
    type: compKey,
    props: {
      url: "",
      loop: false,
    },
    textId: "lottieBlock",
  } as LottieBlockPreviewStructureProps,
};
export default DEVELOPMENT_CONFIG;

import { LocaleTypes } from "@/funcs/courseModuleTypes";
import { compKey } from "./NewMatchingPairsEdit/config";
import { MatchPairsStructureProps } from "./NewMatchingPairsEdit/preview";

// This constent can be used inside FileUploader component
const UPLOAD_URL1 =
  "https://iclasser-cloud.s3.amazonaws.com/iclasser/logo_dark_no-label_cfxsrh.png";

const DEVELOPMENT_CONFIG = {
  UPLOAD_URL1,
  //   initial state of the component:
  DEFAULT_LOCALE: "en-US" as LocaleTypes,
  INITIAL_CODE_CONTENT: [],
  INITIAL_TEXT_CONTENT: {
    left_pair_1: "Verbal Evaluation",
    right_pair_1:
      "Your speech evaluator will deliver a verbal evaluation before the club meeting is finished. The verbal evaluation is in front of the club. ",
  },
  INITIAL_STRUCTURE: {
    type: compKey,
    props: {
      pairs: [
        {
          id: "1",
          left: {
            text: 'left_pair_1',
            image: UPLOAD_URL1,
          },
          right: {
            text: 'right_pair_1',
          },
        }
      ],
      shuffleRight: true,
    },
  } as MatchPairsStructureProps,
};
export default DEVELOPMENT_CONFIG;

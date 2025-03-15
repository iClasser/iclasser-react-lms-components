import { EachOfProps, OneOfProps, MultiChoiceProps} from "@/funcs/getToolbarConfig";

export const compKey = "MatchingPairs";

export const MatchingPairsPropsObj = {
  [compKey]: {
    eachOfProps: {
      shuffleLeft: "boolean",
      shuffleRight: "boolean",
    } as EachOfProps,

    /**
        multiChoiceProps: {
            language: ['javascript', 'html', 'typescript'],
        } as MultiChoiceProps,
         
        oneOfProps: [{
            name: 'Instruction Position',
            choices: ['showInstBottom', 'showInstTop']
        }] as OneOfProps,
    */
  },
};

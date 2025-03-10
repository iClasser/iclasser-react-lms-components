import { EachOfProps, OneOfProps, MultiChoiceProps} from "@/funcs/getToolbarConfig";

export const compKey = "FlashCards";

export const FlashCardsPropsObj = {
  [compKey]: {
    eachOfProps: {
      loop: "boolean",
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

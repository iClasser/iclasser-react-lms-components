interface CompPropTypes {
  oneOfProps?: any[];
  eachOfProps?: { [key: string]: any };
  multiChoiceProps?: { [key: string]: any };
}

interface Config {
  COMP_PROP_TYPES: CompPropTypes;
  compProps: any;
  componentIndex: number;
  sectionIndex: number;
}

interface ToolbarProps {
  showOneOfProps: boolean | undefined;
  COMP_PROP_TYPES: CompPropTypes;
  showEachOfProps: boolean | string | undefined;
  showMultiChoiceProps: boolean | undefined;
  sectionIndex: number;
  componentIndex: number;
  compProps: any;
}

interface ToolbarConfig {
  showOneOfProps: boolean | undefined;
  showEachOfProps: boolean | undefined;
  showMultiChoiceProps: boolean | undefined;
  hasEditForm: boolean;
  toolbarProps: ToolbarProps;
}


export type EachOfProps =
  | {
      [key: string]: string | number | boolean | undefined;
    }
  | {}
  | undefined;

export type MultiChoiceProps =
  | {
      [key: string]: string[] | number[] | boolean[] | undefined;
    }
  | {}
  | undefined;

export type InsideOneOfProps = {
  name: string;
  choices: string[];
};
export type OneOfProps = [InsideOneOfProps] | [] | undefined;


const getToolbarConfig = (config: Config): ToolbarConfig => {
  const { COMP_PROP_TYPES, compProps, componentIndex, sectionIndex } = config;
  // console.log({ config });
  const showOneOfProps =
    COMP_PROP_TYPES.oneOfProps && COMP_PROP_TYPES.oneOfProps.length > 0;
  const showEachOfProps =
    COMP_PROP_TYPES.eachOfProps &&
    Object.keys(COMP_PROP_TYPES.eachOfProps).length > 0;
  const showMultiChoiceProps =
    COMP_PROP_TYPES.multiChoiceProps &&
    Object.keys(COMP_PROP_TYPES.multiChoiceProps).length > 0;
  const hasEditForm = !!(
    showOneOfProps ||
    showEachOfProps ||
    showMultiChoiceProps
  );
  // console.log({hasEditForm})
  const toolbarProps: ToolbarProps = {
    showOneOfProps,
    COMP_PROP_TYPES,
    showEachOfProps,
    showMultiChoiceProps,
    sectionIndex: sectionIndex,
    componentIndex: componentIndex,
    compProps: compProps,
  };
  return {
    showOneOfProps,
    showEachOfProps,
    showMultiChoiceProps,
    hasEditForm,
    toolbarProps,
  };
};

export default getToolbarConfig;

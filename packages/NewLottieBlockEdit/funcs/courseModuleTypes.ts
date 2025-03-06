export type ComponentPropTypes = string | 'LottieBlock';
export type LangType = string; // Add more as needed
export type CountryType = string; // Add more as needed
export type LocaleTypes = `${LangType}-${CountryType}`;

export type ModuleCodingContentType = String[] | [];

export interface ModuleCourseContentComponentContentType {
    type?: ComponentPropTypes;
    props?: {
        [key: string]: any;
    } | {} | any | undefined;
    [key: string]: any;
}
export interface ModuleCourseContentType {
    props: {
        uniqueId: string;
        enableTracker: boolean;
        smallThumb: boolean;
    },
    codingContents?: ModuleCodingContentType;

    module: {
        title: {
            textId: string;
        };
        button: {
            textId: string;
            trackerId?: string;
            green: boolean;
            eyeIcon: boolean;
        },
        contents: Array<ModuleCourseContentComponentContentType>;
    };
    isPublic?: boolean;
}

export interface ModuleStructureType  {
    PAGE_ID?: string;
    metaData?: {
        id: string;
        path: string;
        courseId: string;
        position: number;
        iconUrl: string;
        bgColor: string;
    },
    allActivities?: {
        [key: string]: Array<String>;
    },
    COURSE_CONTENT?: ModuleCourseContentType[];
};

export interface ContentType {
    [key: string]: string;
};

export interface ModuleContentType {
    [country: string]: {
        [language: string]: ContentType;
    }
};



export interface ReservedPropsKeysTypes {
    [key: string]: boolean | string | undefined
}
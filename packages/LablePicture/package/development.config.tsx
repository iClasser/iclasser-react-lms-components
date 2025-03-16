import { LocaleTypes } from "@/funcs/courseModuleTypes";

// This constant can be used inside the LabelComponent
const UPLOAD_URL1 =
  "https://iclasser-cloud.s3.amazonaws.com/iclasser/logo_dark_no-label_cfxsrh.png";

const DEVELOPMENT_CONFIG = {
  UPLOAD_URL1,
  // Initial state of the component:
  DEFAULT_LOCALE: "en-US" as LocaleTypes,
  INITIAL_CODE_CONTENT: [], // Not used in LabelComponent, but kept for compatibility
  INITIAL_TEXT_CONTENT: {
    label_text: "Default Label Text", // Example text for the label
  },
  INITIAL_STRUCTURE: {
    type: "LabelComponent", // Replace with the actual key for your LabelComponent
    props: {
      imageUrl: UPLOAD_URL1, // Default image URL for the label
      labelText: "label_text", // Key for the label text in INITIAL_TEXT_CONTENT
      isEditable: true, // Allow editing in edit mode
      animationDuration: 300, // Animation duration in milliseconds
    },
  },
};

export default DEVELOPMENT_CONFIG;
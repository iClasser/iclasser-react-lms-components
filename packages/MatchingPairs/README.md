# iClasser React LMS Components
`iclasser-react-lms-components` is a reusable React library designed to provide a collection of components for building Learning Management System (LMS) interfaces. 

This library aims to streamline the development process by offering pre-built, customizable components that adhere to best practices and modern design principles. Whether you're creating dashboards, course management tools, or student interaction features, `iclasser-react-lms-components` offers a robust set of tools to help you build efficient and user-friendly LMS applications.

Each library has two interfaces:

## 1. Edit mode
For iClasser editing, click Edit button when the app is running.

## 2. Preview
How it will interact with customer facing. click Preview button when the app is running.

## 3. Coding contents
These are used for static contents like code snippets for the component.

## 4. Text Contents
These are used to store textual information that will be helpful in localization and decoupling contents from the code.

## 5. Structure Contents
Those are props, and settings or states for the component, text content should not be added there.

# Development Environment Installation
* `npm install` or `npm run setup`

# Creating clean copy
* `npm run clean` and then `npm run setup`

# Starting development preview
* `npm run dev`

# Development
* Do not change anything inside `package/dist-preview`, this is only used for publishing purpose. 
* Except above, everything exists inside `package/Component` and other files, that you can play around.
* We recommend you to create a preview file `package/Component/preview.tsx` changes where it would show you what to see as of result, and then insert edit files (`package/Component/index.tsx`, `package/Component/edit.tsx`).
* Do not create any other functions, when loading text there is textData.getText('key.name') which will load content from content json file. and when changing props or structure or code there are functions for that to be used.
* Do not create components where files would be uploaded unless taken approval from iClasser, only iClasser has the right to create uploader.
* `package/development.config.tsx` file is where you can play around your initial state, for testing in this NextJS app to test your component.
* Do not import external media, if you wish to submit any images or assets files links has to be submitted inside the PR and will be uploaded to iclasser cloud, and links would used inside component.
* Do not change inside other folders like `./app`, `./funcs`, `./editorComponents`

# Before commiting your PR:
* Make sure to change `CHANGELOG.md` and also Version in `package.json`. and run `npm install` to update `package-lock.json`.
* Run `npm run preview-pre-publish` to update the published version.

# Versioning Guide
* If its a small bug fix, create minor change like `1.0.0` turns to `1.0.1`
* If its a new feature, create a new version like `1.0.0` turns to `1.1.0`
* If its a breaking change, create a new version like `1.0.0` turns to `2.0.0`

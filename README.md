# iClasser React LMS Components
`iclasser-react-lms-components` is a reusable React library designed to provide a collection of components for building Learning Management System (LMS) interfaces. 

This library aims to streamline the development process by offering pre-built, customizable components that adhere to best practices and modern design principles. Whether you're creating dashboards, course management tools, or student interaction features, `iclasser-react-lms-components` offers a robust set of tools to help you build efficient and user-friendly LMS applications.

Each library has two things:

## 1. Edit mode
For iClasser editing, click Edit button when the app is running.

## 2. Preview
How it will interact with customer facing. click Preview button when the app is running.

## Coding contents
These are used for static contents like code snippets for the component.

## Text Contents
These are used to store textual information that will be helpful in localization and decoupling contents from the code.

## Structure Contents
Those are props, and settings or states for the component, text content should not be added there.


# Create an example without fork
To create a new React component without a fork, use the following command:

`npx create-iclasser-react-component <ComponentName>`
Replace `<ComponentName>` with the name of the component you want to create.

# Contribution guide:
* Fork this repository to your self
* Clone your repository using `git clone ...`
* Add our repository as `upstream` by running : `git remote add upstream https://github.com/iClasser/iclasser-react-lms-components.git`
* Get latest from `develop` branch: `git fetch upstream && git pull upstream develop`
* Create your changes, and push to your origin: `git add . && git commit -m "your comment" && git push -u origin your-branch-name`
* Make a PR against our `develop` branch
* Work with our community make changes to your PR
* Get your things merged to `develop`
* Thanks

# Installation
`npm install @iclasser-react`

# Develop or test individual component:
> `cd package/MatchingPairs`

> `npm run setup`

> `npm run dev`

# Playground

![Screenshot 2025-03-10 at 8 49 51 AM 1](https://github.com/user-attachments/assets/544c86a5-718a-4269-8753-f30c9eb396e2)

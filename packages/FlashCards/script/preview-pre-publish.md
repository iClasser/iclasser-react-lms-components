# Preview pre-publish script
This script is used to create a build for release of the Preview component.

## How to exclude unwanted package
You can add a package to exclude from build in the `preview-pre-publish.js` section

## How to create a new preview build
Run `npm run preview-pre-publish` from the root of this component. To create a build in `packages/dist-preview` folder.

## How to publish to NPM
First run `npm run build`, and then `npm pack && npm publish --dry-run`

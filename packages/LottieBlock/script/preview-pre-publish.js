// this script will be run before publishing the package

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { promisify } = require("util");

const writeFile = promisify(fs.writeFile);
const exec = promisify(execSync);
const packagePath = path.join(__dirname, "../");
const packageJsonPath = path.join(packagePath, "package.json");
const packageComponentPath = path.join(packagePath, "package/Component");
const packageOutputPath = path.join(packagePath, "package/dist-preview");
const packageJson = require(packageJsonPath);
const packageName = packageJson.name;
const version = packageJson.version;

// since the package.json belongs to nextjs, we need to grab the extra dependencies
const excludeDependencies = [
  "@tailwindcss/postcss",
  "@testing-library/dom",
  "@testing-library/react",
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "jest",
  "jest-environment-jsdom",
  "tailwindcss",
  "typescript",
  "@testing-library/jest-dom",
  "next",
  "react",
  "react-dom",

  // only used in edit, not preview:
  "uniqid",
];

const nextDependencies = packageJson.dependencies;
const nextDevDependencies = packageJson.devDependencies;

(async () => {
  try {
    console.log("Running pre-publish script...");
    console.log(`packageJsonPath: ${packageJsonPath}`);
    const newPackageJson = {
      name: packageName,
      version: version,
      description: "iClasser React Library",
      main: "dist/index.js",
      types: "dist/index.d.ts",
      scripts: {
        build:
          "tsc && (if ls src/*.css 1> /dev/null 2>&1; then copyfiles -u 1 'src/*.css' dist; else echo 'No CSS files to copy'; fi)",
      },
      peerDependencies: {
        react: ">=16.8.0",
        "react-dom": ">=16.8.0",
      },
      devDependencies: {
        typescript: "^4.5.0",
        "@types/react": "^17.0.0",
        "@types/react-dom": "^17.0.0",
        copyfiles: "^2.4.1",
      },
      dependencies: {},
      repository: {
        type: "git",
        url: "https://github.com/iClasser/iclasser-react-lms-components.git",
        directory: `packages/${
          path.basename(packagePath)
        }/package/dist-preview`,
      },
      publishConfig: {
        access: "public",
      },
      files: ["dist"],
      keywords: ["react", "iclasser", "typescript", "component", path.basename(packagePath)],
      license: "MIT",
    };
    const newNextDependencies = Object.keys(nextDependencies).reduce(
      (acc, key) => {
        if (!excludeDependencies.includes(key)) {
          acc[key] = nextDependencies[key];
        }
        return acc;
      },
      {}
    );
    const newNextDevDependencies = Object.keys(nextDevDependencies).reduce(
      (acc, key) => {
        if (!excludeDependencies.includes(key)) {
          acc[key] = nextDevDependencies[key];
        }
        return acc;
      },
      {}
    );

    newPackageJson.dependencies = newNextDependencies;
    newPackageJson.devDependencies = {
      ...newPackageJson.devDependencies,
      ...newNextDevDependencies,
    };

    // remove and create the dist-preview folder
    if (fs.existsSync(packageOutputPath)) {
      fs.rmSync(packageOutputPath, { recursive: true, force: true });
    }
    fs.mkdirSync(packageOutputPath, { recursive: true });
    console.log("dist-preview folder created");

    // package.json to be saved in the dist-preview folder
    const newPackageJsonPath = path.join(packageOutputPath, "package.json");
    const newPackageJsonString = JSON.stringify(newPackageJson, null, 2);
    await writeFile(newPackageJsonPath, newPackageJsonString);
    console.log("✅ package.json updated");

    // create tsconfig.json
    const tsconfigOutputPath = path.join(packageOutputPath, "tsconfig.json");
    writeFile(
      tsconfigOutputPath,
      `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "skipLibCheck": true,
    "strict": false,
    "declaration": true,
    "outDir": "dist",
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx"
  },
  "include": ["src", "src/**/*", "global.d.ts"],
  "exclude": ["node_modules", "dist"]
}
`
    );
    console.log("✅ tsconfig.json updated");

    // create global.d.ts
    const globalOutputPath = path.join(packageOutputPath, "global.d.ts");
    await writeFile(
      globalOutputPath,
      `declare module '*.module.css';
`
    );
    console.log("✅ global.d.ts updated");

    // create .gitignore
    const gitignoreOutputPath = path.join(packageOutputPath, ".gitignore");
    await writeFile(
      gitignoreOutputPath,
      `# dependencies
        /node_modules
        /dist
        
        `
    );
    console.log("✅ .gitignore updated");

    // copy README.md to dist-preview folder
    const readmeInputPath = path.join(packagePath, "README-PREVIEW.md");
    const readmeOutputPath = path.join(packageOutputPath, "README.md");
    fs.copyFileSync(readmeInputPath, readmeOutputPath);
    console.log("✅ README.md copied");
    // copy LICENSE to dist-preview folder
    const licenseInputPath = path.join(packagePath, "LICENSE.md");
    const licenseOutputPath = path.join(packageOutputPath, "LICENSE.md");
    fs.copyFileSync(licenseInputPath, licenseOutputPath);
    console.log("✅ LICENSE copied");
    // copy CHANGELOG.md to dist-preview folder
    const changelogInputPath = path.join(packagePath, "CHANGELOG.md");
    const changelogOutputPath = path.join(packageOutputPath, "CHANGELOG.md");
    fs.copyFileSync(changelogInputPath, changelogOutputPath);
    console.log("✅ CHANGELOG.md copied");

    // create src folder
    const srcOutputPath = path.join(packageOutputPath, "src");
    fs.mkdirSync(srcOutputPath, { recursive: true });
    console.log("src folder created");

    // create package/dist-preview/src/index.tsx
    const indexOutputPath = path.join(packageOutputPath, "src/index.tsx");
    const indexContent = `export { default as Preview } from './preview';
        `;
    await writeFile(indexOutputPath, indexContent);
    console.log("✅ index.tsx created");

    // copy package/Component/preview.tsx to package/dist-preview/src/preview.tsx
    const previewInputPath = path.join(packageComponentPath, "preview.tsx");
    const previewOutputPath = path.join(packageOutputPath, "src/preview.tsx");

    fs.copyFileSync(previewInputPath, previewOutputPath);
    console.log("✅ preview.tsx copied");

    // copy package/Component/style.module.css to package/dist-preview/src/style.module.css
    const styleInputPath = path.join(packageComponentPath, "style.module.css");
    const styleOutputPath = path.join(
      packageOutputPath,
      "src/style.module.css"
    );
    fs.copyFileSync(styleInputPath, styleOutputPath);
    console.log("✅ style.module.css copied");

    // run npm install in there
    console.log("Running npm install in dist-preview folder...");
    execSync(`npm install`, { cwd: packageOutputPath });
    console.log("✅ npm install completed");
    // run npm run build in there
    console.log("Running npm run build in dist-preview folder...");
    await exec(`npm run build`, { cwd: packageOutputPath });
    console.log("✅ npm run build completed");

    console.log("Done! 🏁🏁");
  } catch (error) {
    console.error("Error during pre-publish script:", error);
    process.exit(1);
  }
})();

# iClasser Lottie Block

This component is used to run .lottie files

## Installation

Run `npm i @iclasser-react/lottie-block`

# Usage

```JSX
import react from 'react';
import LottieBlock from '@iclasser-react/lottie-block'
const structureComponent = {
    props: {
      url: "",
      loop: false,
    },
  }
const contents = {
  }
const codingContents = [];
const compOptions = {
    componentIndex: 0,
    textData: ()=> {
        getText: (key)=> {
            return contents[key]
        }
    },
    codingContents,
    structureComponent,
}
function Example(){
    return <LottieBlock {...compOptions} >
}
```

# Requirements

Make sure `typescript`, `tailwindcss` is installed in your app.

# Cross platform available

- React.js -- Yes, Public
- React Native - Yes, but used internally within iClasser App

# Screenshots or video

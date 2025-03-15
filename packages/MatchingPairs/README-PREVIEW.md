# iClasser Matching Pairs

This component is used for matching pair experience.

## Installation

Run `npm i @iclasser-react/matching-pairs`

# Usage

```JSX
import react from 'react';
import MatchingPairs from '@iclasser-react/matching-pairs'
const structureComponent = {
    props: {
      pairs: [
        {
          id: "1",
          left: {
            text: 'left_pair_1',
            image: UPLOAD_URL1,
          },
          right: {
            text: 'right_pair_1',
          },
        }
      ],
      shuffleRight: true,
      shuffleLeft: true,
    },
}
const contents = {
    'left_pair_1': "Verbal Evaluation",
    'right_pair_1':
      "Your speech evaluator will deliver a verbal evaluation before the club meeting is finished. The verbal evaluation is in front of the club. ",
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
    return <MatchingPairs {...compOptions} >
}
```

# Requirements

Make sure `typescript`, `tailwindcss` is installed in your app.

# Cross platform available

- React.js -- Yes, Public
- React Native - Yes, but used internally within iClasser App

# Screenshots or video

# Chaino 🔗
Library to create chainable functions.

![](https://api.travis-ci.org/adityavm/chaino.svg?branch=master)

## Installation
```shell
npm install chaino --save-dev # npm
yarn add chaino --save-dev # yarn
```

## Usage
Define your library as chainable list of functions by providing the keys.

*NOTE: Passing non-function keys is fine, but trying to call them will just return the property name.*

```javascript
// chainable-lib.js
const chaino = require("chaino");

const keys = {
  red: (str, chain) => `${chain.join(",")} red(${str})`,
  blue: (str, chain) => `${chain.join(",")} blue(${str})`,
  yellow: (str, chain) => `${chain.join(",")} yellow(${str})`,
}

module.exports = chaino(keys);
```

Then your library can be used as:

```javascript
// index.js
const library = require("chainable-lib");

library.red("abc"); // red(abc)
library.red.blue("abc") // red blue(abc)
library.blue.yellow.red("abc") // blue,yellow red(abc)
```

More examples available [here](/examples).
Initial motivation [here](/motivation.md).

# License
MIT

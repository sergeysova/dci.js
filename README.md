# Readme

Data Context Interaction

https://en.wikipedia.org/wiki/Data,_context_and_interaction
https://habrahabr.ru/post/151169/


## Development

Now package in development.

:star: Please star it and come back later

## Installation

```bash
npm install --save dci.js
```

## Usage

> Use with node >= 4

```js
const { context } = require('dci.js');

class Actor {
  foo(data) {
    // this == user1
    this.bar(data);
  }
}

class Actor2 {
  zee(data) {
    // this == user2
    this.gii(data + "a");
  }
}

class ExampleContextClass {
  doFeature(data) {
    const res1 = this.theActor1.foo(data.a);
    const res2 = this.theActor2.zee(data.b);

    return res1 && res2;
  }
}

var ExampleContext = module.exports = context(['theActor1', 'theActor2'], Actor, Actor2)(ExampleContextClass);

// In another file. Ex. controller

class ExampleController {
  action(req, res) {
    const user1 = User.find(1);
    const user2 = User.find(2);

    const result = ExampleContext.create(user1, user2)
      .doFeature({ a: req.body.first, b: req.body.second });

    res.json({
      success: result,
    });
  }
}
```

### Babel

For babel or another transpiler you can use decorators.
For babel: `babel-plugin-syntax-decorators` and `babel-plugin-transform-decorators-legacy`


```js
import { context } from 'dci.js';

class Actor {
  foo(data) {
    this.bar(data);
  }
}

class Actor2 {
  zee(data) {
    this.gii(data + "a");
  }
}

@context(['theActor1', 'theActor2'], Actor, Actor2)
export default class ExampleContext {
  doFeature(data) {
    const res1 = this.theActor1.foo(data.a);
    const res2 = this.theActor2.zee(data.b);

    return res1 && res2;
  }
}
```

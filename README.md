parser.js
=========

[![Test](https://github.com/OpenReasoning/parser.js/workflows/Test/badge.svg?branch=master&event=push)](https://github.com/OpenReasoning/parser.js/actions?query=workflow%3ATest+branch%3Amaster+event%3Apush)
[![codecov](https://codecov.io/gh/OpenReasoning/parser.js/branch/master/graph/badge.svg)](https://codecov.io/gh/OpenReasoning/parser.js)
[![NPM Version](https://img.shields.io/npm/v/@openreasoning/parser.svg)](https://npmjs.com/package/@openreasoning/parser)

A parser to be used in logic programs.

This parses formulas within three styles (prefix, infix, and functional) returning
a tree structure of the captured elements.

Installation
------------
```bash
npm install @openreasoning/parser
```

Usage
-----
```typescript
import {prefixParser, infixParser, functionalParser, Node} from '@openreasoning/parser'

let parsed = prefixParser('(and a b)');
let parsed2 = infixParser('(a and b)');
let parsed3 = functionalParser('and(a, b)');

function isEqual(a: Node, b: Node): bool {
    if (a.value !== b.value || a.children.length !== b.children.length) {
        return false;
    }
    for (let i = 0; i < a.children.length; i++) {
        if (!isEqual(a.children[i], b.children[i])) {
            return false;
        }
    }
    return true;
}

console.log(isEqual(parsed, parsed2)); // true
console.log(isEqual(parsed2, parsed3)); // true
```

License
-------

This is uses the [MIT License](./LICENSE.md)

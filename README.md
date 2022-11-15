# littoral-templates

A small JavaScript/TypeScript framework to do templating comfortably using the [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) syntax in either JavaScript or TypeScript.
It doesn't come with its own syntax, like frameworks like [mustache](https://mustache.github.io/), and [handlebars](https://handlebarsjs.com/) do.

The repository's name is a play on "temporal literals" and "littoral", begin phonetically close to "literal".
The latter word indicates the part of a body of water (lake, sea, or ocean) that's closest to shore, usually shallow, and possibly not always entirely submerged.
The name tries to convey that implementing templates with this framework doesn't require you to "wade too far into the water".

Instead, templates look as follows:

```typescript
import { asString, indentWith } from "littoral-templates"

const indent = indentWith("    ")

console.log(
    asString([
        `top-level`,
        [ `still top-level, but on a new line` ],
        indent(1)([
            `this is indented (1 level)`,
            indent(2)([
                `this is much more indented (3 levels)`
            ])
        ])
    ])
)

```

(The contents of the code above can be found in [`src/test/test-in-README.ts`](./src/test/test-in-README.ts) as well.)
This code produces the following text on the JavaScript console:

```
top-level
still top-level, but on a new line
    this is indented (1 level)
            this is even more indented (3 levels)
```


## TODOs

* Publish to NPM (including proper cleaning and ignoring).
* Proper test set up, e.g. using `mocha` and `chai`.
* Skip `undefined | null`s.
* Does an alternative to `npm-run-all` exist (that's better)?


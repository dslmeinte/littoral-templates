# littoral-templates

A small JavaScript/TypeScript framework to do templating comfortably using the [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) syntax in either JavaScript or TypeScript.
It doesn't come with its own syntax, like frameworks like [mustache](https://mustache.github.io/), and [handlebars](https://handlebarsjs.com/) do.

Instead, templates look as follows:

```typescript
[
    `top-level`,
    [ `still top-level, but on a new line` ],
    indent(1)([
        `this is indented (1 level)`,
        indent(2)([
            `this is much more indented (3 levels)`
        ])
    ])
]
```

Instances of the `Template` type are arrays of strings nested to an arbitrary depth/level.
(Depth 0 corresponds to a single string).
To convert this to a proper string, use the `asString` function, as follows:

```typescript
import {asString, indentWith} from "littoral-templates"

const indent = indentWith("    ")

console.log(
    asString(<the template from the listing above>)
)
```

This code produces the following text on the JavaScript console:

```
top-level
still top-level, but on a new line
    this is indented (1 level)
            this is even more indented (3 levels)
```


### Iterating over collections

A common activity in templates is to iterate over a collection and map each item to text.
These sub-texts would then have to be joined together, and taking care of correct indentation is then usually quite a hassle.
Using the `Template` type, you can simply use the `Array.map` function, as follows:

```typescript
import {asString, indentWith} from "littoral-templates"

const indent = indentWith("    ")

console.log(
    asString([
        `my items:`,
        indent(1)(
            ["foo", "bar"].map((item, index) => `item ${index + 1}: "${item}"`)
        )
    ])
)
```

This code produces the following text on the JavaScript console:

```
my items:
    item 1: foo
    item 2: bar
```


### Including content conditionally

Another common activity in templates is to include some content conditionally.
This package provides the convenient `when` function for that.
An example of its usage is as follows:

```typescript
[
    `foo`,
    `bar`,
    when(n === 3)([
        `lizard`,
        `sfdeljknesv`
    ])
]
```

After applying the `asString`, and assuming the variable `n` holds the value `3`, this evaluates to:

```
foo
bar
lizard
sfdeljknesv
```

In case the argument to the function call after `when(<some boolean condition>)` has side effects, you want to turn that into a thunk, as follows:

```typescript
let touched = 0
const template = [
    `foo`,
    `bar`,
    when(n === 3)(() => [
        `${++touched}lizard`,
        `sfdeljknesv`
    ])
]
```

Using side effects inside a template can be useful to store information that's needed elsewhere in the text-to-generate.
An example of that would be to keep track of imports that have to appear before their usage.


### Other convenience functions

Other convenience functions are:

* `withNewlineAppended`: Wrap this around a template function (see definition below) to produce a template function that adds a newline after any item fed to the original template function.

    A _template function_ is any function that produces an instance of `Template`.

    An example of the usage of `withNewlineAppended` is

    ```typescript
    [1, 2, 3].map(withNewlineAppended((num) => `${num}`))
    ```

    which should produce the following text:

    ```
    1
    
    2
    
    3
    
    ```

* `commaSeparated`: Given a list of strings, this function adds a comma after every string, except for the last one.

    E.g., `commaSeparated(["1", "2", "3"])` becomes `["1,", "2,", "3"]`.
    This is useful e.g. for rendering “pretty” import statements.

    _Note_ that this only works on a list of strings, not an any instance of `Template`.


### Package name

The repository's name is a play on "temporal literals" and "littoral", begin phonetically close to "literal".
The latter word indicates the part of a body of water (lake, sea, or ocean) that's closest to shore, usually shallow, and possibly not always entirely submerged.
The name tries to convey that implementing templates with this framework doesn't require you to "wade too far into the water".


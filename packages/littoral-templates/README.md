# littoral-templates

A small JavaScript/TypeScript framework to do light-weight templating – e.g. for doing code generation – comfortably using the [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) syntax in either JavaScript or TypeScript.


## Quickstart

`littoral-templates` doesn’t come with its own syntax, like frameworks like [mustache](https://mustache.github.io/), and [handlebars](https://handlebarsjs.com/) do.
Instead, templates are written as ordinary JavaScript/TypeScript code.
They look as follows:

```javascript
[
    `top-level`,
    [ `still top-level, but on a new line` ],
    indent(1)([
        `this is indented (1 level)`,
        indent(2)(() => [
            `this is much more indented (3 levels)`
        ])
    ])
]
```

Templates – i.e.: instances of the `Template` type – are either strings, no-args functions returning a template, or arrays of templates.
This is a circular definition, so you can have nesting to an arbitrary depth/level.

To convert a template back to a proper string, use the **`asString`** function, as follows:

```typescript
import {asString, commonIndentations, indentWith} from "littoral-templates"

const indent = indentWith(commonIndentations["2 spaces"])

console.log(
    asString(<the template from the listing above>)
)
```

The `indent` function is a function that takes one argument: the indentation level — let’s call that _n_.
It then returns a *template function* that takes a template as its argument, and returns a template that is indented to indentation level _n_, using 2 spaces for each indentation.
(A _template function_ is any function that produces an instance of `Template`.)
Defining the `indent` function uses the `indentWith` function.

This code produces the following text on the JavaScript console:

```javascript
top-level
still top-level, but on a new line
  this is indented (1 level)
      this is even more indented (3 levels)
```

This makes for a convenient way to generate code with correct indentation levels.

Be sure to check out the [cookbook](#cookbook) below to learn how to use `littoral-templates` for common templating tasks conveniently.
Read the [fundamentals](#fundamentals) below to learn more about the concepts underlying this package.


## Cookbook

### Iterating over collections

A common activity in code generation is to iterate over a collection and map each item to text.
These sub-texts would then have to be joined together, and taking care of correct indentation is then usually quite a hassle.
Using the `Template` type, you can simply use the `Array.map` function, as follows:

```typescript
import {asString, indentWith} from "littoral-templates"

const indent = indentWith(commonIndentations["2 spaces"])

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

Using side effects inside a template can be useful to store information that’s needed elsewhere in the text-to-generate.
An example of that would be to keep track of imports that have to appear before their usage.


### Other convenience functions

Other convenience functions are:

* `withEmptyLineAppended`: Wrap this around a template function to produce a template function that adds an empty line after any item fed to the original template function.

    An example of the usage of `withEmptyLineAppended` is

    ```typescript
    [1, 2, 3].map(withEmptyLineAppended((num) => `${num}`))
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


### EOLs

EOLs – AKA “newlines” or “line endings” – vary between OS’s: Windows uses `crlf` EOL style – `\r\n` –, while essentially all other mainstream OS’s use `lf` style – `\n`.
Not taking that into account can cause content being generated differently across OS’s, potentially confusing tools like Git — especially if these are not configured correctly.
Since generated content is often large, this causes additional confusion and friction in the software development process.

To prevent such issues, you can set the EOL style by calling the `setEOLStyleFromOS` function (which resides in the separate `littoral-templates-node` package) before any calls to `asString`.
The default value for the EOL style is `lf` – meaning `\n`.
I’ll use the notation `<eol>` for the currently-set EOL value throughout the rest of the documentation.


## Fundamentals

Templates are in essence *line-oriented*: each single-line string (containing no EOL of any style) inside a template – no matter how deeply nested it occurs – corresponds to one line after calling `asString`.
In code, all the following expressions result in a value of `"foo<eol>"` when calling `asString` with them:

```javascript
"foo"
["foo"]
[["foo"]]
() => ["foo"]
[() => ["foo"]]
```

A multi-line string inside a template is split on EOL of any style, retaining the exact number of lines that it originally had.
So:

```javascript
asString([`foo
`])
```

evaluates to `"foo<eol><eol>"`.
Because of this, it’s usually not a good idea to have multi-line strings ending with EOLs of their own in your template code.
Moreover, because multi-line strings break indentation, they’re probably not great to have anyway.

Splitting is done on *EOLs of any style*, so this *effectively normalizes* EOLs, meaning that even if multi-line strings use different EOL, `asString` will only use the set EOL style.

Templates **compose** nicely, and predictably, e.g.:

```javascript
asString([t1, t2]) === `${asString(t1)}${asString(t2)}`
```

The expression `asString([])` evaluates to the empty string, which both satisfies the property above, and is useful as a “nil” template that doesn’t result in a new/empty line in the output.


## Package name

The repository’s name is a play on “temporal literals” and “littoral”, begin phonetically close to “literal”.
The latter word indicates the part of a body of water (lake, sea, or ocean) that’s closest to shore, usually shallow, and possibly not always entirely submerged.
The name tries to convey that implementing templates with this framework doesn’t require you to “wade too far into the water”.


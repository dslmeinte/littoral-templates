# TODOs

* *Write more unit tests!*
* Skip `undefined | null`s automatically (adding these values to the `Template` type)?
* [&#10003;] Can we modify `indentWith` so that it also takes a variadic 2nd (Curried) argument?
* [&#10003;] Is it possible to extend `Template` type to include thunks (or functions taking some context) that return a `Template` as well?
* Write a blog article / booklet about all this.
* Would it make sense to a monadic members such as `When`, or `IfThenElse` classes, etc.?
    We can defer expanding those until `asString` type, and then also chain them — e.g. `when(...).then(...).else(...)`
    API could be: `when(<condition>).then(<then-template>).otherwise(<else-template>)` with `when(<condition>)(<then-template>)` as a legacy alternative.
* Implement a function to manipulate the first line of a template, e.g. adding a prefix to it.


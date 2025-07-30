# CHANGELOG

## 0.5.0 [not yet released]

* Separated out `setEOLStyleFromOS` to a separate package `littoral-templates-node`.
* Expose the `setEOLExplicitly` function.


## 0.4.2

* Synchronous style of `setEOLStyleFromOS` caused problems with web bundlers — in particular: Vite’s.
  That function is now asynchronous again, so should typically be `await`ed.
  It also should give warnings on the console when `setEOLStyleFromOS` is called when running in a browser.


## 0.4.1

* The `setEOLStyleFromOS` is now synchronous.
  This might cause warnings in existing code, but makes the function easier to work with.


## 0.4.0

* Thunks returning a `Template` are now `Template`s as well.
* The 3rd (Curried) argument of `indentWith`, and the 2nd (Curried) argument of `when` are now variadic.
* The EOL style can be taken from the OS, using the asynchronous `setEOLStyleFromOS` function.
  The `asString` function now returns a string that uses that EOL style *exclusively*.
  Multi-line strings inside a template are therefore now split on `/\r*\n/` rather than just `/\n/`, so that `asString` effectively normalizes EOL style.
* The `withNewlineAppended` function has been renamed to `withEmptyLineAppended`.
  (The former is kept as a legacy alias.)
* An object constant `commonIndentations` is added and exposed which holds the most common indentation styles: “2 spaces”, “4 spaces”, and “1 tab”.
* Significant updates to the [README](./README.md)!

*Note*: `asString` now behaves more consistently on EOLs, meaning that existing templates might behave differently, particularly when using multi-line strings (nested) inside templates.
(Also see the updated [README](./README.md).)
Specifically: it’s no longer necessary – or even useful/desirable – to have multi-line strings ending in a bare EOL in your template code, because you shouldn't expect the following to evaluate to `"foo\n"`:

```javascript
asString([`foo
`])
```


## 0.3.0

* Turn the package into an ESM module (back again).
  (Should work with Deno in the meanwhile.)
* Update dependencies: no impact on shipped code.
* Add functions: `when`, `withEmptyLineAppended`, and `commaSeparated`.
* Rename `NestedString` to `Template`, leaving `NestedString` as a legacy alias, which might be deprecated and removed in the future.
* Add {T|J}SDoc.


## 0.2.2

* Fix internal `flatten` function for empty arrays.
  + Use “fat arrow” syntax everywhere.
* Improve unit testing setup using Mocha + Chai.
  (No impact on shipped code.)


## 0.2.1

* Declare as a CommonJS module again.
  (Making it an ES module turns out to not make it work with Deno after all.)


## 0.2.0

* Fix NPM-ignoring.
* Commit shrinkwrapping.
* Update deps.
* Declare as ES module to make it work with Deno.
* (general upkeep)


# CHANGELOG

## 0.4.0

* Thunks returning a `Template` are now `Template`s as well.
* The 3rd (Curried) argument of `indentWith`, and the 2nd (Curried) argument of `when` are now variadic.


## 0.3.0

* Turn the package into an ESM module (back again).
  (Should work with Deno in the meanwhile.)
* Update dependencies: no impact on shipped code.
* Add functions: `when`, `withNewlineAppended`, and `commaSeparated`.
* Rename `NestedString` to `Template`, leaving `NestedString` as an alias.
  This is  not a breaking change, but I might deprecate and remove `NestedString` in the future.
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


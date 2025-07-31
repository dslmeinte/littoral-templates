export * from "./eol.js"
export * from "./functions.js"
export * from "./indents.js"
export * from "./primitives.js"
export * from "./strings.js"
export * from "./types.js"

/**
 * To avoid problems with circular dependencies between JavaScript – i.e.: transpiled TypeScript – files,
 * members in any .ts file *must* be imported through this index-internal.ts, e.g.:
 *
 * `import {asString} from "./index-internal.js"`
 *
 * (Mind the .js extension!)
 */


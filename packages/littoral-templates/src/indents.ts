/**
 * Indentation-related constants and functions.
 */

import {flattened, repeat, Template} from "./index-internal.js"

/**
 * @returns a function to instantiate a function to indent a sub-template.
 * The function always returns an array of strings.
 *
 * Its usage looks as follows:
 * <pre>
 * indentWith("  ")(2)([
 *     `this is indented 2 levels`
 * ])
 * </pre>
 * Note that the third Curried argument is variadic, so the array brackets (`[]`) can be elided.
 *
 * Usually, one sets up the following function constant before:
 * <pre>
 * const indent = indentWith("  ")
 * </pre>
 */
export const indentWith = (singleIndentation: string) =>
    (indentLevel: number = 1) => {
        const prefix = repeat(singleIndentation, indentLevel)
        const indenter = (line: string) => line.length > 0 ? (prefix + line) : line
        return (...templates: Template[]) =>
            flattened(templates).map(indenter)    // Note: Template[] has type Template as well!
    }

/**
 * An enumeration of common indentation styles.
 * Use these in a type-safe way as follows, e.g. for “1 tab”:
 *
 * ```
 * const indent = indentWith(commonIndentations["1 tab"])
 *
 * indent([`foo`])
 * ```
 */
export const commonIndentations = {
    "2 spaces": "  ",
    "4 spaces": "    ",
    "1 tab": "\t"
} as const


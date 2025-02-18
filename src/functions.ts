import {repeat, Template} from "./index.js"
import {withNewlineEnsured} from "./internals.js"


/**
 * “Flattens” the given template to an array of strings, each of which represent exactly one line.
 */
const flatten = (template: Template): string[] => {
    if (typeof template === "function") {
        return flatten(template())
    }
    if (Array.isArray(template)) {
        return template.map(flatten).reduce((arrL, arrR) => [...arrL, ...arrR], [])
    }
    return template.split("\n")
}


/**
 * @returns {string} - the given template joined as one string, taking care of proper newline endings.
 */
export const asString = (template: Template): string =>
    flatten(template).map(withNewlineEnsured).join("")


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
            flatten(templates).map(indenter)    // Note: Template[] has type Template as well!
    }


/**
 * Allows for the following syntax:
 * <pre>
 * [
 *     when(<some boolean condition>)(
 *      <stuff to include when boolean condition is true>
 *     )
 * ]
 * </pre>
 *
 * and
 *
 * <pre>
 * [
 *     when(<some boolean condition>)(
 *      () => <stuff to include when boolean condition is true>
 *     )
 * ]
 * </pre>
 *
 * In the latter case, it's guaranteed that the thunk ({@see https://en.wikipedia.org/wiki/Thunk})
 * is only evaluated (/run) when the boolean condition is true.
 * That is useful in case the stuff to include produces side effects.
 *
 * Note that the second Curried argument is variadic, so it doesn't require array brackets (`[]`).
 */
export const when = (bool: boolean): ((...whenResults: Template[]) => Template) =>
    bool
        ? (...whenResults: Template[]) => flatten(whenResults)  // (need to be explicit here, or it doesn't work – despite having specified the return type...)
        : (_) => []


/**
 * @return a function that composes the given template function with the action of "adding a newline after".
 */
export const withNewlineAppended = <T>(templateFunc: (t: T) => Template) =>
    (t: T) => [templateFunc(t), ``]


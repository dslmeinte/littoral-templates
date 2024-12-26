import {Template} from "./types.js"
import {lineIndenter, repeat, withNewlineEnsured} from "./string-utils.js"


/**
 * Polyfill/shim for ES2019's Array.prototype.flat(..).
 */
const flatten = (template: Template): string[] => {
    if (typeof template === "function") {
        return flatten(template())
    }
    if (Array.isArray(template)) {
        return template.map(flatten).reduce((arrL, arrR) => [...arrL, ...arrR], [])
    }
    return [template]
    // TODO  undefined|null -> []; split single string on newlines (already here)?
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
            flatten(templates).map(indenter)
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
 */
export const when = (bool: boolean): ((whenResult: Template) => Template) =>
    bool
        ? (whenResult) =>
            typeof whenResult === "function"
                ? whenResult()
                : whenResult
                    // TODO  use flatten instead?
        : (_) => []


/**
 * @return a function that composes the given template function with the action of "adding a newline after".
 */
export const withNewlineAppended = <T>(templateFunc: (t: T) => Template) =>
    (t: T) => [templateFunc(t), ``]


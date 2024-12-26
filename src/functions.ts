import {Template} from "./types.js"
import {repeat, withNewlineEnsured} from "./string-utils.js"


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
}

/**
 * @returns {function(*=): *} - a function that maps over a single string using mapString, or an array of strings using mapStrings.
 * If an array is given, that array is completely (i.e.: recursively) flattened first, before the mapStrings function is applied.
 * (This function is only used internally.)
 */
const mapTemplate = <T>(mapString: (_: string) => T, mapStrings: (_: string[]) => T) =>
    (template: Template) => {
        if (typeof template === "function") {
            return mapStrings(flatten(template))
        }
        if (Array.isArray(template)) {
            return mapStrings(flatten(template))
        }
        return mapString(template)
    }


/**
 * @returns {string} - the given template joined as one string, taking care of proper newline endings.
 */
export const asString = mapTemplate(withNewlineEnsured, (strings) => strings.map(withNewlineEnsured).join(""))


/**
 * @returns {function} - a function to instantiate a function to indent a sub-template.
 * The function always returns an array of strings.
 *
 * Its usage looks as follows:
 * <pre>
 * indentWith("  ")(2)([
 *     `this is indented 2 levels`
 * ])
 * </pre>
 *
 * Usually, one sets up the following function constant before:
 * <pre>
 * const indent = indentWith("  ")
 * </pre>
 */
export const indentWith = (singleIndentation: string) =>
    (indentLevel: number = 1): (_: Template) => string[] => {
        const indentationPrefix = repeat(singleIndentation, indentLevel)
        const indentLine = (str: string): string => str.split("\n").map((line) => (line.length > 0 ? indentationPrefix : "") + line).join("\n")
        return mapTemplate((string: string): string[] => [indentLine(string)], (strings: string[]) => strings.map(indentLine))
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
export const when = (bool: boolean)=>
    bool
        ? (whenResult: Template) =>
            typeof whenResult === "function"
                ? whenResult()
                : whenResult
        : (_whenResult: Template) => []


/**
 * @return a function that composes the given template function with the action of "adding a newline after".
 */
export const withNewlineAppended = <T>(templateFunc: (t: T) => Template) =>
    (t: T) => [templateFunc(t), ``]


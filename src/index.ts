/**
 * A type definition for “templates” that consist of array of strings nested to an arbitrary depth.
 * (Depth 0 corresponds to just a single string.)
 *
 * @since version 0.3.0
 */
export type Template = string | Array<Template>

/**
 * An alias for the {@link Template} type definition.
 * Note: this type might be deprecated and removed (per a major version) in the future.
 */
export type NestedString = Template


type TemplateFunction<T> = (_: Template) => T


/**
 * Polyfill/shim for ES2019's Array.prototype.flat(..).
 */
const flatten = (template: Template): string[] =>
    Array.isArray(template)
        ? template.map(flatten).reduce((arrL, arrR) => [ ...arrL, ...arrR ], [])
        : [ template ]


/**
 * @returns {function(*=): *} - a function that maps over a single string using mapString, or an array of strings using mapStrings.
 * If an array is given, that array is completely (i.e.: recursively) flattened first, before the mapStrings function is applied.
 * (This function is only used internally.)
 */
const mapNestedString = <T>(mapString: (_: string) => T, mapStrings: (_: string[]) => T) =>
    (template: Template) =>
        Array.isArray(template)
            ? mapStrings(flatten(template))
            : mapString(template)


const withNewlineEnsured = (str: string): string =>
    str.charAt(str.length - 1) === '\n'
        ? str
        : ( str + "\n")

/**
 * @returns {string} - the given template joined as one string, taking care of proper newline endings.
 */
export const asString = mapNestedString(withNewlineEnsured, (strings) => strings.map(withNewlineEnsured).join(""))


/**
 * Polyfill/shim for ES2015's String.prototype.repeat which doesn't work for some reason in the test...
 */
const repeat = (str: string, n: number): string => {
    let result = ""
    while (n > 0) {
        if (n % 2 === 1) {
            result += str
        }
        if (n > 1) {
            str += str
        }
        n >>= 1
    }
    return result
}

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
    (indentLevel: number = 1): TemplateFunction<string[]> => {
        const indentationPrefix = repeat(singleIndentation, indentLevel)
        const indentLine = (str: string): string => str.split("\n").map((line) => (line.length > 0 ? indentationPrefix : "") + line).join("\n")
        return mapNestedString((string: string): string[] => [indentLine(string)], (strings: string[]) => strings.map(indentLine))
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
        ? (whenResult: (() => Template) | Template) =>
            typeof whenResult === "function"
                ? whenResult()
                : whenResult
        : (_whenResult: (() => Template) | Template) => []


/**
 * @return a function that composes the given template function with the action of "adding a newline after".
 */
export const withNewlineAppended = <T>(templateFunc: (t: T) => Template) =>
    (t: T) => [templateFunc(t), ``]


/**
 * @return the given array of strings but with commas added after each string except the last one.
 */
export const commaSeparated = (strings: string[])=>
    strings.map((str, index) => `${str}${index + 1 < strings.length ? `,` : ``}`)


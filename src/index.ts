export type NestedString = string | Array<NestedString>

type NestedStringFunction<T> = (_: NestedString) => T


/**
 * Polyfill/shim for ES2019's Array.prototype.flat(..).
 */
function flatten(nestedString: NestedString): string[] {
    return Array.isArray(nestedString)
        ? nestedString.map(flatten).reduce((arrL, arrR) => [ ...arrL, ...arrR ])
        : [ nestedString ]
}


/**
 * @returns {function(*=): *} - a function that maps over a single string using mapString, or an array of strings using mapStrings.
 * If an array is given, that array is completely (i.e.: recursively) flattened first, before the mapStrings function is applied.
 */
function mapNestedString<T>(mapString: (_: string) => T, mapStrings: (_: string[]) => T) {
    return (nestedString: NestedString) =>
        Array.isArray(nestedString)
            ? mapStrings(flatten(nestedString))
            : mapString(nestedString)
}


const withNewlineEnsured = (str: string): string => str.charAt(str.length - 1) === '\n' ? str : ( str + "\n")
/**
 * @returns {string} - the given nested string joined as one string, taking care of proper newline endings.
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
 * @returns {function} - a function to instantiate a function to indent a nested string.
 * The function always returns strings.
 */
export const indentWith = (singleIndentation: string) => (indentLevel: number = 1): NestedStringFunction<string[]> => {
    const indentationPrefix = repeat(singleIndentation, indentLevel)
    const indentLine = (str: string): string => str.split("\n").map((line) => (line.length > 0 ? indentationPrefix : "") + line).join("\n")
    return mapNestedString((string: string): string[] => [indentLine(string)], (strings: string[]) => strings.map(indentLine))
}


/**
 * @return the given array of strings but with commas added after each string except the last one.
 */
export const commaSeparated = (strings: string[])=>
    strings.map((str, index) => `${str}${index + 1 < strings.length ? `,` : ``}`)

/**
 * Polyfill/shim for ES2015's String.prototype.repeat which doesn't work for some reason in the test...
 */
export const repeat = (str: string, n: number): string => {
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
 * Ensures that the given string ends with a newline (`\n`), adding one if necessary.
 */
export const withNewlineEnsured = (str: string): string =>
    str.charAt(str.length - 1) === '\n'
        ? str
        : ( str + "\n")

/**
 * Returns a function that indents all lines in the given string with the given prefix.
 */
export const lineIndenter = (prefix: string) =>
    (str: string) =>
        str
            .split("\n")
            .map((line) => (line.length > 0 ? prefix : "") + line)
            .join("\n")
// TODO  could also return string[] instead


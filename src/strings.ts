/**
 * Purely string-related functions.
 */

/**
 * @return the given array of strings but with commas added after each string except the last one.
 */
export const commaSeparated = (strings: string[])=>
    strings.map((str, index) => `${str}${index + 1 < strings.length ? `,` : ``}`)

/**
 * Polyfill/shim for ES2015's String.prototype.repeat which doesn't work for some reason in the test...
 * (Implementation uses the binary representation of n.)
 * Note: doesn't need to be exposed.
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


// TODO  more common string utils, e.g. withFirst{Upper|Lower}, etc.


/*
 * Note: don't export internals from {@see index.ts}!
 */


export const eolStyles = {
    lf: "\n",
    crlf: "\r\n"
} as const

/**
 * The value of the EOL string: typically, either "\n" (=LF-style, compatible with POSIX/Linux/macOS), or "\r\n" (=CRLF-style, compatible with Windows).
 */
export let eol: string = eolStyles.lf


/**
 * Sets the EOL to the OS-dependent value.
 */
export const setEOLFromOS = async (): Promise<void> =>
    import("os").then((os) => {
        eol = os.EOL
    })


/**
 * Sets the EOL explicitly to the given value.
 * (This is especially useful for testing.)
 */
export const setEOLExplicitly = (newEol: string) => {
    eol = newEol
}


const normalizeRegex = new RegExp(/\r*\n?$/)

/**
 * Ensures that the given string ends with an EOL, adding one if necessary.
 */
export const withEOLEnsured = (str: string): string => {
    const match = str.match(normalizeRegex)
    return match === null
        ? str   // (should not happen, but OK...)
        : (str.substring(0, match.index) + eol)
}


const splitRegex = new RegExp(/\r*\n/)

export const splitOnEOL = (str: string): string[] =>
    str.split(splitRegex)


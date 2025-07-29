/**
 * EOL-related constants and functions.
 */

/**
 * Common EOL styles.
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
export const setEOLStyleFromOS = async () => {
    const printWarningOnConsole = () => {
        console.error(`The "os" package was not available for import, so couldn't set EOL from OS — previous value is kept. Are you executing this in the browser, by any chance?`)
    }
    await import("os")
        .then((osPackage) => {
            if (osPackage) {
                eol = osPackage.EOL
            } else {
                printWarningOnConsole()
            }
        })
        .catch((reason) => {
            if (reason instanceof TypeError && reason.message.indexOf("'os'") > -1) {
                printWarningOnConsole()
            } else {
                console.error(`Couldn't set EOL from OS after trying to import "os" package dynamically. Reason:`)
                console.dir(reason)
            }
        })
}


/**
 * Sets the EOL explicitly to the given value.
 * (This is especially useful for testing.)
 */
export const setEOLExplicitly = (newEol: string) => {
    eol = newEol
}


const splitRegex = new RegExp(/\r*\n/)

/**
 * Splits the given string on EOLs (of any style) into an array of strings,
 * each corresponding to one line.
 */
export const splitOnEOL = (str: string): string[] =>
    str.split(splitRegex)


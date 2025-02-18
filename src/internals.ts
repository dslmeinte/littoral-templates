/*
 * Note: don't export internals from {@see index.ts}!
 */


/**
 * Ensures that the given string ends with an EOL, adding one if necessary.
 */
export const withNewlineEnsured = (str: string): string =>
    str.charAt(str.length - 1) === "\n"
        ? str
        : (str + "\n")


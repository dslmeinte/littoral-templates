/**
 * Primitive functions on the {@link Template} type.
 */

import {eol, Template} from "./index-internal.js"

const eolRegex = new RegExp(/\r*\n/)

/**
 * “Flattens” the given template to an array of strings, each of which represent exactly one line.
 * Note: doesn't need to be exposed.
 */
export const flattened = (template: Template): string[] => {
    if (typeof template === "function") {
        return flattened(template())
    }
    if (Array.isArray(template)) {
        return template.map(flattened).reduce((arrL, arrR) => [...arrL, ...arrR], [])
    }
    return template.split(eolRegex)
}


/**
 * @returns {string} - the given template joined as one string, taking care of proper EOLs.
 */
export const asString = (template: Template): string =>
    flattened(template).map((line) => line + eol).join("")


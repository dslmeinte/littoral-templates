import {setEOLExplicitly} from "littoral-templates"

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
                setEOLExplicitly(osPackage.EOL)
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


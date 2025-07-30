import {expect} from "chai"

import {setEOLStyleFromOS} from "littoral-templates"
// (the following features are not exposed by the package, but for internal use only:)
import {eol, eolStyles, setEOLExplicitly, splitOnEOL} from "littoral-templates/dist/index-internal.js"


describe("EOL setting", () => {

    it("has the default", () => {
        expect(eol).to.equal("\n")
    })

    it("lets itself be set randomly", () => {
        const randomEOL = "\t"
        setEOLExplicitly(randomEOL)
        expect(eol).to.equal(randomEOL)
    })

    it("lets itself be set from the OS", async function () {
        await setEOLStyleFromOS()
            .then(() => {
                expect(eol === eolStyles.lf || eol === eolStyles.crlf).to.be.true
            })
    })

})


describe("splitOnEOL", () => {

    it("works correctly", () => {
        expect(splitOnEOL("foo\nbar")).to.deep.equal(["foo", "bar"])
        expect(splitOnEOL("foo\n\nbar")).to.deep.equal(["foo", "", "bar"])
        expect(splitOnEOL("foo\nbar\n")).to.deep.equal(["foo", "bar", ""])
        expect(splitOnEOL("foo\nbar\r\n")).to.deep.equal(["foo", "bar", ""])
        expect(splitOnEOL("foo\nbar\r\r\n")).to.deep.equal(["foo", "bar", ""])
        expect(splitOnEOL("foo\r\nbar")).to.deep.equal(["foo", "bar"])
        expect(splitOnEOL("foo\r\r\nbar")).to.deep.equal(["foo", "bar"])
        expect(splitOnEOL("foo\r\r\nbar")).to.deep.equal(["foo", "bar"])
    })

})


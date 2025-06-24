import {expect} from "chai"

import {eol, eolStyles, setEOLExplicitly, setEOLFromOS, splitOnEOL, withEOLEnsured} from "../internals.js"


describe("EOL setting", () => {

    it("has the default", () => {
        expect(eol).to.equal("\n")
    })

    it("lets itself be set randomly", () => {
        const randomEOL = "\t"
        setEOLExplicitly(randomEOL)
        expect(eol).to.equal(randomEOL)
    })

    it("lets itself be set from the OS", async () => {
        setEOLFromOS()
            .then(() => {
                expect(eol === eolStyles.lf || eol === eolStyles.crlf).to.be.true
            })
    })

})


describe("withEOLEnsured", () => {

    it("adds an EOL", () => {
        setEOLExplicitly(eolStyles.lf)
        expect(withEOLEnsured("")).to.equal("\n")
        expect(withEOLEnsured("foo")).to.equal("foo\n")
        expect(withEOLEnsured("foo\n")).to.equal("foo\n")
        setEOLExplicitly(eolStyles.crlf)
        expect(withEOLEnsured("")).to.equal("\r\n")
        expect(withEOLEnsured("foo")).to.equal("foo\r\n")
    })

    it("normalizes EOL styles", () => {
        setEOLExplicitly(eolStyles.lf)
        expect(withEOLEnsured("foo\r")).to.equal("foo\n")
        expect(withEOLEnsured("foo\r\n")).to.equal("foo\n")
        expect(withEOLEnsured("foo\r\r")).to.equal("foo\n")
        expect(withEOLEnsured("foo\n\r")).to.equal("foo\n\n")   // (this one's a bit weak)
        expect(withEOLEnsured("foo\n\n")).to.equal("foo\n\n")
        setEOLExplicitly(eolStyles.crlf)
        expect(withEOLEnsured("foo\r")).to.equal("foo\r\n")
        expect(withEOLEnsured("foo\r\n")).to.equal("foo\r\n")
        expect(withEOLEnsured("foo\r\r")).to.equal("foo\r\n")
        expect(withEOLEnsured("foo\n\r")).to.equal("foo\n\r\n") // FIXME  is not really normalization
        expect(withEOLEnsured("foo\n\n")).to.equal("foo\n\r\n") // FIXME  is not really normalization
    })

})


describe("splitOnEOL", () => {

    it("works correctly", () => {
        expect(splitOnEOL("foo\nbar")).to.deep.equal(["foo", "bar"])
        expect(splitOnEOL("foo\n\nbar")).to.deep.equal(["foo", "", "bar"])
        expect(splitOnEOL("foo\nbar\n")).to.deep.equal(["foo", "bar", ""])  // TODO  or do we want ["foo", "bar"]?
        expect(splitOnEOL("foo\r\nbar")).to.deep.equal(["foo", "bar"])
        expect(splitOnEOL("foo\r\r\nbar")).to.deep.equal(["foo", "bar"])
        expect(splitOnEOL("foo\r\r\nbar")).to.deep.equal(["foo", "bar"])
    })

})


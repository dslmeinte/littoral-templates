import {expect} from "chai"

import {asString, Template} from "littoral-templates"


describe("asString", () => {

    it("works on empty strings", () => {
        expect(asString([])).to.equal(``)
    })

    it("works on templates of the form [<single-line string>]", () => {
        expect(asString(["foo"])).to.equal(`foo\n`)
    })

    it("works on templates of the form [<multi-line string>]", () => {
        expect(
            asString([`foo

bar`]))
            .to.equal(`foo\n\nbar\n`)
    })

})


describe("properties", () => {

    it("lines are lines", () => {
        expect(asString(["\n"])).to.equal("\n\n")
        expect(asString("\n")).to.equal("\n\n")
    })

    it("compositionality", () => {
        const assertComposes = (t1: Template, t2: Template) => {
            expect(asString([t1, t2])).to.equal(`${asString(t1)}${asString(t2)}`)
        }
        assertComposes("", "")
        assertComposes("foo", "bar")
        // TODO  add more asserts; or use property-based testing / “fuzzing” ?
    })
})


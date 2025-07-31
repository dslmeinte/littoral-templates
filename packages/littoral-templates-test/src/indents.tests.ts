import {expect} from "chai"

import {indentWith} from "littoral-templates"


describe("indentWith", () => {

    it("works for variadic arguments", () => {
        const indented = indentWith("@")(1)
        expect(
            indented("foo", indented("bar"))
        ).to.deep.equal(["@foo", "@@bar"])
    })

})


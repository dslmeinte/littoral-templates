import {expect} from "chai"

import {commaSeparated} from "../index-internal.js"


describe("commaSeparated", () => {

    it("works for lists of length 0", () => {
        expect(commaSeparated([])).to.deep.equal([])
    })

    it("works for lists of length 1", () => {
        expect(commaSeparated([`1`])).to.deep.equal([`1`])
    })

    it("works for lists of length 3", () => {
        expect(commaSeparated([`1`, `2`, `3`])).to.deep.equal([`1,`, `2,`, `3`])
    })

})


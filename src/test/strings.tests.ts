import {assert} from "chai"
const {deepEqual} = assert

import {commaSeparated} from "../index.js"


describe("commaSeparated", () => {

    it("works for lists of length 0", () => {
        deepEqual(
            commaSeparated([]),
            []
        )
    })

    it("works for lists of length 1", () => {
        deepEqual(
            commaSeparated([`1`]),
            [`1`]
        )
    })

    it("works for lists of length 3", () => {
        deepEqual(
            commaSeparated([`1`, `2`, `3`]),
            [`1,`, `2,`, `3`]
        )
    })

})


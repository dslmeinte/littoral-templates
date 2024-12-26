import {assert} from "chai"
const {deepEqual, equal} = assert

import {commaSeparated, lineIndenter} from "../string-utils.js"


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


describe("lineIndenter", () => {

    it("works for an empty string", () => {
        equal(
            lineIndenter("@")(""),
            ""
        )
    })

    it("works for an multi-line string with empty lines", () => {
        equal(
            lineIndenter("@")(`1

    2
`),
            `@1

@    2
`
        )
    })

})


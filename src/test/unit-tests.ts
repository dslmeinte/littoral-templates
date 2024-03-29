import { assert } from "chai"
const { equal } = assert

import { asString, indentWith } from "../index"


describe("example in README", () => {

    it("works", () => {
        const indent = indentWith("    ")     // with apologies to the spaces people...
        const actual = asString([
            `top-level`,
            [ `still top-level, but on a new line` ],
            indent(1)([
                `this is indented (1 level)`,
                indent(2)([
                    `this is even more indented (3 levels)`
                ])
            ])
        ])
        console.log(actual)
        equal(
            actual,
            `top-level
still top-level, but on a new line
    this is indented (1 level)
            this is even more indented (3 levels)
`
        )
    })

})


describe("asString", () => {

    it("works on empty strings", () => {
        equal(asString([]), ``)
    })

})


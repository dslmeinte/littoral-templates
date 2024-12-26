import {assert} from "chai"
const {equal} = assert

import {asString, indentWith} from "../functions.js"


describe("example in README", () => {

    it("works - correctly, even", () => {
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


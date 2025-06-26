import {expect} from "chai"

import {asString, commonIndentations, indentWith} from "../index-internal.js"


describe("example in README", () => {

    it("works correctly", () => {
        const indent = indentWith(commonIndentations["2 spaces"])     // with apologies to the tabs people...
        const actual = asString([
            `top-level`,
            [ `still top-level, but on a new line` ],
            indent(1)([
                `this is indented (1 level)`,
                indent(2)(() => [
                    `this is even more indented (3 levels)`
                ])
            ])
        ])
        console.log(actual)
        expect(actual).to.equal(`top-level
still top-level, but on a new line
  this is indented (1 level)
      this is even more indented (3 levels)
`
        )
    })

})


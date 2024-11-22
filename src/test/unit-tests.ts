import {assert} from "chai"
const {deepEqual, equal} = assert

import {asString, commaSeparated, indentWith, when, withNewlineAppended} from "../index.js"


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


describe("asString", () => {

    it("works on empty strings", () => {
        equal(asString([]), ``)
    })

})


describe("conditional inclusion - when syntax", () => {

    it("works for a non-thunk 2nd (Curried) argument", () => {
        deepEqual(when(false)("foo"), [])
        deepEqual(when(true)("bar"), "bar")
    })

    it("works for a thunk 2nd (Curried) argument", () => {
        let ran = false
        const thunk = () => {
            ran = true
            return "foo"
        }

        deepEqual(when(false)(thunk), [])
        equal(ran, false)

        deepEqual(when(true)(thunk), "foo")
        equal(ran, true)
    })

    it("code fragment 1 from README works", () => {
        const n = 3
        equal(
            asString([
                `foo`,
                `bar`,
                when(n === 3)([
                    `lizard`,
                    `sfdeljknesv`
                ])
            ]),
            `foo
bar
lizard
sfdeljknesv
`
        )
    })

})


describe("withNewlineAppended", () => {

    it("works for a fairly trivial example", () => {
        equal(
            asString([1, 2, 3].map(withNewlineAppended((num) => `${num}`))),
            `1

2

3

`
        )
    })

})


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


import {assert} from "chai"
const {deepEqual, equal} = assert

import {asString, indentWith, when, withNewlineAppended} from "../index.js"


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


describe("indentWith", () => {

    it("works for variadic arguments", () => {
        const indented = indentWith("@")(1)
        deepEqual(indented("foo", indented("bar")), ["@foo", "@@bar"])
    })

})


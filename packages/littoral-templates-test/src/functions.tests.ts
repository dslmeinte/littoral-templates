import {expect} from "chai"

import {asString, when, withEmptyLineAppended} from "littoral-templates"


describe("conditional inclusion - when syntax", () => {

    it("works for a non-thunk 2nd (Curried) argument", () => {
        expect(when(false)("foo")).to.deep.equal([])
        expect(when(true)("bar")).to.deep.equal(["bar"])
        expect(asString(when(true)("bar"))).to.equal(`bar\n`)
    })

    it("works for a thunk 2nd (Curried) argument", () => {
        let ran = false
        const thunk = () => {
            ran = true
            return "foo"
        }

        expect(when(false)(thunk)).to.deep.equal([])
        expect(ran).to.equal(false)

        expect(when(true)(thunk)).to.deep.equal(["foo"])
        expect(asString(when(true)(thunk))).to.equal(`foo\n`)
        expect(ran).to.equal(true)
    })

    it("works for a variadic 2nd (Curried) argument", () => {
        expect(when(true)("foo", "bar")).to.deep.equal(["foo", "bar"])
    })

    it("code fragment 1 from README works", () => {
        const n = 3
        expect(
            asString([
                `foo`,
                `bar`,
                when(n === 3)([
                    `lizard`,
                    `sfdeljknesv`
                ])
            ])
        ).to.equal(`foo
bar
lizard
sfdeljknesv
`)
    })

})


describe("withEmptyLineAppended", () => {

    it("works for a fairly trivial example", () => {
        expect(
            asString([1, 2, 3].map(withEmptyLineAppended((num) => `${num}`)))
        ).to.equal(`1

2

3

`
        )
    })

})


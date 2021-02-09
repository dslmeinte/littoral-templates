import { asString, indentWith } from "../index"

const indent = indentWith("\t")     // with apologies to the spaces people...

console.log(
    asString([
        `top-level`,
        [ `still top-level, but on a new line` ],
        indent(1)([
            `this is indented (1 level)`,
            indent(2)([
                `this is even more indented (3 levels)`
            ])
        ])
    ])
)


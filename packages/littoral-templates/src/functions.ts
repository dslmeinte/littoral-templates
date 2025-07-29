/**
 * Non-primitive functions on the {@link Template} type.
 */

import {flattened, Template} from "./index-internal.js"

/**
 * Allows for the following syntax:
 * <pre>
 * [
 *     when(<some boolean condition>)(
 *      <stuff to include when boolean condition is true>
 *     )
 * ]
 * </pre>
 *
 * and
 *
 * <pre>
 * [
 *     when(<some boolean condition>)(
 *      () => <stuff to include when boolean condition is true>
 *     )
 * ]
 * </pre>
 *
 * In the latter case, it's guaranteed that the thunk ({@see https://en.wikipedia.org/wiki/Thunk})
 * is only evaluated (/run) when the boolean condition is true.
 * That is useful in case the stuff to include produces side effects.
 *
 * Note that the second Curried argument is variadic, so it doesn't require array brackets (`[]`).
 */
export const when = (bool: boolean): ((...whenResults: Template[]) => Template) =>
    bool
        ? (...whenResults: Template[]) => flattened(whenResults)  // (need to be explicit here, or it doesn't work – despite having specified the return type...)
        : (_) => []


/**
 * @return a function that composes the given template function with the action of "adding an empty line after".
 */
export const withEmptyLineAppended = <T>(templateFunc: (t: T) => Template) =>
    (t: T) => [templateFunc(t), ``]

/**
 * A legacy alias of {@link withEmptyLineAppended}.
 * Note: this function might be deprecated and removed (per a major version) in the future.
 */
export const withNewlineAppended = withEmptyLineAppended


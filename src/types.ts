/**
 * Types for templates.
 */

/**
 * A type definition for “templates” that consist of a string, or an array of templates, or a thunk returning a template.
 * Note that nesting can occur to arbitrary (finite) depth.
 *
 * @since version 0.3.0
 */
export type Template = string | (() => Template) | Array<Template>

/**
 * Legacy alias for the {@link Template} type definition.
 * Note: this type might be deprecated and removed (per a major version) in the future.
 */
export type NestedString = Template


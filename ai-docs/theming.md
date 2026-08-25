# Theming

## Two layers: CSS custom properties, and per-component class props

nano-ui's visual states are driven by **both** mechanisms — it is not
purely one or the other:

1. **CSS custom properties** (`--n-color-*`, `--n-size-*`) supply the actual
   color/size *values*. These are generated once per theme and don't change
   per-component-instance; you override them to reskin the whole library.
2. **Component `type`/`size`/`theme`/`color` props** select *which* CSS class
   (and therefore which custom-property lookup) applies to a given instance —
   e.g. `type="danger"` on any component adds `n-type-danger`, which some
   component's CSS rule then reads `color('danger')` for. Some visual states
   (e.g. `link`/`glass`/`round`/`square` on `NButton`) exist ONLY as boolean
   props with dedicated CSS classes — there is no CSS-variable equivalent for
   "make this button a link-style button."

So: color/size *palettes* are CSS-variable-based and themeable without
touching component code; which palette entry/appearance a specific instance
uses is prop-based and cannot be changed via CSS alone.

## Shipped themes

Two full themes under `themes/`: `default` and `webservy`. Each theme
directory has one `index.scss` that `@forward`s every component's own
`<component>/index` partial (button, input, select, table, ... — one
partial per component group, mirroring `src/`), plus a `root/` directory
holding the actual variable definitions:

```
themes/default/
  index.scss          # forwards every component partial
  root/
    helpers.scss       # css-colors / css-sizes / css-remaps mixins + color()/size() SCSS functions
    vars/
      colors-light.scss        # default light palette
      colors-dark.scss         # dark palette
      colors-light-bluish.scss # alternate light palette
      colors-dark-bluish.scss  # alternate dark palette
      sizes-default.scss       # xs/sm/md/lg/xl size maps
  <component>/index.scss  # e.g. button/, input/, table/, ... — one per group
```

Load a whole theme by including its built CSS (`dist/themes/default.css` or
`dist/themes/webservy.css`), or `@use`/`@import` its `index.scss` from your
own SCSS build.

## The `color()` / `size()` SCSS helpers

`themes/default/root/helpers.scss` defines:

```scss
@function color($color, $opacity: 1) {
  @return rgba(var(--n-color-#{$color}), #{$opacity});
}
@function size($size, $context: '$') {
  @return <substitutes var(--n-size-#{$size}) into $context>;
}
```

Every component's own theme partial calls these, e.g.
`background: color('primary')`, `padding: size('md.pad')`. This is the
actual override surface: **redefine the underlying `--n-color-*`/`--n-size-*`
custom property**, and every component partial that reads it via `color()`/
`size()` picks up the new value automatically — no need to override each
component's CSS individually.

## Color variables

Generated via the `css-colors` mixin from each `colors-*.scss` palette file
(`$color-primary`, `$color-secondary`, `$color-success`, `$color-warning`,
`$color-danger`, `$color-info`, `$color-neutral`, a `$color-gray-05`..
`$color-gray-95` ramp, plus semantic ones like `$color-text`,
`$color-background`, `$color-form`, and a `$color-tag-0`..`$color-tag-N`
wheel used by the `color`/`$color` prop + `Styler.wheel()` for arbitrary
per-item coloring). Each becomes `--n-color-{name}: R, G, B` (channel
components, not a full `rgb()` string — that's why `color()` wraps it in
`rgba(var(--n-color-x), opacity)`), so overriding one is:

```css
:root {
  --n-color-primary: 43, 112, 227; /* R, G, B channels, comma-separated */
}
```

To override for a specific theme variant only, scope it under that theme's
root class/selector instead of bare `:root` (check the built CSS for the
exact selector the theme wraps its `:root` overrides in — `-light`/`-dark`/
`-light-bluish`/`-dark-bluish` variants are all generated from the same
mixin with different `$prefix` values and later remapped onto the plain
`--n-color-*` names via `css-remaps`).

## Size variables

Generated via `css-sizes` from `sizes-default.scss`'s five maps (`$size-xs`,
`$size-sm`, `$size-md`, `$size-lg`, `$size-xl` — matching exactly the five
built-in `Props.Size` values from `ai-docs/concepts.md`). Each map has keys
like `hgt`, `hgt-inline`, `pad`, `pad-vertical`, `fnt`, `fnt-icon`,
`fnt-label`, `fnt-inline`, `rad`, `rad-inline`, `rad-window`, `rad-circle` —
becoming `--n-size-{sizeName}-{key}`, e.g. `--n-size-md-hgt: 32px`. A
`.n-size-{name}` class selector (emitted by `ProtoData.classRoot()` whenever
a component's `size` prop is set) is what activates the correct size's
lookups for that component instance.

**Custom `size`/`type` values** (per `ai-docs/concepts.md`'s "open string"
rule) get a `n-size-{value}`/`n-type-{value}` class applied structurally, but
there is no generated `--n-size-{value}-*`/`--n-color-{value}` variable set
for them — you must define the CSS for a custom value yourself, following
the same variable-naming convention the built-ins use, for existing
component partials to pick it up "for free."

## Practical overrides

- **Reskin one color globally**: override `--n-color-primary` (and friends)
  at `:root` — every component using `type="primary"` shifts together.
- **Add a new `type`/`size` value**: define `--n-color-{name}` /
  `--n-size-{name}-*` variables following the existing naming convention,
  then pass `type="{name}"` / `size="{name}"` — no source changes needed
  since these props are open strings.
- **Swap themes entirely**: load `webservy`'s CSS instead of `default`'s (see
  `demos/overview.html`'s `<n-select>`-driven theme switcher, which swaps the
  `<link id="theme">` stylesheet `href` — theme switching is just swapping
  which compiled CSS file is loaded, not a runtime API call).
- **Icon changes**: not a CSS concern — see `ai-docs/icons.md` (`Styler.icons`).

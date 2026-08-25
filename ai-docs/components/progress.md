# NProgress

A horizontal progress bar whose fill percentage and status color are driven by a numeric value plus a numeric `state` enum.

## Import / Registration

Registered globally by `src/visuals/index.ts` as `NProgress` (`App.component(NProgress.name, NProgress)`). Source: `src/visuals/js/progress/{NProgress,NProgressController,NProgressData,NProgressView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | Adds `n-size-{size}` when non-null (`NProgressData.classList` checks `this.size != null` explicitly, unlike most components which delegate entirely to `classRoot()`). |
| `type` | `String` (open string; known built-ins: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Base color when `state === 1` (or falls back to the literal string `'primary'` if `type` is unset). **Overridden entirely for `state` values `0`, `2`, `3`** — see the `state` row below. |
| `modelValue` | `Number` | `0` | `NProgress.ts` (own prop) | The progress percentage. Clamped to `[0, 100]` in `NProgressData.value` (`Math.min(100, Math.max(0, model))`) and written to the CSS custom property `--n-progress-width` on the bar element. Cloned locally via `cloneProp('modelValue')`; there is no interaction that writes back to it (no `update()` calls anywhere in `NProgressController`/`NProgressView` — it is one-way, parent → display only). |
| `state` | `Number` | `0` | `NProgress.ts` (own prop) | Status enum controlling both the bar's color and a status CSS class. Exact mapping, read directly from `NProgressData.classList` in `src/visuals/js/progress/NProgressData.ts`:<br>• **`0`** — pending/awaiting: color forced to `'neutral'` (`n-type-neutral`, regardless of the `type` prop), adds class `n-await`.<br>• **`1`** — active/in-progress: color is whatever `type` resolves to (`type` prop, or `'primary'` if unset) — the only state that respects the `type` prop, adds class `n-active`.<br>• **`2`** — done/success: color forced to `'success'` (`n-type-success`, regardless of `type`), adds class `n-done`.<br>• **`3`** — aborted/error: color forced to `'danger'` (`n-type-danger`, regardless of `type`), adds class `n-abort`.<br>Any other numeric value falls through all four `if` checks: no `n-await`/`n-active`/`n-done`/`n-abort` class is added, and the color falls back to whatever `type` resolves to (same as state `1`'s color logic, but without the `n-active` class). |
| `changeState` | `Boolean` | `false` | `NProgress.ts` (own prop) | <!-- UNVERIFIED: declared as a prop but not read anywhere in NProgressController/NProgressData/NProgressView. Appears to currently have no effect in this source; do not assume it drives automatic state transitions despite the name suggesting that. --> |

## Events

| Event | Payload | Fired when |
|---|---|---|
| — | — | `NProgress.ts` declares `emits: []`. Nothing in `NProgressController`/`NProgressView` calls `update()` or `emit()` — `NProgress` is a purely presentational, one-way display component; `modelValue`/`state` are meant to be driven from the parent, not written back. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| — | — | None. `NProgressView` never calls `this.slot(...)`. |

## Exposed methods

None. `NProgressController` never calls `this.pass([...])`.

## Minimal example

```vue
<template>
  <n-progress :model-value="45" />
</template>
```

## Realistic example

Adapted from `demos/overview.html` — the four `state` values in sequence:

```vue
<template>
  <n-progress v-bind="n_progress" type="primary" :model-value="30" :state="0"></n-progress>
  <n-progress v-bind="n_progress" type="primary" :model-value="40" :state="1"></n-progress>
  <n-progress v-bind="n_progress" type="primary" :model-value="20" :state="2"></n-progress>
  <n-progress v-bind="n_progress" type="primary" :model-value="20" :state="3"></n-progress>
</template>
```

Note: `demos/overview.html` binds `v-bind="n_progress"` but never defines an `n_progress` key in its `data()` (only `n_tags`, `n_rating`, etc. are defined) — <!-- UNVERIFIED: whether this is a stale/incomplete demo binding; `n_progress` resolves to `undefined` there, which Vue's `v-bind` treats as binding nothing. Not a reason to omit `v-bind` in your own usage, just noting the demo itself appears incomplete on this point. -->

## Required composition

None — independent, standalone component.

## Common mistakes

- Assuming `state` and `type` combine additively: for `state` `0`, `2`, and `3`, the `type` prop's color is **completely overridden** (forced to `neutral`/`success`/`danger` respectively) — only `state: 1` actually uses the `type` prop's value for color. Setting `type="danger"` with `state="2"` still renders as success-green.
- Expecting `modelValue` to be settable via `v-model`: there is no `update:modelValue` emit anywhere in this component — it's a display-only value, not a v-model target, despite the prop being named `modelValue`.
- Expecting `changeState` to do something (e.g. auto-cycle or animate state changes): it's declared but never read anywhere in the Controller/Data/View of this source — currently inert.
- Passing a `state` value outside `0`–`3` expecting a sensible fallback class: no status class (`n-await`/`n-active`/`n-done`/`n-abort`) is added at all for out-of-range values, only the color-class fallback (equivalent to state `1`'s color, minus the `n-active` class).

## Gotchas

- `modelValue` is silently clamped into `[0, 100]` (`NProgressData.value`) before being written to `--n-progress-width` — passing `150` or `-10` will not overflow or empty the bar, it clamps to `100`/`0`.
- `size` is applied with an explicit `this.size != null` guard directly in `NProgressData.classList` rather than going through the shared `classRoot()` helper used by most other components (see concepts.md) — functionally equivalent for this prop, but worth knowing if you're comparing class-building logic across components.
- The bar fill itself is a nested `<div class="n-progress__bar">` with its width driven purely by the `--n-progress-width` CSS custom property — there's no width-transition/animation logic in the JS layer; any animated-fill behavior would come entirely from CSS (out of scope for this doc).

## Related components

None — NProgress has no composition relationship with NTag, NRating, or NMessage; documented independently per task scope.

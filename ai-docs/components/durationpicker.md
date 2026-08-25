# NDurationpicker

A text-input-plus-popover picker for a relative duration, bound as a plain
**integer number of seconds** — not a date, not an object, and not
minutes. Confirmed via `demos/overview.html` (`modelValue: 124521`, a raw
seconds count) and `@kizmann/pico-js`'s `PicoNowDuration.safeDuration()`/
`diffrence()` (`safeDuration(3661) => { dates:0, hours:1, minutes:1,
seconds:1 }`; `diffrence` returns whole seconds), which
`NDateHelper.getDurationData`/`getDurationString`/`getDurationNumber`
(`src/datetime/js/helper/NDateHelper.ts`) build directly on.

## Import / Registration

Registered globally by `src/datetime/index.ts`:
`App.component('NDurationpicker', NDurationpicker)`. Source:
`src/datetime/js/durationpicker/NDurationpicker.ts`. Controller
(`NDurationpickerController`) extends `NPopoverPanelController`
(`src/popover/js/popover-panel/NPopoverPanelController.ts`), same base as
`NTimepicker`.

`NDurationpicker.ts` also exports `NDurationpickerOptions` — the default
`options` array (below) — importable directly if you need the raw preset
seconds values.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `type` | `String` (open string) | `null` | `Props.Type` (`BaseProps.ts`) | Known defaults: `primary, secondary, info, warning, danger, success`. |
| `size` | `String` (open string) | `null` | `Props.Size` (`BaseProps.ts`) | Known defaults: `xs, sm, md, lg, xl`. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Disables input + popover trigger. |
| `clearable` | `Boolean` | `false` | `Props.Clearable` (`BaseProps.ts`) | Shows the built-in × clear button. |
| `clearValue` | `[String, Number, Boolean]` | `null` | `Props.ClearValue` (`BaseProps.ts`) | Value `modelValue` resets to via `applyClear()`. |
| `emptyText` | `String` | `Locale.trans('No items')` | `Props.EmptyText` (`TextProps.ts`) | Shown (via `this.empty()`) when `options` resolves to an empty list. |
| `position` | `String` (popover position enum) | `'bottom-start'` | `Props.PositionBottomStart` (`PositionProps.ts`) | Popover placement. |
| `modelValue` | **untyped** (no `type:` key — any value passes Vue's prop validation) | `null` | own declaration | **Runtime shape: a plain integer number of seconds** (e.g. `3600` = 1 hour). See "Common mistakes." |
| `options` | `[Array, Object]` | `NDurationpickerOptions` — 21 preset seconds values from `300` (5 min) up to `604800` (7 days) | own declaration | Selectable presets shown in the popover list; each entry is itself a raw seconds number. |
| `minDuration` | untyped | `null` | own declaration | **Declared but not read anywhere in `NDurationpickerController`/`NDurationpickerView`/`NDateHelper` — currently has no effect.** |
| `maxDuration` | untyped | `null` | own declaration | **Same — declared, unused, no effect in this version.** |
| `placeholder` | `String` | `'Select duration'` | own declaration | Shown in the text input when empty. |
| `negativeText` | `String` | `'Negative duration'` | own declaration | **Declared but not referenced anywhere in the component's own code — no effect found.** |
| `format` | `String` | `'YYYY-MM-DD HH:mm:ss'` | own declaration | **Declared but not consumed by any duration logic** (`NDateHelper`'s duration helpers never read `scope.data.format`) — appears reserved/unused in this version. |
| `dates` | `String` | `':count Day\|:count Days'` | own declaration | Pluralized display/parse pattern for the "days" part of a duration (`:count` is the numeric placeholder). |
| `hours` | `String` | `':count Hour\|:count Hours'` | own declaration | Same, for hours. |
| `minutes` | `String` | `':count Minute\|:count Minutes'` | own declaration | Same, for minutes. |
| `seconds` | `String` | `':count Second\|:count Seconds'` | own declaration | Same, for seconds. |
| `icon` | `String` | `Styler.icon('duration')` | `NDurationpicker`'s own declaration (not the `Props.Icon` mixin) | Leading icon; no matching `iconPosition`/`iconDisabled`. |

`dates`/`hours`/`minutes`/`seconds` are used **both ways**: for display
(`NDateHelper.getDurationString` picks the right plural form via
`Locale.choice`) and for parsing typed free text back into seconds
(`NDateHelper.getDurationNumber`/`getDurationMatch` builds a regex from
each pattern, replacing `:count` with a capture group).

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `number` (seconds), or `clearValue` on clear | (1) user edits the free-text input and presses Enter/blurs such that the text changed — `onInput()` calls `NDateHelper.getDurationNumber(this, data.input)` and emits the resulting seconds count; (2) user presses Enter without changing the recognizable text — `applyIndex()` emits the seconds value at the currently scrolled `options` index; (3) user clicks a preset row in the popover list — `NDurationpickerView.item()`'s `onClick` calls `scope.update('modelValue', value.value)` directly with that preset's raw seconds number; (4) the clear (×) button (`applyClear()`, inherited). |

## Slots

None — `NDurationpickerView` never calls `this.slot(...)` (uses `this.empty()` for the empty-options state instead of a slot).

## Exposed methods

None — no `pass()`/`context.expose` calls in `NDurationpickerController`.

## Minimal example

```vue
<n-durationpicker v-model="duration"></n-durationpicker>
```

## Realistic example

```vue
<!-- adapted from demos/overview.html -->
<n-durationpicker
  v-model="form.duration"
  size="md"
  type="primary"
  :clearable="true"
></n-durationpicker>
```

```js
// demos/overview.html initializes it as:
data.n_durationpicker = {
    size: 'md', type: 'primary', clearable: true,
    disabled: false, modelValue: 124521, // seconds — 1 day, 10:35:21
};
```

## Required composition

None required standalone. Optional: `NButtonGroup` (generic
`this.slot('default')` container) can wrap an `NDurationpicker` alongside
other controls, same as any other component — not a required or
component-specific pairing.

## Common mistakes

- **Getting the `modelValue` shape wrong.** It is a **plain integer number
  of seconds** — not an `{ hours, minutes, seconds }` object, not a
  `Date`, and not minutes. `60 * 5` (`300`) is 5 minutes; the built-in
  `options` preset list is itself just an array of such seconds integers
  (`NDurationpickerOptions`, e.g. `[300, 600, 900, 1800, ..., 604800]`).
  Passing an object or a `Date` will not work with the internal
  `Now.make().safeDuration(value)`/`diffrence()` logic this component is
  built on.
- Assuming `format`, `negativeText`, `minDuration`, or `maxDuration` do
  anything — all four are declared props with no code path reading them
  in this version (confirmed by grep across
  `src/datetime/js/durationpicker/` and `NDateHelper.ts`). Setting them is
  a silent no-op.
- Passing a negative number expecting a "negative duration" UI: internally
  `NDateHelper.getDurationData` takes the absolute value
  (`if (value < 0) value = value * -1`) before formatting, so negative
  seconds display the same as their positive counterpart rather than using
  `negativeText` (which, per above, isn't wired to anything anyway).

## Gotchas

- `NDurationpickerView.input()` checks `if (data.range) return null` to
  hide the text input, but `NDurationpickerData` (and its mixins
  `NPopoverPanelData`/`PositionData`/`TextData`) never define a `range`
  getter — this is dead code copied from `NDatepicker`/`NSlider` (which do
  have a real `range` prop/getter). It always evaluates falsy, so the
  input always renders; there is no way to hide it via a `range` prop.
- Free-text parsing (`onInput` → `getDurationNumber`) only works for
  strings matching the `dates`/`hours`/`minutes`/`seconds` patterns
  (default English `:count Day(s)/Hour(s)/Minute(s)/Second(s)`); typing
  something else silently resolves to whichever `options` preset is
  currently scrolled to (`applyIndex()`), not necessarily `0`.
- `options` accepts an `Object` as well as an `Array` per its prop type,
  following the shared `Props.OptionsObject`-style resolution described in
  `ai-docs/concepts.md` — but note `NDurationpicker` does **not** actually
  use `Props.OptionsObject`/`OptionHelper`; it declares its own local
  `options` prop and reads entries directly as raw values (`Arr.each(data.options, (value) => ({ value }))`
  in the View), so there's no `optionsValue`/`optionsLabel` pair here
  despite the "options" naming similarity to that shared pattern.

## Related components

- `NTimepicker` / `NTimepickerPanel` — sibling `src/datetime/` components
  with a completely different `modelValue` shape (a formatted date+time
  string, not seconds).
- `NDatepicker`, `NDatetimepicker` — other `src/datetime/` pickers (not
  covered in this doc batch).

# NTimepicker

A text-input-plus-popover time picker: the input shows/edits a formatted
time string, and the popover's content is an internal `NTimepickerPanel`
scroll-grid. `NTimepicker` is the standalone, form-facing component; see
`ai-docs/components/timepicker-panel.md` for the grid it embeds (which is
also independently usable).

## Import / Registration

Registered globally by `src/datetime/index.ts`:
`App.component('NTimepicker', NTimepicker)`. Source:
`src/datetime/js/timepicker/NTimepicker.ts`. Controller
(`NTimepickerController`) extends `NPopoverPanelController`
(`src/popover/js/popover-panel/NPopoverPanelController.ts`), so it inherits
the `focus` state, `onFocus`/`onBlur`, and the `el`/`popover` refs described
there.

## Props

`NTimepickerProps` spreads `Props.Clearable`, `Props.ClearValue`,
`Props.PositionBottomStart`, then **all of `NTimepickerPanelProps`**
(`src/datetime/js/timepicker-panel/NTimepickerPanel.ts`), then overrides
`icon` locally.

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `clearable` | `Boolean` | `false` | `Props.Clearable` (`BaseProps.ts`) | Shows the built-in × clear button once a value is set. |
| `clearValue` | `[String, Number, Boolean]` | `null` | `Props.ClearValue` (`BaseProps.ts`) | Value `modelValue` is reset to by `applyClear()`. |
| `position` | `String` (popover position enum) | `'bottom-start'` | `Props.PositionBottomStart` (`PositionProps.ts`) | Popover placement — full 12-value set in `ai-docs/concepts.md`. |
| `load` | `Boolean` | `false` | `Props.Load` (`BaseProps.ts`), via `NTimepickerPanelProps` | Loading state (`n-load` class). |
| `size` | `String` (open string) | `null` | `Props.Size` (`BaseProps.ts`), via `NTimepickerPanelProps` | Known defaults: `xs, sm, md, lg, xl`. |
| `type` | `String` (open string) | `null` | `Props.Type` (`BaseProps.ts`), via `NTimepickerPanelProps` | Known defaults: `primary, secondary, info, warning, danger, success`. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`), via `NTimepickerPanelProps` | Disables the input and popover trigger. |
| `modelValue` | `String` | `null` | `NTimepickerPanelProps` (own declaration) | The bound value — a **full date+time string** formatted per `format`, not a bare time string. See Gotchas. |
| `placeholder` | `String` | `'Select time'` | `NTimepickerPanelProps` | Shown in the text input when empty. |
| `format` | `String` | `'YYYY-MM-DD HH:mm:ss'` | `NTimepickerPanelProps` | Format `modelValue` is stored/parsed in (`Now.format`/`Now.make(value, format)`). |
| `displayFormat` | `String` | `'HH:mm:ss'` | `NTimepickerPanelProps` | Format shown/edited in the text input and panel header; independent of `format`. |
| `hoursInterval` | `Number` | `1` | `NTimepickerPanelProps` | Step between hour-grid entries in the panel. |
| `minutesInterval` | `Number` | `1` | `NTimepickerPanelProps` | Step between minute-grid entries. |
| `secondsInterval` | `Number` | `1` | `NTimepickerPanelProps` | Step between second-grid entries. |
| `icon` | `String` | `Styler.icon('clock')` | `NTimepicker`'s own declaration (`NTimepicker.ts`) — **not** the shared `Props.Icon` mixin | Leading icon in the display handle. No matching `iconPosition`/`iconDisabled` props exist on this component. |

All props above except `icon` are forwarded verbatim to the internal
`<n-timepicker-panel>` via `ProtoController.passProps(props, Mix.keys(NTimepickerPanelProps))`
(`NTimepickerView.panel()`).

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `string` (formatted per `format`), or `clearValue` | (1) user types a time in the input and presses Enter — `onEnter()` parses `data.input` with `Now.make(input, displayFormat)` and, if valid, calls `this.update('modelValue', date.format(data.format))`; (2) user picks an hour/minute/second cell in the embedded panel — the panel's own `update:modelValue` is caught in `NTimepickerView.panel()` (`onUpdate:modelValue`) and re-emitted via `scope.update('modelValue', value)`; (3) the built-in clear (×) button is pressed (`applyClear()`, inherited). |

## Slots

None — `NTimepickerView` never calls `this.slot(...)`. Its `panel()` override
replaces `NPopoverPanelView`'s default slot-based panel rendering
(`this.slot('panel')`) with a hard-coded `<n-timepicker-panel>`, so there is
no user-facing `panel` slot on this component either.

## Exposed methods

None — no `pass()` or `context.expose` calls in `NTimepickerController`.

## Minimal example

```vue
<n-timepicker v-model="time"></n-timepicker>
```

## Realistic example

```vue
<!-- adapted from demos/timepicker/index.html and demos/overview.html -->
<n-form :form="form">
  <n-form-item label="Meeting time">
    <n-timepicker
      v-model="form.time"
      size="md"
      type="primary"
      minutes-interval="30"
      :clearable="true"
    ></n-timepicker>
  </n-form-item>

  <n-form-item label="Disabled">
    <n-timepicker v-model="form.time" :disabled="true"></n-timepicker>
  </n-form-item>
</n-form>
```

## Required composition

None required to work standalone. Optional: `NButtonGroup`
(`src/button/js/button-group/NButtonGroupView.ts`, a plain `div` rendering
`this.slot('default')`) can wrap an `NTimepicker` alongside other controls —
this is generic slot content, not a required or NTimepicker-specific pairing.

## Common mistakes

- Assuming `modelValue` is a bare time string (e.g. `'14:30:00'`). By
  default it is a **full date+time string** in `format`
  (`'YYYY-MM-DD HH:mm:ss'`), e.g. `'2026-08-25 14:30:00'` — the date part
  defaults to today's date until a real date is supplied. `displayFormat`
  only controls what's shown/typed in the text field, not what's stored.
- Confusing this with `NDurationpicker`'s `modelValue`: that one is a plain
  **integer number of seconds**, not a formatted string at all — the two
  components have unrelated `modelValue` shapes despite both living under
  `src/datetime/`.
- Expecting `iconPosition`/`iconDisabled` to work on `NTimepicker`'s `icon` —
  it's a plain local prop override, not the shared `Props.Icon` mixin, so
  those companion props don't exist here.

## Gotchas

- `hoursInterval`/`minutesInterval`/`secondsInterval` only change the
  panel's scroll-grid step; they do not validate or round a typed value in
  the text input.
- Typing an unparseable string and pressing Enter silently reverts the
  input to the last valid `modelValue` display (`updateDates()`), with no
  emitted error/event.
- `displayFormat` also implicitly controls which grid columns the embedded
  panel renders (see `ai-docs/components/timepicker-panel.md`) since it's
  forwarded straight through.

## Related components

- `NTimepickerPanel` — the grid UI rendered inside this component's
  popover; also independently usable.
- `NDurationpicker` — a sibling `src/datetime/` component for relative
  durations (seconds), not absolute times.
- `NDatetimepicker`, `NDatepicker` — other `src/datetime/` pickers (not
  covered in this doc batch).

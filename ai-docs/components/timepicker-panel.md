# NTimepickerPanel

The hour/minute/second scroll-grid selector. It is used internally as
`NTimepicker`'s popover content (rendered directly by
`NTimepickerView.panel()`, not via a slot), but it is also registered
globally as its own component and rendered inline/standalone in
`demos/overview.html` (`<n-timepicker-panel v-bind="...">`) with no popover
involved — confirmed dual-purpose, not popover-only internal markup.

## Import / Registration

Registered globally by `src/datetime/index.ts`:
`App.component('NTimepickerPanel', NTimepickerPanel)`. Source:
`src/datetime/js/timepicker-panel/NTimepickerPanel.ts`.
`NTimepickerPanelController` extends `GroupController`
(`src/root/js/controller/GroupController.ts` — see concepts.md), though
this component doesn't itself call `append`/`remove`/`watchChilds`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (`BaseProps.ts`) | Loading state (`n-load` class). |
| `size` | `String` (open string) | `null` | `Props.Size` (`BaseProps.ts`) | Known defaults: `xs, sm, md, lg, xl`. |
| `type` | `String` (open string) | `null` | `Props.Type` (`BaseProps.ts`) | Known defaults: `primary, secondary, info, warning, danger, success`. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Disables the component (`superDisabled`). |
| `modelValue` | `String` | `null` | own declaration | The bound value — a full date+time string formatted per `format`. |
| `placeholder` | `String` | `'Select time'` | own declaration | Shown in the header when no value is set. |
| `format` | `String` | `'YYYY-MM-DD HH:mm:ss'` | own declaration | Format `modelValue` is stored/parsed in. |
| `displayFormat` | `String` | `'HH:mm:ss'` | own declaration | Controls the header display **and** which grid columns render: `hours()`/`minutes()`/`seconds()` each bail out (`return null`) unless `displayFormat` matches `/HH/`, `/mm/`, `/ss/` respectively. |
| `hoursInterval` | `Number` | `1` | own declaration | Step between hour-grid entries (`getHoursGrid(hoursInterval)`). |
| `minutesInterval` | `Number` | `1` | own declaration | Step between minute-grid entries. |
| `secondsInterval` | `Number` | `1` | own declaration | Step between second-grid entries. |

Unlike `NTimepicker`, this component has **no** `clearable`, `clearValue`,
or `position` props — those are popover/clear-button concerns owned
exclusively by `NTimepicker`.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `string` (formatted per `format`) | User clicks/pointerdowns an hour, minute, or second cell (`onMousedown(item)` → `this.update('modelValue', item.format(data.format))`). |

## Slots

None — `NTimepickerPanelView` never calls `this.slot(...)`.

## Exposed methods

None — no `pass()`/`context.expose` calls in `NTimepickerPanelController`.

## Minimal example

```vue
<n-timepicker-panel v-model="time"></n-timepicker-panel>
```

## Realistic example

```vue
<!-- demos/overview.html — used standalone, no popover -->
<n-timepicker-panel
  size="md"
  type="primary"
  v-model="form.time"
></n-timepicker-panel>
```

## Required composition

None. It does not require `NTimepicker` as a wrapper — it renders and
functions fully on its own, as shown above. Optional: `NButtonGroup` can
wrap it like any other control via its generic `default` slot.

## Common mistakes

- Expecting a clear (×) button — not present on this component; only
  `NTimepicker` has `clearable`/`clearValue`.
- Passing a `displayFormat` that omits `HH`, `mm`, or `ss` silently drops
  that entire column from the grid (no warning).
- Confusing this component's `modelValue` (a formatted date+time
  **string**) with `NDurationpicker`'s (a plain **integer number of
  seconds**) — unrelated shapes despite sharing `src/datetime/`.

## Gotchas

- Each of the hours/minutes/seconds columns renders via `n-scrollbar` (not
  `n-virtualbar`) and auto-scrolls to the current value on mount via
  `ncx.scrollCenter(...)`, but only when `data.date.input` is truthy (i.e.
  a real value has been provided) — with no value yet, nothing is
  auto-centered.
- Uses `GroupController` as its base, but no child-registration behavior
  (`append`/`remove`/`watchChilds`) is exercised anywhere in this
  component's own Controller/View code.
  <!-- UNVERIFIED: whether GroupController's child-tracking is consumed
  by a parent/sibling elsewhere in the datetime group for this specific
  component, or is simply inherited unused. -->

## Related components

- `NTimepicker` — wraps this component as its popover content and adds the
  text-input + clear-button UX.
- `NDurationpicker` — different `modelValue` shape (seconds, not a date
  string).

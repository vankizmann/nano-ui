# NButtonGroup

A generic visual-grouping wrapper that fuses its children into one connected
row (flush borders, shared corner radius) — use it whenever several controls
(not only buttons) should read as a single control cluster.

## Import / Registration

Registered globally via `App.use(Install)` from the **button** group index
(`src/button/index.ts`), which calls `App.component('NButtonGroup', NButtonGroup)`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` | Adds `n-load` class to the wrapper `<div>` only. |
| `size` | `String` | `null` | `Props.Size` | Open string; known styled values `xs`/`sm`/`md`/`lg`/`xl`. Adds `n-size-{size}` to the wrapper only. |
| `type` | `String` | `null` | `Props.Type` | Open string; known styled values `primary`/`secondary`/`info`/`warning`/`danger`/`success`. Adds `n-type-{type}` to the wrapper only. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` | Adds `n-disabled` to the wrapper only (via `superDisabled`). See Gotchas — this does **not** disable children. |

## Events

None — `NButtonGroup.ts` declares no `emits` array, and `NButtonGroupController` never calls `scope.emit(...)`.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The controls to group together. |

## Exposed methods

None — `NButtonGroupController` never calls `pass()`.

## Minimal example

```vue
<n-button-group>
    <n-button>Previous</n-button>
    <n-button>Next</n-button>
</n-button-group>
```

## Realistic example

Pulled directly from `demos/overview.html` — a mixed group of an input, a
date picker, a multi-select, and a button all fused into one row:

```vue
<n-button-group>
    <n-input v-model="n_input.value" v-bind="n_input" type="primary"></n-input>
    <n-datepicker v-bind="n_datepicker"></n-datepicker>
    <n-select v-bind="n_select" :multiple="true" type="primary" :options="icons"></n-select>
    <n-button v-bind="n_button" type="primary">Button</n-button>
</n-button-group>
```

## Required composition

None structurally — `NButtonGroupView` renders a plain `<div>` around
whatever is passed to its default slot, with no child-type registration or
validation. Per the confirmed composition contract for this component,
intended children are: `NButton`, `NCascader`, any input (`NInput`,
`NInputNumber`, `NInputFile`, `NTextarea`), and any date/time picker
(`NDatepicker`, `NTimepicker`, `NDatetimepicker`, `NDurationpicker`) — i.e. a
general grouping wrapper, not button-only. This is corroborated by the real
demo usage above (input + datepicker + select + button in one group).

## Common mistakes

- Assuming `disabled`/`size`/`type` set on `NButtonGroup` cascade down to its children — they don't. `NButtonGroupView.default()` only builds a class list for the wrapper `<div>` itself (`data.classList` = `this.classRoot()`); there is no prop-forwarding to slotted children. Each child must set its own `disabled`/`size`/`type` individually, exactly as shown in the demo above (each child repeats `type="primary"` itself).
- Expecting `NButtonGroup` to emit or expose anything for coordinating children (e.g. a shared active/selected state) — it has no `emits`, no exposed methods, and no child-registration mechanism (`GroupController`'s `append`/`remove`/`watchChilds` from concepts.md is **not** used here; `NButtonGroupController` extends the plain `ProtoController`, not `GroupController`). It is purely a visual wrapper.

## Gotchas

- The name suggests a button-only container, and `NButtonGroupView.ts`'s render logic is fully generic (`h('div', props, [this.slot('default')])`) with zero child-type checks — nothing in the JS restricts membership at all. The one genuinely button-specific rule lives in CSS (`src/button/css/button-group.scss`): `.n-button-group > .n-button { z-index: 5; }` bumps buttons above other children on hover/focus stacking. Everything else in that stylesheet (flex row layout, border-radius trimming on first/last child, `-1px` margin to collapse borders) is written generically against `> *`, so it applies uniformly to any child type — consistent with, not contradicting, the confirmed "general grouping wrapper" rule.
- `theme`, `color`, `clearable`, and `icon` are not declared props on `NButtonGroup` (no matching `Props.*` mixin is spread in), so despite `BaseData`/`IconData` getters existing on the class, passing those attributes has no reactive effect.

## Related components

- `NButton` — the most common child; see `ai-docs/components/button.md`.
- `NInput`, `NInputNumber`, `NInputFile`, `NTextarea` — input-family children.
- `NDatepicker`, `NTimepicker`, `NDatetimepicker`, `NDurationpicker` — date/time-picker children.
- `NCascader` — also a supported child (note its non-standard v-model, see concepts.md).

# NCollapseItem

A single panel within an `NCollapse`: renders a clickable header (icon,
label, optional action slot, angle indicator) and a content area whose
mount/visibility behavior is governed by `lazy`/`keep`, driven entirely by
the parent `NCollapse`'s `modelValue`.

## Import / Registration

Registered globally alongside `NCollapse` via `App.use(Install)` from the
**collapse** group index (`src/collapse/index.ts`), which calls
`App.component('NCollapseItem', NCollapseItem)`. The two are always
registered together — see `ai-docs/components/collapse.md`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `sort` | `[Number, String]` | `null` | Component-local (`NCollapseItem.ts`) | Intended sort key. <!-- Currently unused by the render path — see collapse.md Gotchas: `NCollapseView.default()` never consumes the `sorted` list. --> |
| `name` | `String` | `'default'` | Component-local | The identity used for open/closed membership in the parent's `modelValue` array (`Arr.has`/`Arr.toggle`). Give every item in a given `NCollapse` a distinct value — see collapse.md Gotchas. |
| `label` | `String` | `null` | Component-local | Header text, only used when no `label` slot is provided. |
| `icon` | `String` | `null` | Component-local | Icon name rendered before the label via `this.icon(data.icon)` (`ai-docs/icons.md` mechanism); omitted entirely (`null` render) when empty. |
| `scrollbar` | `Boolean` | `null` | Component-local | `null` = inherit the parent `NCollapse`'s `scrollbar` prop. Explicit `true`/`false` overrides it for this item only. |
| `lazy` | `Boolean` | `null` | Component-local | `null` = inherit the parent's `lazy`. See collapse.md Gotchas for the `lazy`/`keep` interaction. |
| `keep` | `Boolean` | `null` | Component-local | `null` = inherit the parent's `keep`. See collapse.md Gotchas. |

Note: `NCollapseItem` does **not** spread any of the shared `Props.*` mixins
(no `load`/`size`/`type`/`disabled`/etc.) — its prop list above is exhaustive.
`inheritAttrs: false` is also set on the component.

## Events

None — `NCollapseItem.ts` declares an empty `emits: []` array, and
`NCollapseItemController` never calls `this.emit(...)`. Its `superToggle()`/
`superOpen()`/`superClose()` methods delegate directly to the parent's
`ncx('collapse').superToggle(name)`, which is what actually fires the
parent's `update:modelValue`.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The panel's body content. Only rendered while `isActive()` is true (see collapse.md's `lazy`/`keep` breakdown); hidden with inline `display:none` while mounted-but-closed. |
| `label` | none | Overrides the `label` prop as the header text. Checked directly via `context.slots.label ? context.slots.label() : data.label` (not through the `this.slot()` helper, but functionally equivalent — renders nothing extra if absent). |
| `action` | none | Extra content in the header's action area (e.g. a button), rendered only if the slot is actually provided (`context.slots.action` truthiness check gates it, unlike `label`/`default`). |

## Exposed methods

None — `NCollapseItemController` never calls `pass()`.

## Minimal example

```vue
<n-collapse v-model="openPanels">
    <n-collapse-item name="panel-1" label="Panel 1">
        Content 1
    </n-collapse-item>
</n-collapse>
```

## Realistic example

```vue
<n-collapse v-model="openPanels" :keep="true">
    <n-collapse-item name="details" icon="info-circle" :lazy="false">
        <template v-slot:label>
            <strong>Order details</strong>
        </template>
        <template v-slot:action>
            <n-button size="xs" type="secondary" @click.stop="refresh">Refresh</n-button>
        </template>
        <pre>{{ order }}</pre>
    </n-collapse-item>
</n-collapse>
```

## Required composition

**Strict pairing, same pattern as `NRadio`/`NRadioGroup`**: `NCollapseItem`
cannot be used outside an `NCollapse` ancestor (it `inject`s the `NCollapse`
context and dereferences it unconditionally in `setup()` — see
`ai-docs/components/collapse.md`'s "Required composition" for the exact
mechanism), and `NCollapse` should only contain `NCollapseItem` children.

## Common mistakes

- Relying on the `action` slot for something that must always render — it's
  gated by a slot-presence check and produces no wrapper element at all if
  omitted (unlike `label`, which always has the `label` prop as a fallback).
- Using `NCollapseItem` standalone (outside `<n-collapse>`) — it will error
  when `NCollapseItemController.setup()` tries to read
  `collapse.data.scrollbar` off an `undefined` inject result.
- Forgetting that clicking the header itself toggles the panel
  (`onPointerdown` on the whole header element) — nesting another clickable
  control (like the `action` slot's button) without `@click.stop` will also
  toggle the panel when that control is clicked.

## Gotchas

- `sort` is accepted as a prop and fed into `NCollapse`'s internal `sorted`
  computation, but that computation is never used to order the rendered
  output — see `ai-docs/components/collapse.md` Gotchas. Don't rely on it
  for visual ordering today.
- `name` defaults to the literal string `'default'`, not `null` or an
  auto-generated id — easy to miss if you copy an item without setting
  `name` explicitly.
- `disabled`/`size`/`type`/`color`/`theme` are not declared props here at
  all (no `Props.*` mixin spread), unlike most other nano-ui components —
  don't expect them to have any effect if passed.

## Related components

- `NCollapse` — the only valid parent; see `ai-docs/components/collapse.md`
  for the open/closed model, `sort` caveat, and `lazy`/`keep` semantics.

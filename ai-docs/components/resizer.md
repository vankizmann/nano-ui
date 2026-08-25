# NResizer

A flex/box panel with a draggable edge handle that resizes its own width by pointer-dragging, optionally syncing its resulting width to other `NResizer`s sharing a `group`.

## Import / Registration

Registered globally by `src/resizer/index.ts` (`App.component(NResizer.name, NResizer)`). Source: `src/resizer/js/resizer/{NResizer,NResizerController,NResizerData,NResizerView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Adds `n-disabled` via `classRoot()`. <!-- UNVERIFIED: `NResizerController.onPointerdown` has no explicit `disabled`/`superDisabled` guard, so this appears styling-only, same pattern as NCheckbox's `disabled` — not independently confirmed by a runtime check in this component. --> |
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | See concepts.md "Type and Size are open strings". |
| `modelValue` | `[Number]` | `null` | local (`NResizer.ts`) | The resized width in pixels, as a v-model. Cloned locally (`cloneProp('modelValue')`); updated on drag-release and whenever a `group` signal fires (see Events). |
| `width` | `[Number]` | `null` | local (`NResizer.ts`) | The **live** width in pixels, updated continuously while dragging (unlike `modelValue`, which only settles on drag-release/group-sync). Also cloned locally and re-emitted on every `ResizeObserver` tick (`observeOffset()`). |
| `minWidth` | `[Number]` | `40` | local (`NResizer.ts`) | Clamp floor applied in `detectOffset()`. |
| `maxWidth` | `[Number]` | `null` | local (`NResizer.ts`) | Clamp ceiling applied in `detectOffset()`; no ceiling when `null`. |
| `group` | `[Array]` | `null` | local (`NResizer.ts`) | An array of group-key strings. When one resizer in a shared group finishes a drag, every other `NResizer` whose own `group` array contains a matching key (`Arr.has`) snaps its `width`/`modelValue` to the dragged resizer's resulting width (see Events). Defaults to `[this.uid]` (i.e. its own random UID, not shared with anything) when left `null` — **not shared by default**. |
| `flex` | `[String]` | `''` | local (`NResizer.ts`) | Raw CSS `flex` shorthand applied inline, used as a fallback layout size only while no `modelValue`/drag-derived width is set — see Gotchas for the exact precedence. |
| `direction` | `[String]` | `'right'` | local (`NResizer.ts`) | Which edge the drag handle is on and which way growing the width points. Confirmed values (both explicitly branched in `NResizerController.detectOffset()`/`NResizerData.classList`): `'right'`, `'left'`. Any other string falls through the `if` branches with no offset computed for `detectOffset()`, and no `n-resizer--{direction}` modifier class is added for anything besides these two (open string, but only these two are functional). |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `number` (pixels) | Fired via `this.update('width', ...)`/`this.update('modelValue', ...)` in `onGroupSignal()` — i.e. **only** when a *different* resizer in the same `group` finishes dragging and fires the `NResizer` pico-js signal; a resizer's own drag-release does not itself emit `update:modelValue` on itself (only `update:width`, see below). |
| `update:width` | `number` (pixels) | Fired continuously from `observeOffset()` (called on every `ResizeObserver` tick on the root element) via `this.update('width', this.data.width)`, and also from `onGroupSignal()` when a same-group peer finishes dragging. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The panel's own content, rendered alongside the drag handle inside the root `<div>`. |

## Exposed methods

None — no `pass()`/`context.expose` call in `NResizerController` or `NResizer.ts`.

## Minimal example

```vue
<template>
  <n-resizer v-model="width" :min-width="300" :max-width="800">
    <div style="width: 600px;">Resizable content</div>
  </n-resizer>
</template>

<script setup>
import { ref } from 'vue';
const width = ref(600);
</script>
```

## Realistic example

Modeled on `demos/resizer/index.html` (scrollable content inside a fixed-frame resizer) and the grouped pair in `demos/test.html` (two resizers on opposite sides syncing through a shared `group` key):

```vue
<template>
  <div style="border: 2px solid #000; overflow: hidden;">
    <div style="position: relative; width: 600px; height: 400px; overflow: auto;">
      <n-resizer :width="600" :min-width="300" :max-width="800">
        <div style="width: 600px; height: 1200px;">Scrollable panel content</div>
      </n-resizer>
    </div>
  </div>

  <div style="display: flex; flex-direction: row;">
    <n-resizer :group="['pair']" flex="0 0 60%" direction="right" style="height: 200px;">
      Left panel
    </n-resizer>
    <n-resizer :group="['pair']" flex="0 0 40%" direction="left" style="height: 200px;">
      Right panel
    </n-resizer>
  </div>
</template>
```

## Required composition

None — a single `NResizer` works standalone. `group` composition is optional (multiple `NResizer`s sharing the same key string synchronize their widths, but neither requires a parent/wrapper component — they just need the same literal string somewhere in each one's `group` array).

## Common mistakes

- Passing a plain string to `group` (e.g. `group="pair"`) — the prop type is `Array`; it must be an array of key strings (e.g. `:group="['pair']"`), matched via `Arr.has`.
- Relying on `update:modelValue` to track width live while dragging — it only fires on drag-release via a group signal from a *different* resizer, not from the panel's own drag. Use `update:width` (or `v-model:width`) for live updates during a drag of the same instance.
- Passing an HTML `dropzone="true"` attribute (seen in `demos/test.html`) expecting drag-and-drop file behavior — `NResizer` has no drag/drop props or logic; this is a plain fall-through DOM attribute with no special handling in this component.
- Expecting `flex` to keep controlling layout after the panel has been resized once — once `modelValue`/drag-derived width exists, `style.flex` is overwritten to `0 0 {model}px`, overriding the `flex` prop (see Gotchas).

## Gotchas

- **Style precedence in `NResizerView.default()`:** if `data.model` (aka `modelValue`) is a number, `style.width = '{model}px'` is set; if there's no `style.width` *and* `flex` is truthy, `style.flex = data.flex`; then, unconditionally, if `data.model` is truthy, `style.flex` is overwritten again to `'0 0 {model}px'`. Net effect: a set `modelValue` always wins for both `width` and `flex`, and the `flex` prop only has any visible effect before a resize has ever produced a `modelValue`.
- Only `direction: 'right'`/`'left'` are handled by the offset math — no `'top'`/`'bottom'` vertical resizing exists despite `direction` being an open `String` prop.
- Group syncing goes through the same pico-js `Signal` bus documented in concepts.md (`onSignal('NResizer', ...)`/`fireSignal('NResizer', group)`) — it's global, not scoped to a parent component, so two unrelated `NResizer`s anywhere in the app sharing the same `group` key string will sync even without a common ancestor.
- The `ResizeObserver` bound in `onMounted()` fires `observeOffset()` (which recomputes offset from actual `getBoundingClientRect()` layout, not from any pointer event) on *every* layout-affecting size change of the root element — including ones caused by external CSS/layout changes unrelated to a user drag.

## Related components

- `NScrollbar`/`NVirtualbar` — commonly wrap or are wrapped by `NResizer` panels for scrollable resizable regions (see `demos/test.html`).

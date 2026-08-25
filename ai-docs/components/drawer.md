# NDrawer

An edge-anchored panel toggled by a plain boolean `v-model`; shares almost all of its Data/View/backend logic with `NModal` but slides in from a side instead of centering.

## Import / Registration

Registered globally by `src/modal/index.ts`:

```ts
App.component('NDrawer', NDrawer);
```

Source: `src/modal/js/drawer/NDrawer.ts` (+ `NDrawerController.ts`, `NDrawerData.ts` extends `NModalData`, `NDrawerView.ts` extends `NModalView`). See `ai-docs/concepts.md` for the shared Controller/Data/View pattern.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (`BaseProps.ts`) | Adds the loading state/class from `ProtoData.classRoot()`. |
| `size` | `String` | `null` | `Props.Size` (`BaseProps.ts`) | Open string. Known styled values: `xs`, `sm`, `md`, `lg`, `xl`. |
| `type` | `String` | `null` | `Props.Type` (`BaseProps.ts`) | Open string. Known styled values: `primary`, `secondary`, `info`, `warning`, `danger`, `success`. |
| `theme` | `String` | `'dark'` | `Props.ThemeDark` (`BaseProps.ts`) | Default is `'dark'`, not `null`. |
| `position` | `String`, validated in `['top','bottom','left','right']` | `'right'` | `Props.PositionDrawer` (`PositionProps.ts`) | **Full enum: `top`, `bottom`, `left`, `right`.** Controls which edge the drawer slides from; adds a `{bem}--{position}` modifier class via the inherited `NModalData.classList`. |
| `modelValue` | `Boolean` | `false` | `NDrawer.ts` (own) | Open/closed state. Plain `v-model`. |
| `mode` | `String` | `'modal'` | `NDrawer.ts` (own) | **Declared but currently unused.** Grepping `src/modal/js/drawer/` and `NDrawerData.ts` finds no `get mode()` getter and no other read of `this.scope.get('mode')` anywhere — it has no observable effect on rendering or behavior in this version. Do not rely on it to change modal-vs-inline behavior. |
| `listen` | `Boolean` | `true` | `NDrawer.ts` (own) | Same trigger auto-binding mechanism as `NModal` — see `ai-docs/components/modal.md` Gotchas. |
| `closable` | `Boolean` | `true` | `NDrawer.ts` (own) | Gates escape-key and outside-click closing, same as `NModal`. |
| `scrollbar` | `Boolean` | `true` | `NDrawer.ts` (own) | Wraps default-slot content in `n-scrollbar` when `true` (inherited `NModalView.content()`). |
| `width` | `String \| Number` | `null` | `NDrawer.ts` (own) | Inline `style.width` on the frame; numbers get `px` appended. |
| `height` | `String \| Number` | `null` | `NDrawer.ts` (own) | Inline `style.height` on the frame. Declared as `[String, Number]` in the prop type even though its JSDoc says `PropType<string>`. |
| `target` | `String` | `null` | `NDrawer.ts` (own) | CSS selector for the trigger; auto-resolves to the previous DOM sibling if left `null` (same as `NModal`). |
| `beforeOpen` | `Function` | `null` | `NDrawer.ts` (own) | Same gating semantics as `NModal`'s `beforeOpen`. |
| `beforeClose` | `Function` | `null` | `NDrawer.ts` (own) | Same gating semantics as `NModal`'s `beforeClose`. |

**There is no `keep` prop on `NDrawer`**, unlike `NModal`. `NDrawerData` inherits `NModalData`'s `get keep()` getter (`this.scope.get('keep')`), but since `keep` is not declared in `NDrawerProps`, that always resolves falsy — so the inherited `NModalView.body()` check `if (!data.keep && !data.model) return null;` always behaves as `if (!data.model) return null;` for `NDrawer`. In practice this means `NDrawer`'s content is **always unmounted while closed** — there is no keep-alive option.

**Confirmed: there is no `title` prop.** `NDrawerProps` has no `title` entry and none of `NDrawerData`/`NDrawerView` (nor the inherited `NModalData`/`NModalView`) read one. Use the `header` slot instead.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `boolean` | `ProtoController.update('modelValue', value)`, fired from `onOpen()`/`onClose()` when the internal `NModalElement` opens/closes. |
| `open` | none | Fired in `NDrawerController.onOpen()`, right after `update:modelValue` is emitted `true`. |
| `close` | none | Fired in `NDrawerController.onClose()`, right after `update:modelValue` is emitted `false`. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `header` | none | Rendered inside `{bem}__header`, only if present (inherited `NModalView.body()`). |
| `default` | none | Main content, wrapped in `n-scrollbar` (or plain `div` if `scrollbar: false`). |
| `footer` | none | Rendered inside `{bem}__footer`, only if present. |
| `raw` | `{ props }` (the frame's `{ name: 'frame', style }` object) | If present, bypasses header/default/footer and hands you the whole frame. |

No slot receives a `close()` function or any other scoped helper — same as `NModal`.

## Exposed methods

Exposed via `ncx.pass({ open: 'superOpen', close: 'superClose' })` in `NDrawer.ts`'s `setup()`:

- `open()` — calls `NModalElement.open()` with no arguments (no `silent` parameter is forwarded, unlike `NModal.superOpen`).
- `close(forceClose = false)` — calls `NModalElement.close(forceClose)`. There is no `silent` parameter exposed here either (unlike `NModal.superClose`'s two-argument form) — `NDrawerController.superClose` only forwards `forceClose`.

## Minimal example

```vue
<template>
  <n-button @click="open = true">Open drawer</n-button>
  <n-drawer v-model="open" :listen="false">
    Hello!
  </n-drawer>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
```

## Realistic example

Adapted from `demos/overview.html` (header/footer slots, `position` driven by a select) and the nested-drawer pattern in `demos/drawer.html` (`listen="false"`, chained `v-model`s):

```vue
<template>
  <n-button @click="showDrawer1 = true">Open Drawer 1</n-button>

  <n-drawer v-model="showDrawer1" :listen="false" position="right" :width="640">
    <template #header>
      Edit item
    </template>

    <n-form>
      <n-form-item label="Name">
        <n-input placeholder="Fill me" />
      </n-form-item>
    </n-form>

    <n-button @click="showDrawer2 = true">Open Drawer 2</n-button>

    <template #footer>
      Im the footer
    </template>
  </n-drawer>

  <n-drawer v-model="showDrawer2" :listen="false">
    Foobar
  </n-drawer>
</template>

<script setup>
import { ref } from 'vue';
const showDrawer1 = ref(false);
const showDrawer2 = ref(false);
</script>
```

## Required composition

None — `NDrawer` is standalone. Its content is whatever you put in the `header`/`default`/`footer`/`raw` slots.

## Common mistakes

- **Assuming a `title` prop exists.** It does not (confirmed above) — use the `header` slot.
- **Assuming `v-model:visible` instead of plain `v-model`.** `NDrawer` uses `modelValue`/`update:modelValue`, exactly like `NModal`.
- **Assuming slot-scoped close props exist.** No slot receives any scope; close it by writing `false` to your own `v-model` ref (as `demos/drawer.html` does, always with `:listen="false"` and no `target`) or by calling the exposed `close()` method.
- **Assuming the `mode` prop does something.** It is declared (`default: 'modal'`) but not read anywhere in `NDrawerData`/`NDrawerController`/`NDrawerView` in this version — treat it as inert.
- **Assuming `keep` works on `NDrawer` like it does on `NModal`.** It doesn't exist as a prop here; content always unmounts on close (see Props above).

## Gotchas

- **`listen`/trigger auto-binding** works identically to `NModal` — see `ai-docs/components/modal.md` Gotchas for the full mechanism (previous-sibling auto-`target`, global `mousedown`/`keyescape` handlers, shared `NModalHandler`/`NModalElement`). All of `demos/drawer.html`'s examples explicitly set `:listen="false"` and drive the drawer purely through `v-model`, presumably because the trigger buttons there aren't structured as the drawer's immediate previous sibling.
- **No `watchProp('modelValue', ...)` in `NDrawerController`, unlike `NModalController`.** Confirmed by reading both controllers' `setup()`: `NModalController.setup()` registers `this.watchProp('modelValue', (value) => value ? this.modal.open() : this.modal.close())`; `NDrawerController.setup()` has no equivalent call anywhere. `NDrawerController.onMounted()` only checks the *initial* `data.model` once (`if (data.model) this.modal.open();`). Practical effect: the drawer's visibility class/content-mount is driven directly and reactively off the `modelValue` prop in the shared `NModalView` (so toggling `v-model` from outside still shows/hides it visually), but toggling `v-model` from outside **after mount does not re-enter `NModalElement`** — it will not register with `NModalHandler`'s backdrop/z-index stack, will not arm the escape-key/outside-click `Pointer.prevent` chain for that instance, and will not re-fire `beforeOpen`/`beforeClose` or the `open`/`close` events. Prefer the exposed `open()`/`close()` methods (via a template ref) or the trigger/`listen` mechanism over raw external `v-model` writes if you need those side effects; plain internal toggling (button-inside-the-drawer calling `open = false`, or the default trigger click path) is unaffected since it always goes through `NModalElement` directly.
- **Z-index/backdrop stacking, `beforeOpen`/`beforeClose` promise-gating, and the shared global handler** all work exactly as documented for `NModal` — `NDrawer` reuses `NModalHandler`/`NModalElement` verbatim (`src/modal/js/drawer/NDrawerController.ts` imports them from `../handler/`).

## Related components

- `NModal` — nearly identical implementation (`NDrawerData extends NModalData`, `NDrawerView extends NModalView`); differs mainly in default `position`-driven layout (edge slide-in vs. centered), the missing `keep` prop, and the `watchProp('modelValue', ...)` asymmetry noted above.
- `n-scrollbar` — used internally for default-slot content when `scrollbar: true`.
- `NPreview`, `NAlert`/`NConfirm` (`src/preview`, `src/signal`) — also built on the same `NModalHandler`/`NModalElement` stacking backend.

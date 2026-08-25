# NModal

An overlay dialog toggled by a plain boolean `v-model`, rendered into `document.body` and stacked/backdropped through a shared global handler.

## Import / Registration

Registered globally by `src/modal/index.ts`:

```ts
App.component('NModal', NModal);
```

Source: `src/modal/js/modal/NModal.ts` (+ `NModalController.ts`, `NModalData.ts`, `NModalView.ts`). See `ai-docs/concepts.md` for the shared Controller/Data/View pattern this file assumes.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (`BaseProps.ts`) | Adds the loading state/class from `ProtoData.classRoot()`. |
| `size` | `String` | `null` | `Props.Size` (`BaseProps.ts`) | Open string, not a closed enum — see `ai-docs/concepts.md`. Known styled values: `xs`, `sm`, `md`, `lg`, `xl`. |
| `type` | `String` | `null` | `Props.Type` (`BaseProps.ts`) | Open string. Known styled values: `primary`, `secondary`, `info`, `warning`, `danger`, `success`. |
| `theme` | `String` | `'dark'` | `Props.ThemeDark` (`BaseProps.ts`) | Note the default is `'dark'`, not `null` — `NModal` uses `ThemeDark`, not `ThemeNone`. |
| `position` | `String`, validated in `['top','bottom','left','right']` | `'right'` | `Props.PositionModal` (`PositionProps.ts`) | Adds a `{bem}--{position}` modifier class (`NModalData.classList`). Same 4-value set as `NDrawer`'s `position`, despite the name suggesting a popover-style set. |
| `modelValue` | `Boolean` | `false` | `NModal.ts` (own) | The open/closed state. Plain `v-model` — see Events below. |
| `scrollbar` | `Boolean` | `true` | `NModal.ts` (own) | When `true`, the default-slot content is wrapped in an `n-scrollbar` component (`NModalView.content()`); when `false`, a plain `div`. |
| `keep` | `Boolean` | `false` | `NModal.ts` (own) | When `true`, the body/content DOM is kept mounted even while closed (`NModalView.body()`: `if (!data.keep && !data.model) return null;`). Default `false` unmounts content on close. |
| `listen` | `Boolean` | `true` | `NModal.ts` (own) | Enables the auto trigger-binding mechanism — see Gotchas. |
| `closable` | `Boolean` | `true` | `NModal.ts` (own) | When `false`, escape-key and outside-click/backdrop clicks no longer close the modal (`NModalElement.onMousedown`/`onEscape`). Explicit `close()` calls (e.g. `force: true`) still work. |
| `width` | `String \| Number` | `null` | `NModal.ts` (own) | Applied as inline `style.width` on the frame element; numbers are suffixed with `px` (`NModalData.safeWidth`). |
| `height` | `String \| Number` | `null` | `NModal.ts` (own) | Same as `width`, for `style.height`. |
| `target` | `String` | `null` | `NModal.ts` (own) | CSS selector for the trigger element. If left `null`, the trigger auto-resolves to the modal's previous DOM sibling — see Gotchas. |
| `beforeOpen` | `Function` | `null` | `NModal.ts` (own) | Called before opening. May return `false`/`Promise` to block/delay the open — see Gotchas. |
| `beforeClose` | `Function` | `null` | `NModal.ts` (own) | Same as `beforeOpen`, called before closing. |

**Confirmed: there is no `title` prop.** `NModalProps` (`src/modal/js/modal/NModal.ts`) has no `title` entry, and `NModalData`/`NModalView` never read one. `demos/modal/index.html` (a legacy Vue-2-era demo) does write `<n-modal ref="modal" title="Modal :)">`, but against the current component that `title` attribute just falls through as a plain HTML attribute — it is not consumed by the component and renders no heading. Use the `header` slot instead (see Slots).

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `boolean` | Standard v-model write path (`ProtoController.update('modelValue', value)`), fired from `onOpen()`/`onClose()` whenever the internal `NModalElement` actually opens or closes (trigger click, outside click, escape key, or the exposed `open()`/`close()` methods). |
| `open` | none | Fired in `NModalController.onOpen()`, right after `update:modelValue` is emitted with `true`. |
| `close` | none | Fired in `NModalController.onClose()`, right after `update:modelValue` is emitted with `false`. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `header` | none | Rendered inside `{bem}__header` above the default content, only if the slot is present (`slots.header` check in `NModalView.body()`). |
| `default` | none | Main content, wrapped in `n-scrollbar` (or a plain `div` if `scrollbar: false`) inside `{bem}__frame > {bem}__content`. |
| `footer` | none | Rendered inside `{bem}__footer` below the default content, only if present. |
| `raw` | `{ props }` where `props` is the frame's `{ name: 'frame', style }` object | Escape hatch: if present, `NModalView.body()` returns `slots.raw({ props })` directly and skips header/default/footer entirely — you own the whole frame markup. |

No slot passes a `close()` function or any other scoped helper for dismissing the modal. Closing is done exclusively by driving `v-model` to `false` (or calling the exposed `close()` method — see below), typically from a button inside your own slot content wired to your own state/ref.

## Exposed methods

Exposed via `ncx.pass({ open: 'superOpen', close: 'superClose' })` in `NModal.ts`'s `setup()`, reachable on a template ref:

- `open(silent = false)` — calls the internal `NModalElement.open(silent)`. `silent: true` still opens (and still runs `beforeOpen`), but skips the internal `onOpen` callback entirely — meaning `update:modelValue`/`open` are **not** emitted for a silent open (`NModalElement.openRun`: `if (!silent && this.options.onOpen) { this.options.onOpen(); }`).
- `close(force = false, silent = false)` — calls `NModalElement.close(force, silent)`. `force: true` bypasses `Pointer.blocked(uid)` checks (parent-chain blocking) and closes anyway; `silent: true` likewise skips the `onClose` callback, so `update:modelValue`/`close` are not emitted.

## Minimal example

```vue
<template>
  <n-button @click="open = true">Open modal</n-button>
  <n-modal v-model="open">
    Hello!
  </n-modal>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
```

## Realistic example

Adapted from `demos/overview.html` (header/footer slots, sizing/theme props driven reactively) and `demos/overview.html`'s `beforeClose` usage:

```vue
<template>
  <n-button>Open modal</n-button>
  <n-modal
    v-model="showModal"
    size="md"
    theme="auto"
    :width="640"
    :before-close="confirmClose"
  >
    <template #header>
      Edit item
    </template>

    <n-form>
      <n-form-item label="Name">
        <n-input v-model="form.name" placeholder="Fill me" />
      </n-form-item>
    </n-form>

    <template #footer>
      <n-button @click="showModal = false">Cancel</n-button>
      <n-button type="primary" @click="save">Save</n-button>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, reactive } from 'vue';

const showModal = ref(false);
const form = reactive({ name: '' });

function save() {
  showModal.value = false;
}

// beforeClose may return false, a boolean, or a Promise to gate closing —
// see demos/overview.html: `() => window.Confirm.make('blabla', 'danger')`
function confirmClose() {
  return window.Confirm.make('Discard changes?', 'danger');
}
</script>
```

Note: `<n-button>Open modal</n-button>` immediately precedes `<n-modal>` with no explicit `target`/`listen="false"` — this relies on the default trigger auto-binding described in Gotchas, exactly as shown in `demos/overview.html`.

## Required composition

None — `NModal` is standalone. Its content is whatever you put in the `header`/`default`/`footer`/`raw` slots; there is no required child component.

## Common mistakes

- **Assuming a `title` prop exists.** It does not (confirmed above). Use the `header` slot.
- **Assuming `v-model:visible` instead of plain `v-model`.** `NModal` uses the standard `modelValue`/`update:modelValue` pair — a plain `v-model="open"` is correct, matching `ai-docs/concepts.md`'s v-model conventions section.
- **Assuming slot-scoped close props exist** (e.g. expecting `<template #default="{ close }">`). No slot receives any scope — see Slots above. Close it by writing to your own `v-model` ref, or via the `close()` exposed method on a template ref.
- Forgetting that `keep: false` (the default) unmounts slot content while closed — don't rely on child component state persisting across opens unless `keep` is `true`.

## Gotchas

- **`listen` / trigger auto-binding**, confirmed via `src/modal/js/handler/NModalElement.ts`: when a `NModal` mounts, its `NModalElement` wrapper resolves a `target` — if the `target` prop is left `null` (the default), it auto-resolves to **the modal's previous DOM sibling element** (`Dom.find(el).prev().get(0)`, `NModalElement` constructor). With `listen: true` (the default), a global `mousedown` handler (bound once via `Pointer.bind('NModal', 'mousedown', ...)` in `NModalHandler.init()`) checks every click: if it lands inside the resolved `target`, the modal opens (if closed); if it lands outside both the `target` and the modal's own frame while the modal is open, the modal closes (subject to `closable`). This is exactly the `<n-button>Open modal</n-button><n-modal>...</n-modal>` sibling pattern used throughout `demos/overview.html`. Set `listen="false"` to disable this entirely and drive the modal purely via `v-model`/exposed methods (as `demos/drawer.html` does for `NDrawer`), or set an explicit `target="#some-selector"` to bind to a specific element instead of the previous sibling.
- **Escape key and outside-click** close behavior is also gated by `closable` (default `true`) and goes through the same global `Pointer`-bound handlers (`NModalHandler.escape`/`.mousedown`), which are registered **once** for the whole app and iterate every currently-mounted `NModalElement` (shared by `NModal`, `NDrawer`, and also `NPreview`/`NAlert`/`NConfirm`, which reuse the same `NModalHandler`/`NModalElement` classes).
- **Z-index/backdrop stacking**: opening a modal calls `NModalHandler.open(uid, zindex)` (`zindex` from `Pointer.zindex()`), which raises a shared `.n-modal-backdrop` element and adds an `n-backdrop` class to `<body>`. Closing pops it back to the next-topmost modal's z-index, or removes the backdrop entirely when none remain.
- **`beforeOpen`/`beforeClose`** (`NModalElement.onPromise`): if the function returns `false`, the open/close is cancelled; if it returns a `Promise`, the transition is deferred (and the modal is frozen against further open/close calls) until the promise settles; if it returns `null`/`undefined`, the transition proceeds immediately. `demos/overview.html` uses this to gate closing on a `Confirm` dialog: `beforeClose: () => window.Confirm.make('blabla', 'danger')`.
- **External `v-model` writes are watched and drive the real open/close machinery**: `NModalController.setup()` calls `this.watchProp('modelValue', (value) => value ? this.modal.open() : this.modal.close())`, so setting the bound ref from outside (not just clicking the trigger) correctly re-enters `NModalElement`, updates the backdrop/z-index stack, and fires `open`/`close`. (Contrast with `NDrawer` — see `ai-docs/components/drawer.md` Gotchas, which has no equivalent watcher.)

## Related components

- `NDrawer` — same Controller/View lineage (`NDrawerData extends NModalData`, `NDrawerView extends NModalView`), same `NModalHandler`/`NModalElement` stacking backend, but slides from an edge instead of centering.
- `n-scrollbar` — used internally to wrap default-slot content when `scrollbar: true` (the default).
- `NPreview`, `NAlert`/`NConfirm` (`src/preview`, `src/signal`) — also built on `NModalHandler`/`NModalElement`, so they share the same escape-key/outside-click/z-index stacking behavior described above.

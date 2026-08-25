# NLoader

A wrapper that overlays a spinner on top of its default-slot content while `visible`, with debounced show/hide timing to avoid flicker on fast async operations.

## Import / Registration

Registered globally by `src/loader/index.ts` (`App.component(NLoader.name, NLoader)`). Source: `src/loader/js/loader/{NLoader,NLoaderController,NLoaderData,NLoaderView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | See concepts.md "Type and Size are open strings"; styles the spinner color. |
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | Same open-string rule; styles the spinner size. |
| `visible` | `[Boolean]` | `false` | local (`NLoader.ts`) | Whether the loading overlay should be shown. Not applied to the DOM directly — see the `minimum`/`debounce` timing logic below and in Gotchas. |
| `minimum` | `[Number]` | `120` | local (`NLoader.ts`) | Minimum milliseconds the spinner stays visible once shown, even if `visible` flips back to `false` almost immediately — prevents a flash-then-vanish spinner for very fast operations. |
| `debounce` | `[Number]` | `120` | local (`NLoader.ts`) | Extra milliseconds to wait, after `visible` becomes `false` and the `minimum` has already elapsed, before actually removing the spinner. |

## Events

None — `emits: []` in `NLoader.ts`; no v-model, no custom events.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The content the loader overlays (e.g. a form, a panel) — `NLoaderView.default()` renders only `this.slot()` inside the root div; the actual spinner graphic comes from the `n-load` CSS class (see Gotchas), not from a rendered child node. |

## Exposed methods

None — no `pass()`/`context.expose` call in `NLoaderController` or `NLoader.ts`.

## Minimal example

```vue
<template>
  <n-loader :visible="loading">
    <p>Content that may still be loading…</p>
  </n-loader>
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
```

## Realistic example

Modeled on the `NLoader` section of `demos/overview.html`:

```vue
<template>
  <n-loader :visible="isLoading" size="md" type="primary" style="min-height: 200px; padding: 20px;">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit…</p>
  </n-loader>
</template>

<script setup>
import { ref } from 'vue';
const isLoading = ref(true);
</script>
```

## Required composition

None — `NLoader` is a standalone wrapper around arbitrary slot content.

## Common mistakes

- Expecting the spinner to appear/disappear the instant `visible` toggles — by design it doesn't: a show is applied immediately, but a hide is delayed by up to `minimum + debounce` milliseconds total (see Gotchas) to avoid flicker on quick toggles.
- Assuming `visible` is reflected as a prop straight onto a DOM attribute/class you can target — the actual active state is the internal `active` value (`n-load` class), derived from `visible` through the timer logic, not `visible` itself.
- Toggling `visible` on/off in a tight loop expecting each toggle to restart a fresh full-length overlay — `applyTimer()` resets `this.timing` and clears any pending hide-timer on every `visible` change, but the effective on-screen duration is still governed by the same `minimum`/`debounce` math, not a naive per-toggle reset.

## Gotchas

- **The spinner graphic is pure CSS, not a rendered element.** `NLoaderView.default()` only ever renders the default slot; the visual spinner comes from `::before`/`::after` pseudo-elements keyed off the `n-load` class in `src/loader/css/loader.scss` (`.n-load:before`, `.n-load:after`, and nested-loader overrides `.n-load .n-load:before/:after`). If you don't load the shipped CSS, `NLoader` renders as an inert wrapper with no visible overlay.
- **Timing algorithm (`NLoaderController`):** turning `visible` on immediately sets `active = true` (`this.set('active', this.data.visible)` inside `applyTimer()`), so *showing* is instant. Turning `visible` off does not immediately clear `active` — `startTimer()` checks how long the loader has been visible (`Date.now() - this.timing`); if that's under `minimum`, it delays via `restartTimer()` until `minimum` has elapsed, *then* re-runs `startTimer()`, which finally schedules the actual `active = false` after `debounce` more milliseconds. Net worst-case hide delay is roughly `minimum + debounce` (240ms with the defaults) after `visible` goes false, not `debounce` alone.
- Because the entire visible/active distinction is timer-driven rather than purely reactive, rapidly toggling `visible` from application code (e.g. inside a fast polling loop) can keep `active` pinned `true` far longer than any single `visible=true` window actually lasted.
- `NLoaderData.classList` only ever adds the plain `n-load` class (no `n-load-{type}`/`n-load-{size}` variant class) — `type`/`size` styling is expected to be implemented in CSS purely off the standard `n-type-{value}`/`n-size-{value}` classes from `classRoot()`, same as every other component using those mixins.

## Related components

- None directly — `load`/`n-load` is also a shared `Props.Load` boolean used by many other components (see concepts.md `BaseProps.ts`) to show their *own* inline loading state; `NLoader` is the standalone wrapper version of the same visual class.

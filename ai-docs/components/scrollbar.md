# NScrollbar

A drop-in scroll container that hides the native scrollbar and renders custom draggable overlay track(s) instead, tracking content size via `ResizeObserver`/`MutationObserver`.

## Import / Registration

Registered globally by `src/scrollbar/index.ts` (`App.component(NScrollbar.name, NScrollbar)`), alongside `NVirtualbar` from the same group index. Source: `src/scrollbar/js/scrollbar/{NScrollbar,NScrollbarController,NScrollbarData,NScrollbarView}.ts`, plus the shared runtime `src/scrollbar/js/handler/{NScrollbarElement,NScrollbarHelper}.ts` (also used by `NVirtualbar`, see `virtualbar.md`).

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `overflowX` | `[Boolean]` | `true` | local (`NScrollbar.ts`) | Enables the horizontal overlay track (`n-overflow-x` class) and appends the `.n-scrollbar-h` bar element. |
| `overflowY` | `[Boolean]` | `true` | local (`NScrollbar.ts`) | Enables the vertical overlay track (`n-overflow-y` class) and appends the `.n-scrollbar-v` bar element. |
| `wrapClass` | `[String]` | `':bem__wrap'` | local (`NScrollbar.ts`) | Class applied to the innermost wrapper `<div>` (around the default slot). `:bem` is replaced with the component's BEM root (`n-scrollbar`), so the literal default resolves to `n-scrollbar__wrap`. |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `ready` | `this` (the `NScrollbarController` instance) | `NScrollbarController.onMounted()` constructs the underlying `NScrollbarElement` with `onReady: () => this.emit('ready', this)`, which `NScrollbarElement`'s constructor calls synchronously after it finishes its initial `makePseudo()`/`detectRect()`/`observeBox()` setup. |
| `scroll` | — | Declared in `emits: ['ready', 'scroll']`, but `NScrollbarController` never calls `this.emit('scroll', ...)` anywhere. <!-- UNVERIFIED / apparent dead declaration --> The actual scroll signal is a plain DOM `CustomEvent` named `virtualscroll` fired on `window` by `NScrollbarElement.fireScroll()` (throttled via `Run.framerate(..., 24)` on the content's native `scroll`/`wheel` events) — listen for that on `window`, not a Vue `@scroll` handler on `<n-scrollbar>`. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The scrollable content, rendered inside `.n-scrollbar-content > [wrapClass]`. |

## Exposed methods

None via `pass()`/`context.expose` — `NScrollbar.ts`'s `setup()` calls no `ncx.pass(...)`. However, `NScrollbarController` does define two public instance methods, reachable from a parent through the `ncx(refKey)` mechanism (`ProtoController.ncx()`, see concepts.md) on a template ref, exactly as real call sites in this codebase do (e.g. `NSelectController`/`NDurationpickerController` calling `this.ncx('scrollbar')?.scrollTo(...)`):

- `scrollTo(selector, options = {})` — scrolls the viewport just enough to bring the element matching `selector` (resolved via `this.dom('el').find(selector)`) into view, with an optional `padding` (default `0`) kept clear below it. No-ops (with a `console.warn`) if the element or the viewport isn't found/ready.
- `scrollCenter(selector, options = {})` — same lookup, but centers the target element in the viewport instead of just bringing it into view.

## Minimal example

```vue
<template>
  <n-scrollbar style="max-height: 300px;">
    <p>Long content that needs to scroll…</p>
  </n-scrollbar>
</template>
```

## Realistic example

Modeled on `demos/flex-basis.html` and `demos/test.html` — constraining both axes, and combining with `NResizer` for a resizable scrollable region:

```vue
<template>
  <n-scrollbar style="max-height: 200px; max-width: 200px;">
    <div style="width: 500px;">
      Wide content that scrolls both horizontally and vertically.
    </div>
  </n-scrollbar>

  <n-scrollbar>
    <div style="width: 1800px;">
      <n-resizer direction="right" flex="0 0 60%" style="height: 200px;">
        Resizable content
      </n-resizer>
    </div>
  </n-scrollbar>
</template>
```

## Required composition

None — `NScrollbar` is a standalone wrapper; it just needs default-slot content wider/taller than its own box to show a track.

## Common mistakes

- Binding `@scroll="..."` on `<n-scrollbar>` expecting it to fire — the declared `scroll` emit is never actually dispatched; listen for the `virtualscroll` `CustomEvent` on `window` instead (or measure scroll position yourself via a template ref into the slotted content).
- Calling `.scrollTo()`/`.scrollCenter()` on a plain template ref (`$refs.bar.scrollTo(...)`) — these are Controller methods, not exposed via `pass()`, so they're only reachable through the `ncx()` resolution path (`this.ncx('bar')?.scrollTo(...)` from inside another component's own Controller), not as a directly callable method on the component's public instance from arbitrary consumer code.
- Expecting `wrapClass` to replace the whole class list — it's a single class string with a `:bem` token substitution, not a `class` object/array merge.

## Gotchas

- The custom scrollbar tracks are **not** rendered by Vue — `NScrollbarElement` builds and manages `.n-scrollbar-spacer`/`.n-scrollbar-h`/`.n-scrollbar-v` as raw DOM nodes (`Dom.make`) appended directly to the root element, entirely outside the Vue render tree. Inspecting the rendered VDOM won't show them.
- `NScrollbarHelper.detectNative()` runs once at module load and flags `native = true` when the OS/browser already reserves layout space for scrollbars (offsetHeight/Width differ from clientHeight/Width in the *absence* of a scrollbar) — in that case `n-scrollbar--native` is added and the custom track styling defers to the platform's own bars via CSS, without changing the Vue-facing API.
- `overflowX`/`overflowY` only gate whether the corresponding *drag handle bar* is appended to the DOM (`if (overflowX) this.hbar.appendTo(portal)`) — they do not set `overflow-x`/`overflow-y` CSS directly; actual scroll capability still depends on the component's own CSS and content sizing.
- Destruction order matters if you unmount quickly after mount: `onBeforeUnmount` calls `this.scrollbar.destroy()` unconditionally, which will throw if `onMounted` never ran (e.g. component destroyed before its first paint) since `this.scrollbar` would still be `undefined`.

## Related components

- `NVirtualbar` (`virtualbar.md`) — shares the same underlying `NScrollbarElement`/`NScrollbarHelper` runtime, adding item virtualization on top.
- `NResizer` (`resizer.md`) — commonly nested inside an `NScrollbar` for resizable scrollable panels (see `demos/test.html`).
- `NSelect`, `NDurationpicker`, `NDraglist` — internally hold an `NScrollbar`/`NVirtualbar` child and drive it via `this.ncx('scrollbar')?.scrollTo(...)` / `this.ncx('virtualbar')?.scrollTo(...)`.

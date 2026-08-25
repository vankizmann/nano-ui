# NVirtualbar

A virtualized list/grid scroller — renders only the visible slice of a large `items` array (plus a fixed spacer for total scroll height), reusing `NScrollbar`'s custom-track runtime.

## Import / Registration

Registered globally by `src/scrollbar/index.ts` (`App.component(NVirtualbar.name, NVirtualbar)`), alongside `NScrollbar` from the same group index. Source: `src/scrollbar/js/virtualbar/{NVirtualbar,NVirtualbarController,NVirtualbarData,NVirtualbarView}.ts`, plus the shared runtime `src/scrollbar/js/handler/{NScrollbarElement,NScrollbarHelper}.ts` (see `scrollbar.md`).

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `emptyText` | `String` | `Locale.trans('No items')` | `Props.EmptyText` (`TextProps.ts`) | Passed to the built-in `n-empty-icon` (via `ProtoView.empty()`) when `items` is empty. |
| `emptyProps` | `Object` | `{ inline: false }` | `Props.EmptyPropsStacked` (`BaseProps.ts`) | Extra props forwarded to `n-empty-icon` in the empty state. |
| `items` | `[Array]` | `() => []` | local (`NVirtualbar.ts`) | The full dataset. Each visible entry is passed to the default slot as `{ value, index }`. |
| `grid` | `[Boolean]` | `false` | local (`NVirtualbar.ts`) | Switches from a single-column virtualized **list** to a virtualized **grid** — columns per row are computed as `Math.floor(containerWidth / itemWidth)`, and rows (not individual items) become the virtualization unit. |
| `threshold` | `[Number]` | `101` | local (`NVirtualbar.ts`) | If the total row/item count is below this threshold, virtualization is skipped entirely — the full `state` range (`{ start: 0, end: total }`) is rendered at once. |
| `itemHeight` | `[Number]` | `34` | local (`NVirtualbar.ts`) | **Fixed pixel height per item/row.** All virtualization math (visible-range calculation, absolute `top` offsets via `item.index * itemHeight`, total spacer height) assumes this constant — variable-height items are not supported. |
| `itemWidth` | `[Number]` | `120` | local (`NVirtualbar.ts`) | **Fixed pixel width per item, used only when `grid` is `true`** — determines how many columns fit per row (`Math.floor(width / itemWidth)`) and is exposed as the CSS custom property `--n-item-width` on the inner wrapper. |
| `overflowX` | `[Boolean]` | `true` | local (`NVirtualbar.ts`) | Same meaning as `NScrollbar`'s `overflowX` (horizontal track). |
| `overflowY` | `[Boolean]` | `true` | local (`NVirtualbar.ts`) | Same meaning as `NScrollbar`'s `overflowY` (vertical track). |
| `wrapClass` | `[String]` | `':bem__wrap'` | local (`NVirtualbar.ts`) | Same `:bem`-token wrapper class as `NScrollbar` (`n-scrollbar__wrap` by default — note the BEM root here is still `n-scrollbar`, see Gotchas). |
| `scrollPortal` | `[Boolean]` | `false` | local (`NVirtualbar.ts`) | Forwarded to `NScrollbarElement` — when `true`, the drag-bar elements are appended to the nearest ancestor `.n-scrollbar` instead of this component's own root (for cases where `NVirtualbar` is nested inside another scroll container that should own the visible track). |

**Item-sizing props, summarized:** `itemHeight` (required mental model: every row is exactly this tall) and, only in grid mode, `itemWidth` (determines column count) — both `Number`, pixel values, fixed (not per-item/dynamic).

## Events

| Event | Payload | Fired when |
|---|---|---|
| `ready` | `this` (the `NVirtualbarController` instance) | Same mechanism as `NScrollbar`: `NScrollbarElement`'s `onReady` callback runs `this.buildState()` (initial visible-range calculation) then `this.emit('ready', this)`. |
| `scroll` | — | Declared in `emits: ['ready', 'scroll']` but never actually fired via `this.emit(...)` — same dead declaration as `NScrollbar`. Use the DOM `virtualscroll` `CustomEvent` on `window` (fired by the shared `NScrollbarElement.fireScroll()`), or the `ready`-scoped controller's own `buildState()`-driven `state` if you need visible-range info. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | `{ value, index }` | Rendered once per visible item (list mode) or once per visible item within a visible row (grid mode). `value` is the raw entry from `items`; `index` is its absolute position in the full array. |

## Exposed methods

`ncx.pass({ 'scrollTo': 'scrollTo' })` in `NVirtualbar.ts`'s `setup()` — a template ref exposes:

- `scrollTo(index)` — scrolls the viewport so the item at `index` (negative indexes count from the end, e.g. `-1` for the last item) is visible, accounting for `itemHeight` and the current `grid` column count (`state.grid`). No-ops (`console.warn`) if the viewport isn't ready yet.

## Minimal example

```vue
<template>
  <n-virtualbar :items="items" style="height: 300px;">
    <template #default="{ value }">
      <div style="padding: 0 15px; line-height: 30px;">{{ value.label }}</div>
    </template>
  </n-virtualbar>
</template>
```

## Realistic example

Modeled on the `NVirtualbar`/`NVirtualscroller` sections of `demos/overview.html` (list mode plus a grid-mode variant with a taller fixed item height):

```vue
<template>
  <n-virtualbar
    ref="virtualbar"
    :items="virtualData"
    style="height: 500px;"
  >
    <template #default="{ value }">
      <div style="padding: 0 15px; line-height: 30px;">{{ value.label }}</div>
    </template>
  </n-virtualbar>

  <n-virtualbar
    :items="virtualData"
    :grid="true"
    :item-height="100"
    style="height: 500px;"
  >
    <template #default="{ value }">
      <div style="padding: 0 15px; line-height: 30px;">{{ value.label }}</div>
    </template>
  </n-virtualbar>
</template>

<script setup>
import { ref } from 'vue';
const virtualbar = ref(null);
// virtualbar.value.scrollTo(2000)
</script>
```

## Required composition

None — `NVirtualbar` is a standalone component; it just needs a fixed/constrained height (via CSS) to actually virtualize (its visible range is computed from `viewport.clientHeight`).

## Common mistakes

- Giving items variable heights (e.g. via CSS `min-height` or wrapping content) and expecting correct scroll positioning — every offset calculation assumes a constant `itemHeight`; visually taller items will overlap/misalign against the next absolutely-positioned row.
- Forgetting `style="height: …"` (or an equivalent CSS height) on `<n-virtualbar>` — with no bounded height the viewport's `clientHeight` calculation in `buildState()` degrades and the visible-range math becomes unreliable.
- Setting a very large `threshold` expecting better performance — a *larger* threshold means *more* items get skip virtualization and render all at once; lower it to force virtualization sooner for large lists.
- Not providing `itemWidth` in `grid` mode — column count is `Math.floor(containerWidth / itemWidth)`, so leaving the default `120` when items are actually wider/narrower produces mismatched columns.

## Gotchas

- **The BEM root class is still `n-scrollbar`, not `n-virtualbar`.** `NVirtualbarView.bem = 'n-scrollbar'` (only `vem = 'n-virtualbar'` is distinct, used for `__inner`/`__row`/`__item` part classes) — `NVirtualbarData.classList` adds a literal `'n-virtual'` marker class alongside the shared `n-scrollbar` root class, and `wrapClass`'s default `:bem__wrap` token resolves to `n-scrollbar__wrap`, exactly like plain `NScrollbar`.
- List mode always renders a `first` node (`index: 0`) and a `last` node (`index: state.total - 1`) *in addition to* the computed visible slice, even if they fall outside the current visible range — this is intentional (keeps anchor rows measurable/keyed for layout), not a bug in the slice math.
- `buildState()` bails out early (renders the *entire* list with no windowing) whenever `total * grid < threshold` — for small lists this component behaves exactly like a plain `v-for`, with no virtualization overhead avoided or incurred.
- Rapid wheel/scroll events trigger `startWatch()`, which polls `buildState()` every 15ms via `Run.interval` for up to 2 seconds after the last scroll activity stops — this is a deliberate "settle" window, not a bug causing extra renders while actively scrolling.
- `scrollPortal` only affects where the *drag-bar* elements are appended (looked up via `.el.parent().upnode('.n-scrollbar')`); it does not change which element actually scrolls.

## Related components

- `NScrollbar` (`scrollbar.md`) — the non-virtualized counterpart; both share `NScrollbarElement`/`NScrollbarHelper`.
- `NEmptyIcon` (`empty-icon.md`) — rendered automatically (via `ProtoView.empty()`) when `items` is empty.
- `NDraglist`, `NSelect`, `NTable` — internally embed an `NVirtualbar`/`NScrollbar` and drive it programmatically via `this.ncx('virtualbar')?.scrollTo(index)`.

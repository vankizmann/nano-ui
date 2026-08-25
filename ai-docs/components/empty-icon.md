# NEmptyIcon

A small "no data" placeholder — an icon slot plus optional text — rendered automatically by other components' empty states via `ProtoView.empty()`, and usable directly.

## Import / Registration

Registered globally by `src/empty/index.ts` (`App.component(NEmptyIcon.name, NEmptyIcon)`). Source: `src/empty/js/empty-icon/{NEmptyIcon,NEmptyIconController,NEmptyIconData,NEmptyIconView}.ts`. See concepts.md for `ProtoView.empty(options)`, which is how most consumers actually reach this component (as `<n-empty-icon>` resolved via `this.comp(...)`, not hand-authored in templates).

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | See concepts.md "Type and Size are open strings". |
| `image` | `[String]` | `'default'` | local (`NEmptyIcon.ts`) | Adds a `n-empty-icon--{image}` modifier class (`NEmptyIconData.classList`). No built-in modifier styling ships for any value in `src/empty/css/empty-icon.scss` (only the `--inline` modifier for the `inline` prop exists there) — treat `image` as a hook for consumer-supplied CSS/background-image variants, not a closed set of shipped looks. |
| `inline` | `[Boolean]` | `false` | local (`NEmptyIcon.ts`) | Lays the icon and text out in a row (`flex-direction: row`, smaller icon box) instead of the default stacked column layout. This is exactly what `Props.EmptyPropsInline`/`Props.EmptyPropsStacked` (concepts.md) set via the `emptyProps` prop on a *consuming* component (`{ inline: true }` vs `{ inline: false }`). |
| `emptyText` | `[String]` | `null` | local (`NEmptyIcon.ts`) | **Not** the shared `Props.EmptyText` mixin — this is its own locally-declared prop with a plain `null` default (no automatic `Locale.trans('No items')` fallback at the prop-default level). The raw value is still passed through `Locale.trans()` at render time in `NEmptyIconView.body()` if non-empty. |

## Events

None — `emits: []` in `NEmptyIcon.ts`.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `icon` | none | Rendered inside `.n-empty-icon__type` — the icon/graphic area. Empty by default (no fallback icon is rendered if omitted); consuming code typically leaves this empty and styles `.n-empty-icon__type` via the `image` modifier class instead, or fills it with an `<i class="n-icon ...">`/image explicitly. |
| `default` | none | Fallback body text, rendered inside `.n-empty-icon__text` **only when `emptyText` is empty** (`NEmptyIconView.body()`: `emptyText` takes priority over the `default` slot when both are present). |

## Exposed methods

None — no `pass()`/`context.expose` call in `NEmptyIconController` or `NEmptyIcon.ts`.

## Minimal example

```vue
<template>
  <n-empty-icon empty-text="No items"></n-empty-icon>
</template>
```

## Realistic example

`NEmptyIcon` has no direct usage in `demos/` — it's invoked internally by other components' empty states. This mirrors that path (`ProtoView.empty()`, see concepts.md), which any component extending `ProtoView` can call from its own render tree, e.g. inside a custom list/table View:

```ts
// inside a custom N<Comp>View extends ProtoView
body() {
    const { data } = this.scope;

    if ( !data.items.length ) {
        return this.empty({ inline: false });
    }

    return this.list(data.items);
}
```

Direct template usage, matching what `ProtoView.empty()` produces under the hood:

```vue
<template>
  <n-empty-icon :empty-text="'No results found'" :empty-props="{ inline: true }" v-bind="emptyProps"></n-empty-icon>
</template>
```

## Required composition

None — `NEmptyIcon` is a leaf component with no required parent/child wiring.

## Common mistakes

- Expecting `emptyText`'s default to already be a translated `'No items'` string like other components' `emptyText` props (`Props.EmptyText`) — `NEmptyIcon`'s own `emptyText` prop defaults to plain `null`; the `'No items'` default lives on the *consuming* component's own `emptyText` prop (e.g. `NVirtualbar`), which is what actually gets passed down via `ProtoView.empty()`.
- Expecting the `default` slot and `emptyText` to combine (e.g. `emptyText` as a heading plus slot content below) — only one is ever rendered; `emptyText`, when non-empty, fully replaces the `default` slot.
- Setting `image="illustration"` (or any custom value) and expecting a built-in graphic to appear — no shipped CSS backs any `image` value in this repo; you must supply your own `.n-empty-icon--illustration` CSS rule (e.g. a `background-image`) for it to render anything visible.

## Gotchas

- **This is the component behind every other component's empty state.** `ProtoView.empty(options)` (inherited by every `View` subclass) renders `<n-empty-icon>` with props built as `{ emptyText: scope.get('emptyText'), ...scope.get('emptyProps'), ...options }` — i.e. it reads `emptyText`/`emptyProps` off the *calling* component's own props, not off `NEmptyIcon`'s. Confirmed callers: `NVirtualbar`, `NSelect`, `NCascader`, `NInfo`, `NDurationpicker` (grep `this.empty(` under `src/`).
- `.n-empty-icon__type` has no intrinsic content — it's a plain box (`display: block`, sized via CSS) with a `content: '\00a0'` spacer pseudo-element purely to preserve its aspect ratio (`padding-bottom: 100%` trick), not a default icon glyph. If nothing is passed via the `icon` slot and no CSS background is set for the current `image` value, the icon area renders as an invisible empty square.
- `.n-empty-icon.n-disabled .n-empty-icon__type { display: none; }` — if a consuming component's own `disabled`/`superDisabled` state ends up applied to `<n-empty-icon>` itself (e.g. via `emptyProps`), the icon area disappears entirely while the text remains.

## Related components

- Every list/select/table-like component with an `emptyText`/`emptyProps` pair (`NVirtualbar`, `NSelect`, `NCascader`, `NInfo`, `NDurationpicker`, etc.) — see concepts.md's `ProtoView.empty()` section.

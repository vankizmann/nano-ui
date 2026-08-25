# NTabsItem

A single tab panel + header declared as a child of `NTabs`; identified by its `name` prop, which is matched against `NTabs`' `modelValue`.

## Import / Registration

Registered globally by `src/tabs/index.ts` as `NTabsItem` (`<n-tabs-item>`), alongside `NTabs`. See `ai-docs/components/tabs.md` — the two are always installed together.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `sort` | `[Number, String]` | `null` | own (`NTabsItem.ts`) | Sort key used by `NTabs` to order tabs (`Arr.sort(this.childs, 'data.sort')` in `NTabsController.updateTabs()`). |
| `name` | `String` | `'default'` | own | **The tab key.** Matched 1:1 against `NTabs`' `modelValue`/`update:modelValue` string. This is the prop that identifies which tab an `NTabsItem` represents. |
| `label` | `String` | `null` | own | Text shown in the tab header (rendered as `<span>{{ label }}</span>` by `NTabsItemView.header_label()`). |
| `icon` | `String` | `null` | own (redeclared here, **not** `Props.Icon` from the shared mixin — see Gotchas) | Icon shown in the tab header, rendered via `this.icon(data.icon)` only if non-empty. |
| `scrollbar` | `Boolean` | `null` | own | Whether the panel content is wrapped in an `n-scrollbar` component. `null` means "inherit from parent `NTabs`' `scrollbar` prop" (one-time copy at setup, see tabs.md Gotchas). |
| `lazy` | `Boolean` | `null` | own | Whether the panel defers rendering until first activated. `null` inherits from `NTabs`' `lazy` prop the same way. |
| `keep` | `Boolean` | `null` | own | Whether the panel stays mounted after being deactivated once shown. `null` inherits from `NTabs`' `keep` prop the same way. |

`NTabsItem` declares **no props from the shared `Props` mixins** at all (not even `Props.Icon` — its `icon` prop is a plain re-declaration with a different default: `null` here vs `''` for `Props.Icon`).

## Events

| Event | Payload | Fired when |
|---|---|---|

None — `NTabsItem.ts` declares `emits: []`. State changes go through the parent: `NTabsItemController.superOpen()` calls `tabs?.superToggle(name)`, which is what actually triggers `NTabs`' `update:modelValue`.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The tab panel's body content. Rendered via `this.slot('default')` in `NTabsItemView.default()`. |

Only one slot exists on `NTabsItem`. There is **no separate "label/header" slot** — the header's icon and label are built entirely from the `icon`/`label` *props* (`NTabsItemView.header()`/`header_icon()`/`header_label()`), not from a slot. <!-- Confirmed by reading NTabsItemView.ts in full: only `this.slot('default')` appears anywhere in the file. -->

## Exposed methods

None. (No `pass(...)`/`ctx` exposure calls in `NTabsItemController`.)

## Minimal example

```vue
<template>
  <n-tabs v-model="active">
    <n-tabs-item name="default" label="First">
      First panel content
    </n-tabs-item>
  </n-tabs>
</template>

<script setup>
import { ref } from 'vue';
const active = ref('default');
</script>
```

## Realistic example

Adapted from `demos/overview.html`:

```vue
<template>
  <n-tabs v-model="active">
    <n-tabs-item label="Default" icon="fa fa-ghost">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </n-tabs-item>
    <n-tabs-item name="keep" label="Keep" :keep="true">
      <!-- stays mounted once shown, even after switching away -->
      <n-textarea></n-textarea>
    </n-tabs-item>
    <n-tabs-item name="bar" label="Headline in extra extra extra extra extra extra looooong" :lazy="false">
      <!-- rendered immediately, not deferred until first activation -->
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </n-tabs-item>
  </n-tabs>
</template>

<script setup>
import { ref } from 'vue';
const active = ref('default');
</script>
```

## Required composition

`NTabsItem` **cannot exist outside `NTabs`**, by the same strict rule as `NRadio`/`NRadioGroup` and `NCollapse`/`NCollapseItem`. `NTabsItemController.setup()` injects the parent via `this.injectRef(['tabs', 'NTabs'])` and immediately calls `this.ncx('tabs')` without a null check to read `tabs.data.scrollbar`/`.lazy`/`.keep` — using `NTabsItem` without an ancestor `NTabs` throws rather than degrading gracefully. `NTabsItem` also registers itself with the nearest ancestor `NTabs` on mount (`this.ncx('tabs')?.append(this)`) and deregisters on unmount (`.remove(this)`), and separately `provide`s itself as `'NTabsItem'` so nested `NTabsItem`s (inside a nested `NTabs`) can find their nearest `NTabsItem` ancestor via `injectRef(['tabs-item', 'NTabsItem'])` — used by `superOpen()` to recursively open ancestor tabs before opening itself.

## Common mistakes

- Using `NTabsItem` standalone or under the wrong parent — it will throw when it tries to read `ncx('tabs').data.*` during setup.
- Expecting a header/label slot for custom header markup — there isn't one; only `icon` and `label` props control the header, and the only content slot is `default` (the panel body).
- Two sibling `NTabsItem`s sharing the same `name` — `NTabs` matches tabs by `name` string, so duplicates will be ambiguous (`Arr.has(names, value)` just checks membership, and header click handlers all key off `data.name`).
- Relying on `sort` for a stable/obvious visual order without setting it on every item — items with `sort: null` are still included in `Arr.sort(...)`, so mixing `sort` and un-sorted items may not order the way you expect. <!-- UNVERIFIED: exact tie-break/null-handling behavior of pico-js's Arr.sort when some items have sort: null — not traced into pico-js source. -->

## Gotchas

- `icon` here is **not** the shared `Props.Icon` mixin — it's a component-local prop with a different default (`null` vs `''`) and only feeds the tab header icon, not any built-in icon-position/disabled behavior (`Props.IconPositionBefore`/`IconDisabled` are not present on `NTabsItem` at all).
- `isActive()` (which gates whether the panel content renders at all) is not simply "am I the current tab" — it's `true` if `!data.lazy` (always render) OR `data.keep && data.init` (already been shown once and configured to persist), OR if the name matches the parent's current `value`. So a non-active, non-lazy tab's content is still mounted (just hidden via `isVisible()`'s inline `display: none`), while a lazy `keep` tab, once shown, stays mounted forever afterward even off-screen.
- `data.init` is a one-way flag: once a panel's `default()` render runs and `!data.init`, it's set to `true` immediately (`scope.set('init', true)`) — this is what makes `keep` "sticky" from then on.
- `scrollbar`/`lazy`/`keep` inheritance from `NTabs` happens **once**, at `setup()` time (`if (this.data.X === null) this.set('X', tabs.data.X)`) — changing the parent `NTabs`' `scrollbar`/`lazy`/`keep` prop after mount will not retroactively affect already-mounted `NTabsItem`s that inherited `null`.

## Related components

- `NTabs` — the only valid parent; see `ai-docs/components/tabs.md`.
- `NCollapseItem` — same strict-parent-child + `name`-keyed pattern for an accordion-style component.
- `NRadio` — same strict-parent-child composition rule under `NRadioGroup`.

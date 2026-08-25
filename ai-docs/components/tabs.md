# NTabs

Tabbed container that switches between `NTabsItem` children by a string key, with an animated active-tab indicator.

## Import / Registration

Registered globally by `src/tabs/index.ts` as `NTabs` (`<n-tabs>`), alongside `NTabsItem`. Both are installed together — there is no way to register one without the other via the plugin's `Install()` entry point.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (`BaseProps.ts`) | Shared loading-state flag; see concepts.md. |
| `size` | `String` | `null` | `Props.Size` (`BaseProps.ts`) | Open string. Known styled values: `xs, sm, md, lg, xl`. |
| `type` | `String` | `null` | `Props.Type` (`BaseProps.ts`) | Open string. Known styled values: `primary, secondary, info, warning, danger, success`. |
| `modelValue` | `String` | `'default'` | own (`NTabs.ts`) | The active tab's `name`. Plain `v-model` (see concepts.md v-model conventions — confirmed here directly). |
| `float` | `Boolean` | `false` | own | Adds `n-float` class to root and to each active item's content wrapper (floats the tab header style). |
| `scrollbar` | `Boolean` | `true` | own | Default `scrollbar` behavior inherited by child `NTabsItem`s that don't set their own (see `NTabsItemController.setup()` — item's own `scrollbar` prop defaults to `null` and falls back to this value). |
| `lazy` | `Boolean` | `true` | own | Default `lazy` behavior inherited by child items the same way as `scrollbar`. |
| `keep` | `Boolean` | `false` | own | Default `keep` behavior inherited by child items the same way as `scrollbar`. |
| `dragOpen` | `Boolean` | `false` | own | When `true`, dragging something over an inactive tab's header (`dragenter`) switches to that tab — useful for drag-and-drop workflows. |

`NTabs` does **not** spread `Props.Icon`, `Props.Disabled`, `Props.Color`, or `Props.Clearable` — only `Load`, `Size`, `Type` from the shared mixins.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `(value: string)` | A tab header is clicked/pointer-downed (`NTabsController.superToggle(value)` → `this.update('modelValue', value)`), or — if `dragOpen` is true — something is dragged over an inactive tab header. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | Must contain `NTabsItem` children — this is where all tab panels/headers are declared. Rendered via `this.slot('default')` inside the body wrapper (`NTabsView.body()`). |

## Exposed methods

None. (No `pass(...)`/`ctx` exposure calls in `NTabsController`.)

## Minimal example

```vue
<template>
  <n-tabs v-model="active">
    <n-tabs-item name="default" label="First">
      First panel content
    </n-tabs-item>
    <n-tabs-item name="second" label="Second">
      Second panel content
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
  <n-select v-model="tabsSize" :options="sizes" />
  <n-select v-model="tabsType" :options="types" />
  <n-switch v-model="tabsFloat">Float</n-switch>

  <n-tabs v-model="active" :size="tabsSize" :type="tabsType" :float="tabsFloat">
    <n-tabs-item label="Default" icon="fa fa-ghost">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </n-tabs-item>
    <n-tabs-item name="keep" label="Keep" :keep="true">
      <n-textarea></n-textarea>
    </n-tabs-item>
    <n-tabs-item name="bar" label="Headline in extra extra extra extra extra extra looooong" :lazy="false">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </n-tabs-item>
  </n-tabs>
</template>

<script setup>
import { ref } from 'vue';

const active = ref('default');
const tabsSize = ref('md');
const tabsType = ref('primary');
const tabsFloat = ref(false);

const sizes = { xs: 'XS', sm: 'SM', md: 'MD', lg: 'LG' };
const types = { primary: 'Primary', secondary: 'Secondary', success: 'Success', warning: 'Warning', danger: 'Danger', info: 'Info' };
</script>
```

Note the first `<n-tabs-item>` above omits `name` entirely — it relies on the default `name: 'default'` (from `NTabsItemProps`) matching `NTabs`' default `modelValue: 'default'`, so it's active on initial render with no explicit wiring.

## Required composition

`NTabsItem` **cannot exist outside `NTabs`** — same strict parent/child requirement as `NRadio`/`NRadioGroup` and `NCollapse`/`NCollapseItem`. Mechanically, `NTabsItemController.setup()` calls `this.injectRef(['tabs', 'NTabs'])` and then unconditionally dereferences it (`const tabs = this.ncx('tabs')`, immediately followed by `tabs.data.scrollbar`/`tabs.data.lazy`/`tabs.data.keep` reads) with no null-guard — an `NTabsItem` rendered without an ancestor `NTabs` will throw. Nesting also works: an `NTabsItem`'s content can contain another full `NTabs`/`NTabsItem` tree (see `demos/overview.html`'s `tabs1`/`tabs2` nested example).

## Common mistakes

- Forgetting that `modelValue` must match a child `NTabsItem`'s `name` exactly (string equality via `Arr.has(names, value)`); if it doesn't match any current child name, `NTabsController.updateTabs()` silently falls back to the first sorted child's name instead of throwing.
- Rendering `NTabsItem` outside of `NTabs` — it depends on injected `tabs`/`ncx('tabs')` context and has no standalone fallback.
- Assuming the header row renders when there's only one tab: `NTabsView.header()` returns `null` when `scope.childs.length < 2`, so a single-tab `NTabs` shows no clickable header at all (content still renders via the body slot).

## Gotchas

- The active-tab indicator (`updateIndicator()`) only runs/matters once there are 2+ children (same `childs.length < 2` guard as the header) and is recalculated on a `ResizeObserver` (debounced 50ms) plus after every `updateTabs()` call (`Run.frame`).
- `scrollbar`/`lazy`/`keep` set on `NTabs` are **defaults only** — each `NTabsItem` has its own same-named prop (default `null`) that, if left unset, is filled in once from the parent's value during the item's `setup()` (one-time copy, not a live link) via plain `if (this.data.X === null) this.set('X', tabs.data.X)`.
- `lazy` (per-item, effectively) controls whether the panel is mounted/rendered before it's first activated; `keep` (once activated) keeps the panel mounted/rendered even after switching away. See `NTabsItemController.isActive()`: renders if `!data.lazy || (data.keep && data.init)`, or if the tab is the current active tab.
- <!-- UNVERIFIED: `demos/overview.html`'s first `<n-tabs>` example passes a `:relative="false"` attribute, but no `relative` prop exists anywhere in `NTabsProps`. It is not consumed by NTabs and, since NTabs' root `div` doesn't spread `context.attrs`, likely has no effect at all — probably stale/dead markup in the demo rather than a real prop. -->
- `demos/tabs/index.html` is a legacy Vue 2 demo (loads `vue@2.5.13`) using a `preload` prop on `NTabsItem` that does not exist in the current source — do not treat it as representative of the current API; `demos/overview.html` and `demos/tabs.html` (Vue 3) are the reliable references.

## Related components

- `NTabsItem` — the only valid child; see `ai-docs/components/tabs-item.md`.
- `NCollapse`/`NCollapseItem` — same strict-parent-child pattern, same `GroupController`-based approach for a different (accordion-style) UI.
- `NRadio`/`NRadioGroup` — same strict-parent-child composition rule.

# NTag

A small inline label/chip with an optional icon, styled by `type`/`color`/`size`.

## Import / Registration

Registered globally by `src/visuals/index.ts` as `NTag` (`App.component(NTag.name, NTag)`). Source: `src/visuals/js/tag/{NTag,NTagController,NTagData,NTagView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | Size modifier, see concepts.md "Type and Size are open strings". |
| `type` | `String` (open string; known built-ins: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Styles the tag via `n-type-{type}`. The `demos/overview.html` overview demo also iterates `type` over `['neutral', 'primary', 'secondary', 'success', 'warning', 'danger', 'info']` — **`neutral` is not one of the confirmed built-in styled values listed in concepts.md**. `NTag` itself has no code that special-cases `'neutral'` (unlike `NProgress`, which does map `state === 0` to a hardcoded `'neutral'` type internally — see `progress.md`). Treat `type="neutral"` on `NTag` as an arbitrary open-string value used in the demo, not a confirmed built-in with guaranteed CSS — <!-- UNVERIFIED: whether an `n-type-neutral` CSS rule exists anywhere in the stylesheet source; not checked here since CSS files are out of scope for this pass. --> |
| `color` | `[String, Number]` | `null` | `Props.Color` (`BaseProps.ts`) | Resolved through `Styler.wheel()` into `n-color-{$color}` (see `ProtoData.classRoot()` in concepts.md). Demo uses numeric values (`:color="index+40"`). |
| `icon` | `String` | `''` | `Props.Icon` (`IconProps.ts`) | Icon rendered via `ProtoView.icon()`. Only rendered if truthy (`NTagView` checks `data.iconPosition`, and `ProtoView.icon()` itself no-ops on falsy input). |
| `iconPosition` | `String`, validated in `['before','after']` | `'before'` | `Props.IconPositionBefore` (`IconProps.ts`) | Whether the icon renders before or after the default-slot content. |

## Events

| Event | Payload | Fired when |
|---|---|---|
| — | — | `NTag.ts` declares `emits: []`. There is no interactive/emitting behavior anywhere in `NTagController`/`NTagView` — `NTag` is purely a display component. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The tag's label content, wrapped in a `<span>` inside the root `<div class="n-tag">`. |

## Exposed methods

None. `NTagController` never calls `this.pass([...])`.

## Minimal example

```vue
<template>
  <n-tag type="primary">New</n-tag>
</template>
```

## Realistic example

Adapted from `demos/overview.html` — iterating tag `type`, and iterating numeric `color`:

```vue
<template>
  <template v-for="type in ['neutral', 'primary', 'secondary', 'success', 'warning', 'danger', 'info']">
    <n-tag v-bind="n_tags" :type="type" icon="fa fa-ghost">Foo askd kasjdbnjka sjdkna</n-tag>
  </template>

  <template v-for="(value, index) in Array(30).fill(0)">
    <n-tag v-bind="n_tags" :color="index+40" icon="fa fa-ghost">Foo askd kasjdbnjka sjdkna</n-tag>
  </template>
</template>

<script setup>
import { reactive } from 'vue';
const n_tags = reactive({ size: 'md' });
</script>
```

## Required composition

None — independent, standalone component.

## Common mistakes

- Expecting `type="neutral"` to be a documented built-in styled value: it is used in the demo but is not among concepts.md's confirmed built-in `type` values (`primary`/`secondary`/`info`/`warning`/`danger`/`success`) and `NTagData`/`NTagView` apply no special handling for it — it's just an open-string value passed through to `n-type-neutral`.
- Expecting `icon` alone to control position: `iconPosition` (`'before'`/`'after'`) determines where the icon renders relative to the slot content; the default is `'before'`.
- Expecting an emitted event on click/interaction: `NTag` has no click handlers and an empty `emits` array — it's non-interactive.

## Gotchas

- `color` accepts either a `String` or `Number`; numeric values are resolved through `Styler.wheel()` (see concepts.md `classRoot()`), which is how the demo generates 30 distinct color variants from `index+40`.
- The default-slot content is always wrapped in an inner `<span>` (`NTagView.default()`), separate from the icon element — useful to know if you're targeting the label text with CSS.

## Related components

None — NTag has no composition relationship with NRating, NMessage, or NProgress; documented independently per task scope.

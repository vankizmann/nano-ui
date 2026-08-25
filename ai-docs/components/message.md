# NMessage

A dismissible inline banner/alert box with an optional icon, title, and animated collapse-on-close transition.

## Import / Registration

Registered globally by `src/visuals/index.ts` as `NMessage` (`App.component(NMessage.name, NMessage)`). Source: `src/visuals/js/message/{NMessage,NMessageController,NMessageData,NMessageView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | Size modifier, see concepts.md "Type and Size are open strings". |
| `type` | `String` (open string; known built-ins: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Styles the message via `n-type-{type}`. Demo (`demos/overview.html`) only uses `type="primary"`. |
| `icon` | `String` | `''` | `Props.Icon` (`IconProps.ts`) | Rendered inside a dedicated `.n-message__symbol` wrapper — only rendered at all if `icon` is truthy (`NMessageView.symbol()` returns `null` otherwise). |
| `iconPosition` | `String`, validated in `['before','after']` | `'before'` | `Props.IconPositionBefore` (`IconProps.ts`) | Declared via the mixin, but <!-- UNVERIFIED/dead: `NMessageView` never reads `data.iconPosition` — the icon symbol is always rendered as the first child of `.n-message__wrapper`, before `body()`, regardless of this prop's value. Treat `iconPosition` as currently inert on `NMessage`. --> |
| `modelValue` | `Boolean` | `true` | `NMessage.ts` (own prop) | Controls visibility. `true` = shown/active (adds `n-active` class); the internal close button sets it to `false` via `update()`. Cloned locally via `cloneProp('modelValue')` in `NMessageController.setup()`. |
| `closable` | `Boolean` | `false` | `NMessage.ts` (own prop) | Shows/hides the built-in close (×) button (`NMessageView.close()`). |
| `title` | `String` | `null` | `NMessage.ts` (own prop) | Optional title line, rendered above the default-slot body; also adds a `with-title` class when set. |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `false` | The built-in close (×) button (rendered only when `closable` is `true`) is pointer-pressed (`onPointerdown` in `NMessageView.close()`), calling `scope.update('modelValue', false)`. Note `NMessage.ts` declares `emits: []` — the event still fires functionally through `ProtoController.update()` → `context.emit()`, but is not declared in the component's `emits` option. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The message body content, rendered inside `.n-message__text` (below the title, if any). |

## Exposed methods

None. `NMessageController` never calls `this.pass([...])`.

## Minimal example

```vue
<template>
  <n-message v-model="visible" type="primary" closable>
    Something happened.
  </n-message>
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(true);
</script>
```

## Realistic example

Adapted from `demos/overview.html` — with/without title and icon:

```vue
<template>
  <n-message v-bind="n_tags" type="primary" title="With title">Foo askd kasjdbnjka sjdkna</n-message>
  <n-message v-bind="n_tags" type="primary" icon="fa fa-ghost" title="With title and icon">Foo askd kasjdbnjka sjdkna</n-message>
  <n-message v-bind="n_tags" type="primary">Foo askd kasjdbnjka sjdkna</n-message>
  <n-message v-bind="n_tags" type="primary" icon="fa fa-ghost">Foo askd kasjdbnjka sjdkna</n-message>
</template>

<script setup>
import { reactive } from 'vue';
const n_tags = reactive({ size: 'md' });
</script>
```

## Required composition

None — independent, standalone component.

## Common mistakes

- Relying on `iconPosition` to move the icon after the content: it's declared as a prop (inherited from `Props.IconPositionBefore`) but `NMessageView` never reads it — the icon is always the first element in the wrapper.
- Expecting `emits` to list `update:modelValue`: `NMessage.ts` declares an empty `emits: []` array even though the close button does emit `update:modelValue` at runtime via `ProtoController.update()`. `v-model="visible"` on `<n-message>` still works (Vue only warns about undeclared emits in dev, it doesn't block them), but strict prop/emit validation tooling may flag it.
- Assuming `modelValue: false` unmounts/removes the component from the DOM: it doesn't — it only toggles the `n-active` class and (via the `ResizeObserver` + `--n-message-height` CSS var wiring in `NMessageController`) drives a height-collapse transition. The element stays mounted.

## Gotchas

- `NMessageController` wires a `ResizeObserver` on the root element (`onMounted`) that continuously writes `--n-message-height` as a CSS custom property whenever content size changes (except mid-transition, tracked via `transitionrun`/`transitionend` listeners on the same element) — this is what enables the smooth open/close height animation. The observer is disconnected in `onUnmounted`.
- `modelValue` is cloned locally (`cloneProp('modelValue')`), meaning `NMessageData.model`/`classList` reactively track the prop, but the actual close action writes back through `update()` (the standard prop → v-model round trip) rather than mutating the local clone directly.
- The close button's handler is bound to `onPointerdown`, not `onClick` — relevant if you're attaching your own click-based test/interaction logic on top of it.

## Related components

None — NMessage has no composition relationship with NTag, NRating, or NProgress; documented independently per task scope.

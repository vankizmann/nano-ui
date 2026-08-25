# NPopoverOption

A single clickable menu item rendered inside an `NPopover`'s option list, with an optional icon, and optional auto-close-on-click behavior.

## Import / Registration

Registered globally by `src/popover/index.ts` as `NPopoverOption` (`<n-popover-option>`), alongside `NPopover` and `NPopoverGroup`. All three are installed together — there is no way to register one without the others.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Shared disabled flag; only affects the root `n-disabled` class (see Gotchas — clicks are **not** actually blocked). |
| `icon` | `String` | `''` | `Props.Icon` (`IconProps.ts`) | Icon rendered via `this.icon(data.icon)` (see `ai-docs/icons.md`), before the label `<span>`. |
| `iconPosition` | `String`, validated in `['before', 'after']` | `'after'` | `Props.IconPositionAfter` (`IconProps.ts`) | Note: **this prop is declared but not actually read anywhere in `NPopoverOptionView`** — the icon is always rendered before the label span regardless of its value; see Gotchas. |
| `focus` | `Boolean` | `false` | own (`NPopoverOption.ts`) | Adds the `n-focus` class. Not managed internally — must be set by the consumer (e.g. for keyboard-navigation highlighting). |
| `active` | `Boolean` | `false` | own | Adds the `n-active` class. Not managed internally — must be set by the consumer (e.g. to mark the currently selected item). |
| `clickClose` | `Boolean` | `true` | own | Whether clicking (or double-clicking) this option auto-closes the ancestor `NPopover`. See Gotchas. |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `click` | `(e: MouseEvent)` | The option's root `<div>` receives a native `click` — `NPopoverOptionController.onClick(e)` runs the auto-close logic first (if applicable), then always calls `this.emit('click', e)`. |
| `dblclick` | `(e: MouseEvent)` | The option's root `<div>` receives a native `dblclick` — same auto-close-then-emit pattern via `onDblclick(e)`. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The option's label content, rendered in a `<span>` next to the icon (`NPopoverOptionView.default()`). |

## Exposed methods

None. (No `pass(...)`/`ctx` exposure calls in `NPopoverOptionController`.)

## Minimal example

```vue
<template>
  <n-button>Menu</n-button>
  <n-popover v-model="open">
    <n-popover-option @click="onSelect">
      Item
    </n-popover-option>
  </n-popover>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
function onSelect() { /* ... */ }
</script>
```

## Realistic example

Adapted from `demos/overview.html` (that demo also passes an `image="..."` prop, which doesn't exist on `NPopoverOptionProps` — see Gotchas — omitted below), a dropdown menu built from `NPopoverOption`/`NPopoverGroup`:

```vue
<template>
  <n-button icon="fa fa-paragraph">
    Paragraph
  </n-button>

  <n-popover trigger="click" position="bottom-start">
    <n-popover-option icon="fa fa-paragraph" @click="insertParagraph">
      Demotext
    </n-popover-option>

    <n-popover-group>
      Headings
    </n-popover-group>

    <n-popover-option icon="fa fa-heading" :active="level === 3" @click="setHeading(3)">
      Headline H3
    </n-popover-option>
    <n-popover-option icon="fa fa-heading" :active="level === 4" @click="setHeading(4)">
      Headline H4
    </n-popover-option>

    <!-- keeps the menu open after clicking, e.g. because it opens its own submenu -->
    <n-popover-option icon="fa fa-ellipsis" :click-close="false" @click="toggleSubmenu">
      More options
    </n-popover-option>

    <n-popover-option icon="fa fa-trash" :disabled="!canDelete" @click="removeBlock">
      Delete
    </n-popover-option>
  </n-popover>
</template>

<script setup>
import { ref } from 'vue';

const level = ref(3);
const canDelete = ref(true);

function insertParagraph() { /* ... */ }
function setHeading(n) { level.value = n; }
function toggleSubmenu() { /* ... */ }
function removeBlock() { /* ... */ }
</script>
```

## Required composition

Per this doc's ground truth: **`NPopoverOption` requires `NPopover` as its parent — it cannot be used standalone.** It's meant to be rendered directly (optionally alongside `NPopoverGroup` section dividers) inside an `<n-popover>`'s `default` slot, where clicking it can auto-close the ancestor popover. See Gotchas for what actually happens if this rule is violated.

## Common mistakes

- Using `<n-popover-option>` outside of `<n-popover>` — it's designed as a dropdown-menu item for a popover's content, not a standalone clickable element (see Gotchas for what specifically stops working: only the auto-close behavior, not the click event itself).
- Assuming `disabled` prevents the `click`/`dblclick` handlers from firing — it does not (see Gotchas); it only changes the CSS class.
- Not setting `:click-close="false"` on an option that needs to stay open after being clicked (e.g. one that toggles a nested submenu popover or a form control) — with the default `clickClose: true`, any click closes the ancestor `NPopover` immediately.
- Expecting `iconPosition="before"` to move the icon after the label — it has no effect at all (see Gotchas).

## Gotchas

- **The "requires `NPopover`" rule degrades gracefully rather than breaking.** `NPopoverOptionController.setup()` calls `this.injectRef(['popover', 'NPopover'])`, which resolves to `null` (not a throw) when there's no ancestor `NPopover`. `onClick`/`onDblclick` both guard with `if (popover && this.get('clickClose'))` before calling `popover.ncx.superClose()` — so without an ancestor `NPopover`, the component still renders and still emits `click`/`dblclick` normally; it just silently skips the auto-close call. The composition rule is about preserving the intended dropdown-menu-item behavior, not a hard runtime dependency.
- **`disabled` does not block clicks.** Unlike most nano-ui interactive components, `NPopoverOptionView` never checks `data.disabled`/`superDisabled` before wiring `onClick`/`onDblclick` — the handlers are always attached. `disabled` only adds the `n-disabled` CSS class (via `classRoot()`); actually preventing interaction (e.g. via `pointer-events: none`) is left entirely to CSS, not JS.
- **`iconPosition` is a dead prop here.** `NPopoverOptionProps` spreads `Props.IconPositionAfter` (giving `iconPosition` a default of `'after'`, validated in `['before', 'after']`), but `NPopoverOptionView.default()` always renders `this.icon(data.icon)` immediately before the label `<span>`, regardless of `data.iconPosition`'s value — the prop is declared and validated but never actually consulted anywhere in the View.
- **Auto-close uses `superClose()` with no arguments** (`force: false, silent: false`), i.e. the same as calling the exposed `close()` method on `NPopover` with defaults — it respects the "blocked while something is stacked open on top of it" guard (`Pointer.blocked`), so clicking an option won't force-close a popover that currently has a nested submenu popover open on top of it.
- `demos/overview.html` passes an `image="https://picsum.photos/..."` prop on several `<n-popover-option>`s — this is **not** a declared prop on `NPopoverOptionProps`, and since the component doesn't set `inheritAttrs: false`, it just falls through as an inert `image` attribute on the root `<div>` (no `<img>` is ever rendered from it). Treat it as stale demo markup, not part of the current API.

## Related components

- `NPopover` — the required parent; see `ai-docs/components/popover.md`.
- `NPopoverGroup` — the section-divider counterpart typically used alongside `NPopoverOption` inside the same popover. See `ai-docs/components/popover-group.md`.

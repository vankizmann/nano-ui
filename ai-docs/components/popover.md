# NPopover

Floating, positioned panel anchored to a trigger element (click/hover/right-click), used as the root container for dropdown-menu content (`NPopoverOption`/`NPopoverGroup`) or arbitrary custom content.

## Import / Registration

Registered globally by `src/popover/index.ts` as `NPopover` (`<n-popover>`), alongside `NPopoverGroup` and `NPopoverOption`. All three are installed together by the same plugin entry point (there is no way to register only one).

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (`BaseProps.ts`) | Shared loading-state flag; see concepts.md. |
| `size` | `String` | `null` | `Props.Size` (`BaseProps.ts`) | Open string. Known styled values: `xs, sm, md, lg, xl`. |
| `type` | `String` | `null` | `Props.Type` (`BaseProps.ts`) | Open string. Known styled values: `primary, secondary, info, warning, danger, success`. |
| `theme` | `String` | `'dark'` | `Props.ThemeDark` (`BaseProps.ts`) | Note: `ThemeDark`, not `ThemeNone` — `NPopover` defaults to the dark theme, unlike most components (see concepts.md `Props` table). |
| `position` | `String` | `'bottom-center'` | `Props.PositionBottomCenter` (`PositionProps.ts`) | Full 12-value popover position enum: `top-start, top-center, top-end, bottom-start, bottom-center, bottom-end, left-start, left-center, left-end, right-start, right-center, right-end`. |
| `modelValue` | `Boolean` | `false` | own (`NPopover.ts`) | Open/closed state. Plain `v-model` (see concepts.md v-model conventions — confirmed directly: `ProtoController.update('modelValue', ...)` in `onOpen`/`onClose`). |
| `width` | `Number` | `null` | own | Pixel width of the popped panel. Special value **`-1`** makes the panel match the trigger/target element's exact width (`NPopoverElement.renderBox()`: `if (width === -1) style.width = target.width() + 'px'`) — see Gotchas. |
| `target` | `String` | `null` | own | CSS selector (or element) used as the popover's anchor **and** interaction source. If left `null`, `NPopoverElement`'s constructor defaults it to the DOM element immediately preceding the popover's own root node in the DOM (`Dom.find(el).prev().get(0)`) — see Gotchas. |
| `trigger` | `String` | `'click'` | own | Open string (no validator), but only `'hover'` and `'context'` get distinct handling in `NPopoverElement`; any other value (including the default `'click'`) is treated as a left-click trigger. See Gotchas for exact per-value behavior. |
| `toggle` | `Boolean` | `false` | own | Changes what happens when the trigger is interacted with again while already open — see Gotchas. |
| `scrollbar` | `Boolean` | `false` | own | When `true`, wraps the `default` slot body in an `n-scrollbar` component instead of a plain div. |
| `escapeClose` | `Boolean` | `true` | own | Whether pressing Escape closes the popover (global key listener via `NPopoverHandler`/`Pointer`). |
| `scrollClose` | `Boolean` | `true` | own | Whether scrolling closes the popover — see Gotchas for the exact "inside vs. outside" rule. |
| `multiClose` | `Boolean` | `true` | own | Whether opening this popover force-closes other, unrelated open popovers elsewhere on the page (single-dropdown-at-a-time behavior). Popovers nested inside this one's own content share its "group" and are exempt. |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `(value: boolean)` | The underlying `NPopoverElement` fires its own `'open'`/`'close'` event (from user interaction, programmatic `open()`/`close()`, Escape, scroll, etc.) — `NPopoverController.onOpen()`/`onClose()` call `this.update('modelValue', true/false)`. |
| `open` | none | Immediately after `update:modelValue` is emitted with `true`, in `onOpen()`. |
| `close` | none | Immediately after `update:modelValue` is emitted with `false`, in `onClose()`. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `raw` | none | If present, **completely bypasses** `header`/`default`/`footer` and the built-in frame wrapper — `NPopoverView.frame()` returns `slots.raw()` directly. Used internally by `NPopoverPanel` (see Gotchas) to render a fully custom panel body. |
| `header` | none | Rendered above the body, wrapped in `.n-popover__header`. Only rendered if the slot is present. |
| `default` | none | The main body content. Wrapped in `.n-popover__body` (or an `n-scrollbar` component if `scrollbar` is `true`). |
| `footer` | none | Rendered below the body, wrapped in `.n-popover__footer`. Only rendered if the slot is present. |

The whole `frame()` (header/body/footer, or `raw`) only renders while the popover is open (`data.model` true) — closed popovers render an empty, hidden `n-hidden` root div.

## Exposed methods

Exposed onto the component's public `ctx` via `ncx.pass({ open: 'superOpen', close: 'superClose' })` in `NPopover.ts`'s `setup()` — accessible through a template ref:

| Method | Signature | Behavior |
|---|---|---|
| `open` | `(silent = false)` | Calls the internal `NPopoverElement.open(silent)` directly. `silent: true` skips firing the `onOpen` callback (and therefore the `open`/`update:modelValue` events). |
| `close` | `(force = false, silent = false)` | Calls `NPopoverElement.close(force, silent)`. `force: true` bypasses the internal "blocked while a nested/stacked popover is open on top of it" guard (`Pointer.blocked(uid)`); `silent: true` skips firing `onClose`/events. |

## Minimal example

```vue
<template>
  <n-button>Menu</n-button>
  <n-popover v-model="open">
    Hello from the popover.
  </n-popover>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
```

Note the `<n-button>` immediately precedes `<n-popover>` as a sibling — with no `target` prop set, the popover auto-anchors to (and listens on) whichever element comes right before it in the DOM.

## Realistic example

Adapted from `demos/overview.html`'s dropdown-menu example (that demo also uses an `:always-render="true"` attribute and an `image` prop on `n-popover-option` — neither exists in current source, see Gotchas — both are omitted below):

```vue
<template>
  <n-button icon="fa fa-paragraph">
    Paragraph
  </n-button>

  <n-popover trigger="click" :width="200" type="primary" position="bottom-start" :multi-close="false" :toggle="true">
    <n-popover-option icon="fa fa-paragraph">
      Demotext
    </n-popover-option>
    <n-popover-option icon="fa fa-paragraph">
      Paragraph
    </n-popover-option>
    <n-popover-group>
      Group 02
    </n-popover-group>
    <n-popover-option icon="fa fa-heading">
      Headline H3
    </n-popover-option>

    <!-- a popover nested directly after an option auto-targets that option,
         forming a hover-triggered submenu (see Gotchas) -->
    <n-popover trigger="hover" position="right-start">
      <n-popover-option icon="fa fa-heading">
        Submenu item
      </n-popover-option>
    </n-popover>

    <n-popover-option icon="fa fa-heading">
      Headline H4
    </n-popover-option>
  </n-popover>
</template>
```

## Required composition

`NPopover` has no required parent — it can be used standalone anywhere. It is, however, the **required parent** for `NPopoverGroup` and `NPopoverOption` (see those components' docs).

## Common mistakes

- Expecting `target` to be required — it is optional and, unset, auto-resolves to the previous DOM sibling, which is the common case (a trigger button placed right before `<n-popover>`). Explicit `target` (a CSS selector) is only needed when the trigger element isn't the popover's immediate previous sibling.
- Assuming `trigger` is a closed enum — it's a plain `String`; anything other than `'hover'`/`'context'` silently behaves like `'click'`, so typos (e.g. `trigger="clicked"`) fail silently rather than throwing.
- Treating `width: -1` as an invalid/ignored value — it's a deliberate special case meaning "match the target's width."
- Forgetting `theme` defaults to `'dark'` here (unlike most components, which default `theme` to `null`).

## Gotchas

- **`target` auto-detection**: `NPopoverElement`'s constructor sets `target` to `Dom.find(el).prev().get(0)` when the prop is `null` — i.e., the DOM node immediately before the popover's own (initially in-place, later moved-to-`<body>`) root element at mount time. This is what makes the common `<n-button>...</n-button><n-popover>...</n-popover>` sibling pattern work without an explicit `target`.
- **Nested popovers as submenus**: because of the above, a `<n-popover>` placed as a sibling immediately after an `<n-popover-option>` (both inside an outer `<n-popover>`'s body) auto-targets that specific option, and shares the outer popover's stacking "group" (found via the nearest ancestor `[data-popover]` element) so opening/closing the submenu doesn't fight with the parent's `multiClose` logic. This pattern is inferred directly from `NPopoverElement`'s source and mirrors `demos/overview.html`'s structure, but the demo itself uses some props (`image`, `always-render`) that don't exist in current source — treat the *nesting structure* as reliable, not every prop in that demo.
- **`toggle` semantics**: with `toggle: false` (default), clicking the trigger again while the popover is already open does nothing (`getEventEls` finds the click still inside `target`/the popover itself, so `state()` stays idle) — it only closes via an outside click, Escape, scroll-away, or (for `NPopoverOption`) `clickClose`. With `toggle: true`, clicking the *target/trigger element* again while open closes it, but clicking *inside the popover's own rendered content* does not (`state = src`, where `src` matches only the popover's own element, not the external `target`).
- **`scrollClose` "inside vs. outside" rule**: `NPopoverElement.onScroll()` only keeps the popover open if the scroll event carries `event.detail.target` and that target is contained within the popover's own root element (i.e., a scroll originating from the popover's own internal `n-scrollbar`, which dispatches a custom `virtualscroll` event with `detail.target`). Any plain native `scroll` event (page/ancestor scrolling) has no `event.detail`, so it always closes the popover when `scrollClose` is `true` (the default).
- **`escapeClose`**: Escape only closes the popover when `escapeClose` is `true` (default); when `false`, Escape is a no-op (not a "prevent all closing" flag for other close paths).
- **`NPopoverPanel` is an internal-only base component**: `src/popover/js/popover-panel/NPopoverPanel.ts` defines an `NPopoverPanel` component (BEM `n-popover-panel`) that wraps an `<n-popover>` as a `raw`-slot panel with a display/handle/clear/angle row — but it is **not** registered by `src/popover/index.ts` and never appears as `<n-popover-panel>` in any demo. Its `Controller` is instead used as a **base class** that other components' own controllers extend directly (`NSelectController`, `NCascaderController`, `NDatepickerController`, `NTimepickerController`, `NDurationpickerController`, `NDatetimepickerController` all reference `NPopoverPanelController`/`NPopoverPanelData`/`NPopoverPanelView`) to get a consistent "form-field that opens a popover panel" shape. Do not expect to use `<n-popover-panel>` directly in a template.
- `demos/overview.html`'s popover example passes `:always-render="true"` on `<n-popover>` and `image="..."` on `<n-popover-option>` — neither is a declared prop in current source (`NPopoverProps`/`NPopoverOptionProps`). Since neither component sets `inheritAttrs: false`, these just fall through as inert DOM attributes on the root `<div>`; they have no functional effect. Treat them as stale/leftover demo markup, not part of the current API.

## Related components

- `NPopoverGroup` — a labeled section/divider inside a popover's option list; requires `NPopover` as parent. See `ai-docs/components/popover-group.md`.
- `NPopoverOption` — a clickable menu item inside a popover; requires `NPopover` as parent. See `ai-docs/components/popover-option.md`.

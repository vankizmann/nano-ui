# NButton

A clickable action element (native `<button>` by default) with icon, loading,
and style-modifier support; reach for it for any standalone user action
(submit, trigger, link-styled action) — use `NButtonGroup` only when you need
several controls visually fused into one connected row.

## Import / Registration

Registered globally via `App.use(Install)` from the **button** group index
(`src/button/index.ts`), which calls `App.component('NButton', NButton)`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` | Adds `n-load` root class (no built-in spinner/pointer-lock in this component — purely a CSS hook). |
| `size` | `String` | `null` | `Props.Size` | Open string; known styled values `xs`/`sm`/`md`/`lg`/`xl` (see concepts.md). Adds `n-size-{size}`. |
| `type` | `String` | `null` | `Props.Type` | Open string; known styled values `primary`/`secondary`/`info`/`warning`/`danger`/`success`. Adds `n-type-{type}`. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` | Combined with `superDisabled` (see concepts.md) to set the native `disabled` DOM attribute. |
| `icon` | `String` | `''` | `Props.Icon` | Icon class rendered via `ProtoView.icon()`; see `ai-docs/icons.md`. |
| `iconPosition` | `String`, validated in `['before', 'after']` | `'before'` | `Props.IconPositionBefore` | Whether the icon renders before or after the label. |
| `nativeType` | `String` | `'button'` | local | **Not** the HTML `type` attribute — it is the tag name passed to `h()` as the root element (see Gotchas). |
| `link` | `Boolean` | `false` | local | Adds `n-button--link` modifier class (link-styled button). |
| `glass` | `Boolean` | `false` | local | Adds `n-button--glass` modifier class. |
| `round` | `Boolean` | `false` | local | Adds `n-button--round` modifier class. |
| `square` | `Boolean` | `false` | local | Adds `n-button--square` modifier class **and** suppresses the default-slot content wrapper (see Gotchas). |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `click` | the raw `PointerEvent` | Root element's `pointerdown` fires with `e.which === 1` (left button) — bound via `onPointerdown`, not a native `click` listener. |
| `dblclick` | the raw `MouseEvent` | Root element's native `dblclick` fires. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | Button label/content. Rendered only if the slot is actually supplied **and** `square` is `false` — when `square` is `true`, the wrapping `<span>` is skipped entirely regardless of slot content. The icon (if any) is rendered outside/alongside this and is unaffected by `square`. |

## Exposed methods

None — `NButtonController` never calls `pass()`, so nothing beyond the standard component instance is exposed on a template ref.

## Minimal example

```vue
<n-button>Click me</n-button>
```

## Realistic example

Modeled on confirmed usage in `demos/overview.html`:

```vue
<n-button icon="fa fa-paragraph">
    Paragraph
</n-button>

<n-button type="danger" :glass="true" :link="true" size="xs">
    Delete
</n-button>

<n-button type="primary" @click="notify('primary')">
    Notify
</n-button>
```

## Required composition

None — `NButton` is fully standalone. It is commonly placed inside
`NButtonGroup` (see `ai-docs/components/button-group.md`) or a form-item
`action` slot, but neither is required for it to function.

## Common mistakes

- Assuming `nativeType` sets the HTML `type` attribute (e.g. `submit`/`reset`) — it doesn't. `NButtonView.default()` passes `data.native` (the `nativeType` prop) as the **tag name** to `h()`; no `type` attribute is ever set on the rendered element. The same pattern is used elsewhere in the codebase (e.g. `NPreviewView.ts` sets `nativeType: 'a'` to render an anchor tag).
- Assuming `type="link"` is a valid built-in style — it isn't one of the confirmed built-in `type` values (`primary`/`secondary`/`info`/`warning`/`danger`/`success`). The link-styled look is a separate boolean `link` prop (`n-button--link`), not a `type` value. (An older Vue 2 demo, `demos/button/index.html`, uses `type="link"` and an `outline` prop that no longer exists in this source — treat that demo as stale.)
- Assuming plain `@click` on the component reacts to any click — the emit is gated on `pointerdown` with `e.which === 1`, so keyboard-triggered activation (Enter/Space while focused) does not fire nano-ui's `click` event, only real native browser default-button-activation semantics would (via the native `disabled`/form behavior), not this custom emit.
- Expecting slot text to still render when `square` is `true` — `body()` returns `null` in that case; only the icon shows. Pair `square` with `icon` and no meaningful default-slot content.

## Gotchas

- `load`, `disabled`, `size`, `type` all run through the shared `classRoot()` (see concepts.md) even though only `disabled` has any other effect in this component (native `disabled` attribute via `superDisabled`); `load`/`size`/`type` are purely CSS class hooks here.
- `theme`, `color`, and `clearable` are **not** declared props on `NButton` (no `Props.Theme*`/`Props.Color`/`Props.Clearable` mixin is spread in), so passing them has no reactive effect even though `BaseData`'s getters technically exist on the class.
- `demos/button/index.html` is a stale pre-Vue-3 demo (uses Vue 2 global, an `outline` prop, and `size="small"/"default"/"large"` — none of which exist in current source). Prefer `demos/overview.html` usage as ground truth.

## Related components

- `NButtonGroup` — wraps multiple controls (including `NButton`) into one visually connected row.
- `NFormItem` — commonly hosts `NButton` in its `action` slot; also the source of `superDisabled`'s form-context behavior.

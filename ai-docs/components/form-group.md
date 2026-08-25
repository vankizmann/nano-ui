# NFormGroup

A labeled, optionally collapsible section grouping related `NFormItem`s under a legend/header, and (when nested in an `NFormFrame`) contributing a jump-to-section link in that frame's sidebar.

## Import / Registration

Registered globally by `src/form/index.ts`:

```ts
App.component('NFormGroup', NFormGroup);
```

Source: `src/form/js/form-group/NFormGroup.ts` (+ `NFormGroupController.ts`, `NFormGroupData.ts`, `NFormGroupView.ts`). `NFormGroupController extends GroupController` (it tracks its own `childs`, though nothing in this component's own code reads that list back — see Gotchas). See `ai-docs/concepts.md` for the shared pattern.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `icon` | `String` | `''` | `Props.Icon` (`IconProps.ts`) | Rendered before the label text if non-empty (`NFormGroupView.label_icon()`). |
| `modelValue` | `Boolean` | `true` | `NFormGroup.ts` (own) | The expanded/collapsed state, only meaningful when `collapse: true` — see below. |
| `nativeType` | `String` | `'div'` | `NFormGroup.ts` (own) | Root element tag (`h(data.native, ...)`). |
| `kind` | `String` | `null` | `NFormGroup.ts` (own) | Pushes a `{bem}--{kind}` modifier class. When unset (`null`), falls back to the nearest ancestor `NForm`'s own `kind` prop (`NFormGroupData.superKind`, reads `this.scope.ncx('form')?.get('kind')`) — if there's no `NForm` ancestor either, no modifier class is added. Confirmed styled values (from `src/form/css/form-group.scss`): `classic`, `fieldset`. |
| `align` | `String` | `null` | `NFormGroup.ts` (own) | Pushes a `{bem}--{align}` modifier class if set. **Not** the shared `Props.AlignHorizontal`/`AlignVertical` mixin from `ai-docs/concepts.md` — it's `NFormGroup`'s own plain-string prop with no validator and a `null` default (unlike `NForm`'s `align`, which defaults to `'vertical'`). `demos/form/index.html` (legacy demo) passes `align="horizontal"`. |
| `name` | `String` | `() => Hash.uuid()` | `NFormGroup.ts` (own) | Declared but not read by `NFormGroupController`/`NFormGroupData`/`NFormGroupView` in this commit. <!-- UNVERIFIED: likely intended as a stable identifier for future use (e.g. matching `NTabsItem`/`NCollapseItem` `name` conventions elsewhere in the library), but no such usage found in `src/form/`. --> |
| `label` | `String` | `null` | `NFormGroup.ts` (own) | The section heading text. |
| `grid` | `String \| Number` | `null` | `NFormGroup.ts` (own) | When set, adds `n-grid gap-{grid}` to the body wrapper's class list (`NFormGroupView.body()`), for laying out the default-slot children in a CSS grid. |
| `collapse` | `Boolean` | `false` | `NFormGroup.ts` (own) | Enables the collapse/expand toggle (clicking the header, or calling `superToggle()`/`superOpen()`/`superClose()`) and renders the collapse-angle icon (`NFormGroupView.collapse()`). When `false`, `modelValue` still governs visibility (see below) but there is no way to toggle it from the UI. |

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | `boolean` | Standard v-model write path, fired by `superToggle()`/`superOpen()`/`superClose()` — but **only when `collapse: true`**; all three methods guard on `if (this.data.collapse) { this.update(...) }` and are otherwise no-ops. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none | The group's body content, rendered inside `{bem}__body` (`NFormGroupView.body()`). |
| `action` | none | Rendered inside `{bem}__header`'s `{bem}__action`, next to the label — only if the slot is actually provided (`NFormGroupView.action()` checks `context.slots.action`). Used in `demos/form.html` for a header-corner button: `<template #action><n-button ...>Action</n-button></template>`. |

## Exposed methods

None (`NFormGroup.ts` never calls `ncx.pass(...)`). Internally, `NFormGroupController` defines `superToggle()`, `superOpen()`, `superClose()` (all `collapse`-gated, see Events) and `superView()` (opens any ancestor `NTabsItem`/`NCollapseItem` and smooth-scrolls this group into view — called both by `NFormItem.superView()`'s chain and by `NFormFrame`'s sidebar link click), but none are reachable from a template ref.

## Minimal example

```vue
<template>
  <n-form-group label="Contact">
    <n-form-item label="Name">
      <n-input v-model="form.name" />
    </n-form-item>
  </n-form-group>
</template>
```

## Realistic example

Adapted from `demos/form.html` — a collapsible group with an icon, inside a tab, plus one with an `action` slot:

```vue
<template>
  <n-tabs model-value="general">
    <n-tabs-item name="general" label="General">
      <n-form-group label="Redirect" icon="fa fa-directions" :collapse="true" :model-value="false">
        <n-form-item prop="testbool" label="Testbool">
          <n-switch v-model="form.testbool">Testbool</n-switch>
        </n-form-item>
      </n-form-group>
    </n-tabs-item>
  </n-tabs>

  <n-form-group label="Advanced" icon="fa fa-ghost" type="danger">
    <template #action>
      <n-button type="auto" size="xs">Reset</n-button>
    </template>

    <n-form-item label="Danger zone">
      <n-input />
    </n-form-item>
  </n-form-group>
</template>
```

## Required composition

Per this library's composition rules, `NFormGroup` expects an `NForm` ancestor somewhere in the tree (not necessarily a direct parent). See Gotchas for the precise, source-confirmed nuance: the actual hard structural dependency in `NFormGroupController` is on an ancestor **`NFormFrame`** (via `injectRef(['form-frame', 'NFormFrame'])` + `append(this)`/`remove(this)` on mount/unmount, which is what populates `NFormFrame`'s sidebar link list), while the `NForm` injection (`injectRef(['form', 'NForm'])`) is used only for the optional `kind` style fallback described in the Props table.

## Common mistakes

- **Expecting `collapse="false"` (the default) to hide `NFormGroup`'s toggle icon but still allow collapsing via `v-model`.** With `collapse: false`, `superToggle`/`superOpen`/`superClose` are all no-ops — `modelValue` can still be set directly by the parent (it still governs the `n-hidden` class), but nothing inside the component will ever change it.
- **Passing `legend`/`checkable` props**, seen in the older `demos/form/index.html` (a stale, pre-current-API demo). Neither prop exists on the current `NFormGroupProps` — the equivalent of `legend` is `label`; there is no `checkable` equivalent at all.
- **Assuming `align` behaves like `NForm.align`.** It's a separate, unvalidated plain string prop with a `null` default (see Props) — passing an arbitrary value produces a `{bem}--{value}` class with no guarantee of matching CSS.

## Gotchas

- `NFormGroupController extends GroupController` and does track a live `childs` array (any component that calls `this.append(this)`/appends itself into an injected `'form-group'` — see `NFormItemController.onMounted`: `this.ncx('form-group')?.append(this)`), but nothing in `NFormGroup`'s own `Data`/`View` code reads `this.childs` back. It exists purely so descendant `NFormItem`s have somewhere to register themselves as a side effect of injection — no visible per-group feature (like a group-level "first error" jump) currently consumes it.
- The `kind`/`NForm` relationship is a **soft, cosmetic** dependency only — `NFormGroupData.superKind` degrades gracefully (`this.kind || ncx?.get('kind')`) to no modifier class at all if there is no `NForm` ancestor, rather than throwing or misbehaving.
- The `NFormFrame`/`append` relationship is a **structural** dependency for the sidebar-navigation feature specifically — an `NFormGroup` with no `NFormFrame` ancestor still renders and functions completely normally as a standalone collapsible section, it simply never appears in any sidebar link list (because there is no `NFormFrame` to append to).
- `superDisabled`/`injectRef(['form-item', 'NFormItem'])` (from `ai-docs/concepts.md`) is inherited by every component including `NFormGroup`, but `NFormGroup` never reads `superDisabled` in its own `Data`/`View` code — it has no `disabled` prop of its own and does not visually disable itself based on an enclosing `NFormItem`.

## Related components

- `NForm` (`ai-docs/components/form.md`) — optional ancestor for `kind` fallback.
- `NFormFrame` (`ai-docs/components/form-frame.md`) — required ancestor for the sidebar jump-link feature; `NFormGroup` registers itself into `NFormFrame`'s `childs`.
- `NFormItem` (`ai-docs/components/form-item.md`) — typical direct/descendant content; its `superView()` chain calls this group's `superView()`/opens it when jumping to a field inside a collapsed group.

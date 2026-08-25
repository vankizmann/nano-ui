# NConfig

A JSON/object-driven dynamic renderer: pass a `config` tree describing
components, props, events, and slots, and `<n-config>` renders it via `h()` —
useful for server-driven or fully data-defined UI. Not related to the
`App.use(Install, ...)` install options — see `ai-docs/config.md` for that
distinction.

## Import / Registration

Registered globally via `App.use(Install)` from `src/config/index.ts`
(`App.component('NConfig', NConfig)`).

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `modelValue` | `Object` | `null` | local | The data model made available to bound expressions as `$model`. |
| `extraValue` | `Object` | `null` | local | Extra context data made available as `$extra`. |
| `config` | `Object` | `null` | local | The render tree to interpret. Each key is an "alias" (the tag name to render, e.g. `'div'`, `'n-button'`, or `'my-alias: n-button'` — text after `:` is stripped before resolving the component, letting the same tag repeat under different keys), and each value is either a primitive/render-tree (nested `config`) or an object shaped `{ binds, props, events, content, slots, vIf, vAwait, vShow }`. |

`config` node shape (from `NConfigView.setup()`):

```ts
interface ConfigNode {
  binds?: Record<string, string | { value: string; fallback?: any }>; // two-way bound props: reads/writes into $scope/$model/$extra/$global
  props?: Record<string, any>;   // static or resolved props (see expression rules below)
  events?: Record<string, Function>; // handler always called with `this` = the NConfig-bound `scope` prop
  content?: ConfigNode | ConfigNode[] | string | Function; // default slot
  slots?: Record<string, ConfigNode | Function>;           // named slots
  vIf?: any;    // gate on NConfigController.propExists
  vAwait?: any; // gate on NConfigController.propAwait
  vShow?: any;  // if falsy, sets `style="display: none;"` instead of skipping render
}
```

Expression resolution (`NConfigController.getProp`/`getInput`/`getString`):
- A prop key starting with `!` is treated as a raw function passed through
  as-is (bound to call with `this.data.self` — see `scope` prop below).
- A string value containing `$scope`, `$model`, or `$global` is resolved
  against `{ $scope: <scope prop>, $model: <modelValue>, $extra: <extraValue>, $global: globalThis }`
  via `Obj.get`. Prefixing with `!!` coerces to boolean; `!` alone negates.
- A plain string with no `$`-prefix and no `@` prefix is used as a literal.
  A string starting with `@` is translated via `Locale.trans()` (pico-js
  i18n) — `@` itself is escaped as `\@`.
- A function value is called as `fn.call(this.data.self, this.data.model, fallback)`.

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `scope` | `Object` | `null` | local | The `this` context (`$scope`) used when resolving `!`-prefixed functions/expressions and event handlers. |

## Events

None (`emits: []`).

## Slots

None — `NConfig` has no template-authored slots of its own; its entire
output comes from interpreting the `config` prop.

## Exposed methods

None.

## Minimal example

```vue
<n-config :config="{ div: { content: 'Hello' } }" />
```

## Realistic example

```vue
<n-config
    :model-value="user"
    :scope="this"
    :config="{
        'n-button': {
            props: { type: 'primary', disabled: '$model.locked' },
            events: { click: onSave },
            content: '@Save',
            vIf: '$model.id',
        },
    }"
/>
```

## Required composition

None — standalone.

## Common mistakes

- Assuming `config` is a plain Vue render-fn replacement with normal prop
  binding syntax — it isn't; static-looking prop values are still run
  through `getProp()`'s `$scope`/`$model`/`$global`/`@`-translation rules, so
  a literal string that happens to start with `@` or contain `$model` will
  be interpreted, not passed through literally.
- Forgetting `scope` — event handlers and `!`-prefixed expressions are bound
  to `this.data.self` (the `scope` prop), not to the calling component.

## Gotchas

- `content`/each `slots` entry accepts a bare string (rendered via
  `getString`, so `@`-prefixed strings translate), a function, or a nested
  config node/array — `NConfigView.child()` decides which based on type.
- Built-in raw tags `div`, `a`, `p`, `span`, `iframe` skip `resolveComponent`
  entirely; every other alias must resolve to a globally registered
  component or `NConfigView.setup()` returns `null` silently.

## Related components

None specific — this is a general-purpose dynamic renderer, unrelated to any
other component group.

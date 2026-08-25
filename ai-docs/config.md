# Config

There are two unrelated things named "config" in this codebase — do not
conflate them.

## 1. `App.use(Install, ...)` options — currently inert

`Install` (`src/index.esm.ts`) has this signature:

```ts
export function Install(App, Icons = {}, Settings = {})
```

Confirmed by reading the full function body: **`Icons` and `Settings` are
accepted but never read anywhere inside `Install`, nor passed on to anything
else.** All `Install` actually does is:

- attach `ctor`/`cmer`/`cslo` legacy helpers to `App.config.globalProperties`,
- attach `Notify`/`Alert`/`Confirm`/`trans`/`choice` globals if not already
  present on `App.config.globalProperties` (falling back to `globalThis.*`),
- call every component group's install function (`NanoImports.forEach(m => m(App))`).

**Do not document `App.use(Install, { ...someConfig })` as configuring
locale, default size, default type, z-index, icon prefixes, or anything else
— none of that is implemented.** If you need per-component defaults, set
props explicitly (or via a wrapper component) rather than expecting a global
config object to do it. The parameter exists only for legacy call-site
compatibility (some older integration presumably used to pass something
here); passing anything today has zero observable effect.

If a future version of this library changes `Install`'s body to actually
consume these parameters, this note will be wrong — re-check
`src/index.esm.ts`'s `Install` function body directly if behavior here seems
to contradict what you observe.

## 2. `src/config/` — the `NConfig` component

Unrelated to the above. `src/config/` registers one real Vue component,
`NConfig` (`App.component('NConfig', NConfig)`, confirmed in
`src/config/index.ts`) — see `ai-docs/components/config.md` for its full
prop/usage contract. In short: `<n-config>` is a JSON/object-driven dynamic
render component — you pass it a `config` prop describing a tree of
components/props/events/slots (with `$scope`/`$model`/`$extra`/`$global`
template-variable resolution and `vIf`/`vAwait`/`vShow` conditionals), and it
renders that tree via `h()`. It is not related to installation-time
configuration at all.

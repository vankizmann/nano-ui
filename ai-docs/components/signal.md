# Signal globals: Alert, Confirm, Notify

`Alert`, `Confirm`, and `Notify` are global JS objects (not Vue components) for
firing one-off alert/confirm/notification popups from anywhere in JS — call
`Alert.make(...)`, `Confirm.make(...)`, `Notify.make(...)` directly, no
template tag, no `import`. Each `make()` builds a plain DOM element with
`@kizmann/pico-js`'s `Dom.make`, not a Vue-rendered component tree. See
`ai-docs/concepts.md` for the `ProtoController`/`onSignal`/`fireSignal` pub/sub
bus these globals sit alongside conceptually (cross-component signalling
outside props/emits) — the handlers here don't build on `ProtoController`
themselves (they predate/bypass the Controller/Data/View pattern entirely),
but `Alert`/`Confirm`/`Notify` are exactly the kind of thing that bus exists to
support decoupled triggering of. See `ai-docs/icons.md` for `Styler.icons`'
`alert`/`confirm`/`notify` groups, which supply each one's default status icon.

## Import / Registration

Source: `src/signal/index.ts`. This module's default export (the function
normally passed to `App.use()`/registered per-group) is an **empty function
body** — `export default function (App) { }` — it does nothing. Instead, at
module load time the file runs:

```ts
if ( ! globalThis.Alert )   globalThis.Alert   = NAlertHandler;
if ( ! globalThis.Confirm ) globalThis.Confirm = NConfirmHandler;
if ( ! globalThis.Notify )  globalThis.Notify  = NNotifyHandler;
```

So as long as this module is loaded once (e.g. via the library's main entry),
`Alert`, `Confirm`, `Notify` exist as globals (`window.Alert` in a browser).
There is **no `App.component('n-alert', ...)`-style registration** and no
`<n-alert>`/`<n-confirm>`/`<n-notify>` template tag in the current source —
each is a plain class with a single relevant `static make()` method:

- `Alert` → `NAlertHandler` (`src/signal/js/alert/NAlertHandler.ts`)
- `Confirm` → `NConfirmHandler` (`src/signal/js/confirm/NConfirmHandler.ts`)
- `Notify` → `NNotifyHandler` (`src/signal/js/notify/NNotifyHandler.ts`)

The guard (`if (!globalThis.X)`) means a host app can pre-define its own
`window.Alert`/etc. before nano-ui loads to opt out of this global entirely.

## API

### Alert

| Method | Signature | Returns | Description |
|---|---|---|---|
| `Alert.make` | `make(options: any = {}, type: string = null)` | `undefined` (see Gotchas) | Shows a blocking modal alert with an icon, message, and a single "Okay" button. |

`options` is either a **string** (shorthand for `{ text: options }`) or an
**object** merged over these defaults (`NAlertElement.options`):

```ts
{ uid: null, icon: null, text: null, theme: 'dark', size: null, type: null,
  closable: true, okayText: Locale.trans('Okay') }
```

If the second positional arg `type` is non-null, it overwrites `options.type`
(so `Alert.make('text', 'danger')` and `Alert.make({ text: 'text', type: 'danger' })`
are equivalent). `icon` (if set) overrides the type-derived default icon
entirely — confirmed in `NAlertElement.render()`:
`this.options.icon || Styler.icon(this.options.type, 'alert')`.

### Confirm

| Method | Signature | Returns | Description |
|---|---|---|---|
| `Confirm.make` | `make(options: any = {}, type: string = null)` | `Promise<number>` | Shows a blocking modal with Cancel/Confirm buttons; resolves/rejects based on the user's choice. |

`options` string-shorthand and `type` override behave identically to `Alert.make`
(same `Mix.isString(options)` / `if (type != null) options.type = type` logic
in `NConfirmHandler.make`). Defaults merged in (`NConfirmElement.options`):

```ts
{ uid: null, text: null, theme: 'dark', size: null, type: null,
  cancelText: Locale.trans('Cancel'), confirmText: Locale.trans('Confirm') }
```

**How the yes/no result is delivered — confirmed from `NConfirmElement.promise()`:**
`Confirm.make(...)` returns a `new Promise((resolve, reject) => { ... })`.

- Clicking the **Confirm** button (or the modal being closed with `signal(true)`)
  calls `resolve(1)` — after the modal visually closes (via `Run.frame`).
- Clicking the **Cancel** button, closing the modal via its own close affordance
  (`modalProps.onClose = () => this.signal(false)`), or otherwise triggering
  `signal(false)` calls `reject(0)`.

So it is a **Promise**, not a callback: `await Confirm.make(...)` throws (with
value `0`) on cancel, and resolves to `1` on confirm. A caller that only wants
the "confirmed" path can do `Confirm.make(...).then(onYes)`, but must add a
`.catch()` (or wrap in try/catch) to avoid an unhandled-rejection warning on
cancel — confirmed in `demos/flex-basis.html`'s usage (`.then(...).catch(...)`).

There is no separate "onCancel"/"onConfirm" option in `NConfirmElement.options`
— only the Promise resolve/reject wires up both paths.

### Notify

| Method | Signature | Returns | Description |
|---|---|---|---|
| `Notify.make` | `make(options: any = {}, type: string = null)` | `undefined` (see Gotchas) | Shows a non-blocking, auto-dismissing toast in a positioned stack. |

`options` string-shorthand and `type` override behave the same as the other
two. Defaults merged in (`NNotifyElement.options`):

```ts
{ text: null, theme: null, size: null, type: null, position: null, duration: 4500 }
```

`position` accepts the same 6-value notify-frame set used elsewhere in
`demos/overview.html`'s example (`top-start`, `top-center`, `top-end`,
`bottom-start`, `bottom-center`, `bottom-end`); `NNotifyHandler.frame()`
defaults `position` to `'bottom-start'` when `null`. `duration` is milliseconds
before auto-close (`Run.delay(() => this.close(), duration)`); the toast also
closes early if the user `pointerdown`s on it.

`NNotifyHandler` additionally exposes `create(position)`, `frame(position)`,
and `clear()` as internal helpers for managing the per-position stacking
container (`[data-notify="<position>"]` frame element in `document.body`) —
these aren't meant to be called directly to trigger a notification; use
`Notify.make(...)`.

## Type values

All three read `this.options.type` and resolve an icon via
`Styler.icon(type, '<alert|confirm|notify>')`, whose groups (per
`ai-docs/icons.md`) are keyed `default`, `info`, `success`, `warning`, `danger`
(same set for all three groups). `Styler.icon()` falls back to the group's
`default` icon for `null`/unrecognized `type` values. So:

- **Icon-mapped values** (each gets its own status icon): `info`, `success`,
  `warning`, `danger`.
- Any other string (including `primary`/`secondary`, or omitting `type`
  entirely) renders the `default` icon instead — it does **not** error, it
  just falls back visually.

Separately, `type` also feeds `Styler.bem(...)` for the root element's CSS
class (`n-type-{type}`) — so a "known default" type like `primary` still
produces a styled class (`n-type-primary`) even though its *icon* falls back
to `default`. Treat `type` here the same as elsewhere in nano-ui: an open
string (see `ai-docs/concepts.md`'s "Type and Size are open strings" section),
with `info`/`success`/`warning`/`danger` being the values that additionally
change the icon for these three globals specifically.

## Minimal example

```js
// Alert
Alert.make('Something happened.');

// Confirm
Confirm.make('Are you sure?', 'danger')
    .then(() => console.log('confirmed'))
    .catch(() => console.log('cancelled'));

// Notify
Notify.make('Saved.', 'success');
```

## Realistic example

From `demos/overview.html` and `demos/flex-basis.html`:

```js
// Alert.make(text, type)
methods.alert = function (type) {
    return window.Alert.make(
        'Lorem ipsum dolore Lorem ipsum dolore Lorem ipsum dolore', type
    );
};

// Notify.make(options-object)
methods.notify = function (type) {
    return window.Notify.make({
        text: 'Lorem ipsum dolore Lorem ipsum dolore Lorem ipsum dolore',
        type: type,
        position: randomNotifyPosition(),
    });
};

// Confirm.make(text, type) used as an async gate before an action,
// e.g. NDrawer's beforeClose hook:
data.n_drawer.beforeClose = () => {
    return window.Confirm.make('blabla', 'danger');
};

// Confirm.make(options-object) with .then()/.catch()
methods['showConfirm'] = function () {
    window.Confirm.make({
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr...',
        type: 'danger',
    })
        .then(() => console.log('accept'))
        .catch(() => console.log('cancel'));
};
```

<!-- UNVERIFIED: demos/flex-basis.html's showConfirm example actually calls
`window.Confirm.make({ text, type: 'danger' }, () => { return this.disableConfirm; })`
— passing a function as the second positional argument. Per the confirmed
source (`NConfirmHandler.make(options, type)`), that second argument is only
ever used as `if (type != null) options.type = type`, i.e. it's treated as a
type string, not a callback/guard function. This looks like stale or
experimental demo code that doesn't match the current handler signature —
don't copy the two-argument-with-function-second-arg form; use a plain
`(text, type)` or `(options)` call as shown above. -->

## Common mistakes

- **There is no `<n-alert>`, `<n-confirm>`, or `<n-notify>` template
  component.** `demos/confirm/index.html` contains an `<n-confirm>` tag, but
  that demo is stale relative to current source: `src/signal/index.ts`'s
  install function body is empty, so nothing is ever registered via
  `App.component()`. Use `Confirm.make(...)` (etc.) from JS instead.
- Don't `import { Alert } from '@kizmann/nano-ui'` — these are not module
  exports, they're attached to `globalThis` as a side effect of loading
  `src/signal/index.ts`. Just reference `Alert`/`Confirm`/`Notify` directly
  (or `window.Alert` etc.) once the library has been loaded once.
- Don't treat `Confirm.make(...)`'s rejection as an error condition to log —
  cancelling is an expected path (`reject(0)`); always pair `.then()` with
  `.catch()` (or try/catch around `await`).
- Don't expect `Alert.make(...)`/`Notify.make(...)` to return a handle you can
  close later — see Gotchas.

## Gotchas

- **`Alert.make()` and `Notify.make()` return `undefined`.** `NAlertElement.open()`
  and `NNotifyElement.open()` have no `return` statement, so
  `NAlertHandler.make`/`NNotifyHandler.make` (which `return modal.open()` /
  `return notification.open()`) both hand back `undefined`. Only
  `Confirm.make()` returns something meaningful (the Promise). Don't chain
  `.then()` on `Alert.make()`/`Notify.make()`.
- **No programmatic dismiss API.** None of the three handlers expose a public
  method to close a specific alert/confirm/notification from outside once
  shown — dismissal only happens via: the Alert's Okay button, the Confirm's
  Cancel/Confirm buttons or its modal's own close affordance, or (Notify only)
  the user clicking the toast itself or the `duration` timeout elapsing. There
  is no `Alert.close(uid)` or similar.
- **They mount directly to `document.body`, not through Vue.** `NAlertElement`/
  `NConfirmElement` build a raw DOM tree via pico-js's `Dom.make(...)` and
  `root.appendTo(document.body)` — no Vue component instance, no Teleport.
  Alert/Confirm additionally register with `NModalHandler.append(el, props)`
  (the same modal-stacking system `NModal` uses) so they participate in
  modal backdrop/stacking behavior and get removed via
  `NModalHandler.remove(this.modal)` on close. Notify instead appends into a
  lazily-created, position-keyed frame element (`[data-notify="<position>"]`,
  also directly under `document.body`), which `NNotifyHandler.clear()` removes
  once it has no children left.
- `Alert`'s `closable` option (default `true`) is passed through to the modal
  as `modalProps.closable`; `Confirm` doesn't expose a `closable` option at
  all — its modal is always dismissible via the close affordance, which is
  wired to `signal(false)` (i.e. counts as a cancel, not a no-op).
- `theme` defaults to `'dark'` for both `Alert` and `Confirm` (not `null`/
  inherited), but `Notify`'s `theme` defaults to `null`.

## Related components

- `NModal` (`ai-docs/components/modal.md` if present) — `Alert`/`Confirm` are
  built on the same `NModalHandler.append`/`remove`/`openRun`/`closeRun`
  modal-stacking mechanism.
- `ai-docs/icons.md` — `Styler.icons.alert`/`.confirm`/`.notify` groups and
  `Styler.icon()` resolution used for these three globals' default icons.
- `ai-docs/concepts.md` — `ProtoController`'s `onSignal`/`fireSignal` pub/sub
  bus, the general mechanism these globals are conceptually adjacent to for
  decoupled, non-prop-driven triggering.

# Icons

See `ai-docs/concepts.md` first for the shared `Props.Icon` mixin and
`ProtoView.icon()`.

## Default: pass a full class string, as-is

The `icon` prop (`Props.Icon`, `src/root/js/prop/IconProps.ts`) is a plain
`String` (`default: ''`). It is **not** resolved through any nano-ui prefix
or name-lookup logic. Whatever string you pass is applied almost verbatim.

Confirmed in `ProtoView.icon()` (`src/root/js/proto/ProtoView.ts`):

```ts
icon(props = undefined) {
    if (!Mix.isObj(props)) props = { icon: props };
    if (!props.icon) return null;
    const [icon, classList] = [Obj.pluck(props, 'icon', ''), Obj.pluck(props, 'class', [])];
    props.class = [`n-icon ${icon}`, ...classList].join(' ');
    return h('i', props);
}
```

So `icon="fa fa-ghost"` renders `<i class="n-icon fa fa-ghost">`. This is
exactly the pattern used in `demos/overview.html`:

```html
<n-message type="primary" icon="fa fa-ghost" title="With title and icon">...</n-message>
<n-tag type="primary" icon="fa fa-ghost">...</n-tag>
```

**Default icon set is Font Awesome** — pass the full FA class string for
whichever FA version/style your app loads (e.g. `fa fa-ghost`,
`fa-solid fa-ghost`, depending on the FA version). There is no nano-ui-side
icon name registry to document — for the actual set of available icon names
and their class syntax, use Font Awesome's own icon reference, not this
library's docs.

There is no separate "icon name" vs. "prefix" concept in nano-ui: don't
document `icon="ghost"` as valid, and don't invent a prefix-resolution
mechanism — none exists for the public `icon` prop.

## Overriding the default icon set: `Styler`

nano-ui's *own internal* chrome (the clear/× button, the dropdown angle, the
search icon inside inputs, calendar/clock icons in date/time pickers, the
default icons used by `Alert`/`Confirm`/`Notify`, etc.) is **not** hardcoded
Font Awesome markup — it's resolved through `Styler.icon()`
(`src/root/js/module/Styler.ts`), which is a static, mutable registry:

```ts
static icons = {
    default: { locate, revert, prev, 'prev-first', next, 'next-last', check,
               'angle-left', 'angle-right', 'angle-up', 'angle-down',
               search, times, minus, clock, calendar, duration },
    preview: { default, video },
    alert: { default, info, success, warning, danger },
    confirm: { /* same as alert */ },
    notify:  { /* same as alert */ },
};

static icon(type, group = 'default', fallback = 'default') {
    if (type == null) type = fallback;
    if (Obj.has(this.icons, [group, type])) return Obj.get(this.icons, [group, type]);
    return Obj.get(this.icons, [group, fallback]);
}
```

Every value in `Styler.icons` is currently a Font Awesome class string (e.g.
`'fa fa-angle-down'`). To switch nano-ui's *internal* iconography away from
Font Awesome (a custom sprite set, Material Icons, etc.), mutate this
registry before/after install:

```js
import { Styler } from '@kizmann/nano-ui'; // exported from src/root/index.ts

Styler.icons.default['angle-down'] = 'my-icons my-icons-chevron-down';
Styler.icons.default['times']      = 'my-icons my-icons-close';
// ...or replace whole groups: Styler.icons.default = { ...myIconMap };
```

`Styler` is also reachable at runtime as `globalThis.NStyler` (set at the
bottom of `src/root/js/module/Styler.ts` if not already defined) — useful in
a plain `<script>` global-usage setup with no module imports available.

There is no separate "register a resolver function" API — `Styler.icon()`
itself is the resolver, and `Styler.icons` is a plain object you overwrite by
key. If you need fully custom resolution logic (not just swapping class
strings), monkey-patch `Styler.icon` itself; there's no built-in hook for
that beyond replacing the static method.

**Important distinction:** this override only changes icons nano-ui renders
*itself* (its internal chrome). It has no effect on values you pass to the
public `icon` prop on `NButton`, `NTag`, `NMessage`, etc. — those are always
applied as-is per the "Default" section above, regardless of `Styler` state.

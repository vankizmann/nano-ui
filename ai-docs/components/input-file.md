# NInputFile

A file-picker control composed from a read-only `NInput` (display) and an `NButton` (trigger) wrapping a hidden native `<input type="file">`; reach for this over the other input variants whenever the bound value needs to be one or more native `File` objects rather than text.

## Import / Registration

Registered globally by `src/input/index.ts` as `NInputFile` (`App.component(NInputFile.name, NInputFile)`). Source: `src/input/js/input-file/{NInputFile,NInputFileController,NInputFileData,NInputFileView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | See concepts.md. |
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Same open-string rule. |
| `disabled` | `Boolean` | `false` | `Props.Disabled` (`BaseProps.ts`) | Not read directly by `NInputFileController`/`NInputFileView` (the trigger `NButton` and display `NInput` are not individually given a `disabled` prop), but it still works: `classList` calls the shared `classRoot()` (see concepts.md), which adds `n-disabled` to the root element whenever `superDisabled` is true, and the global rule `.n-disabled:not(.n-draglist-item,.n-resizer) { pointer-events: none; }` (`src/index.scss`) then blocks all clicks inside — including the hidden file input and the trigger button. Effective, but via generic CSS rather than component-specific JS logic. |
| `icon` | `String` | `''` | `Props.Icon` (`IconProps.ts`) | <!-- UNVERIFIED: available via `IconData` but never read in `NInputFileView` — no visible effect found. --> |
| `clearable` | `Boolean` | `false` | `Props.Clearable` (`BaseProps.ts`) | <!-- UNVERIFIED / confirmed non-functional here: `NInputFileView.default()` never calls `this.clear(...)`, unlike `NInput`/`NInputNumber`. Setting `clearable` renders no clear button on this component. --> |
| `clearValue` | `[String, Number, Boolean]` | `null` | `Props.ClearValue` (`BaseProps.ts`) | Same caveat — unreachable without a rendered clear control; `applyClear()` is never triggered by this component's own UI. |
| `modelValue` | untyped (no `type` key), `default: null` | `null` | `NInputFile.ts` (own prop) | See "The modelValue shape" below — this is the one prop on this component you must get exactly right. |
| `multiple` | `Boolean` | `false` | `NInputFile.ts` (own prop) | Enables multi-file selection (sets `multiple` on the native `<input type="file">`) and changes both the `modelValue` shape and the display text pluralization. |
| `placeholder` | `String` | `''` | `NInputFile.ts` (own prop) | <!-- UNVERIFIED: declared and exposed via `NInputFileData.placeholder`, but never passed to the inner `n-input` component or read anywhere in `NInputFileView` — the display `NInput`'s `modelValue` prop is always the resolved file name/count instead. No visible effect found. --> |
| `glass` | `Boolean` | `true` | `NInputFile.ts` (own prop) | Forwarded as the `glass` prop to the inner trigger `NButton` (`this.comp('n-button', { glass: data.glass }, ...)`). |
| `buttonText` | `String` | `'Select file'` | `NInputFile.ts` (own prop) | Text of the trigger button, resolved through `Locale.trans(data.buttonText)` (pico-js i18n) — treat the default as a translation-key lookup, not a fixed literal. |
| `countText` | `String` | `':count File|:count Files'` | `NInputFile.ts` (own prop) | Pluralization template resolved via `Locale.choice(countText, model?.length)` (pico-js i18n pluralization: `singular|plural` split on `\|`) — only used when `multiple` is true. |

### The `modelValue` shape

`modelValue` is **not** a `FileList`, and **not** a URL/filename string. `NInputFileController.updateModel()` (triggered by the hidden native input's `input` event) does exactly this:

```ts
let files = [...this.rel('input')?.files];   // spreads the native FileList into a plain array of File objects

if ( Mix.isEmpty(files) ) {
    return;                                   // no files selected (e.g. user cancelled the picker) -> no update at all, modelValue is left untouched
}

if ( !data.multiple ) {
    files = Arr.first(files);                 // single-select: unwrap to just the first File object
}

this.update('modelValue', files);
```

So, concretely:

- `multiple: false` (the default) → `modelValue` is a single native `File` object (or stays whatever it was before — including the initial `null` — if the selection is empty).
- `multiple: true` → `modelValue` is an `Array<File>` (native `File` objects, in the order the browser reports them).
- The initial/default `modelValue` is `null` — code consuming this component must handle `null` before the user has picked anything, regardless of `multiple`.
- The display `NInput` reads `Obj.get(data.model, 'name')` (the `.name` property off the `File` object, or off the first `File` when computing the count) — this only makes sense for `File`/`File[]`; passing a plain string/URL as `modelValue` yourself will not display as expected.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:modelValue` | a `File` (single) or `File[]` (multiple) — see above | The hidden native `<input type="file">` fires its native `input` event and the resulting `FileList` is non-empty. |

`emits` is declared as exactly `['update:modelValue']` — there is no separate `input`/`change`/`focus`/`blur` re-emission on this component (unlike `NInput`/`NTextarea`/`NInputNumber`).

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| none | — | `NInputFileView` never calls `this.slot(...)`. |

## Exposed methods

None. `NInputFileController` never calls `this.pass([...])`.

## Minimal example

```vue
<template>
  <n-input-file v-model="file" />
</template>

<script setup>
import { ref } from 'vue';
const file = ref(null); // will become a File object once selected
</script>
```

## Realistic example

Adapted from `demos/overview.html` (`n_preview.file` usage):

```vue
<template>
  <n-input-file v-model="preview.file" />
  <p v-if="preview.file">Selected: {{ preview.file.name }} ({{ preview.file.size }} bytes)</p>
</template>

<script setup>
import { reactive } from 'vue';
const preview = reactive({ file: null });
</script>
```

Multi-file variant (not found in demos — built from source props):

```vue
<template>
  <n-input-file v-model="files" :multiple="true" button-text="Select files" />
  <ul v-if="files">
    <li v-for="f in files" :key="f.name">{{ f.name }}</li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';
const files = ref(null); // becomes File[] once selected, still null until then
</script>
```

## Required composition

None required — standalone (it internally composes `NInput` for display and `NButton` for the trigger, but consumers just use `<n-input-file>` as a single tag). Optional: can be placed inside `NButtonGroup` (confirmed composition pairing).

## Common mistakes

- Treating `modelValue` as a `FileList`: it is a plain `File` (single) or `Array<File>` (multiple), already unwrapped from the native `FileList` — do not call `.item(0)` or iterate it as a `FileList`.
- Assuming `multiple: false` always yields the *first* file the user visually selected in the OS dialog: `Arr.first(files)` takes the first entry of the spread `FileList`, whose order is browser/OS-dependent, not necessarily selection order.
- Relying on `clearable`/`clearValue` to work the same way they do on `NInput`/`NInputNumber`: neither is wired up in this component's `View`/`Controller` — see the UNVERIFIED notes in the props table. (`disabled` *does* work, but via the generic `n-disabled`/`pointer-events: none` CSS mechanism, not component-specific logic — see the Props table entry.)
- Expecting selecting the *same* file twice in a row to fire `update:modelValue` again: the hidden `<input type="file">`'s value is never reset by this component, so re-picking an identical file may not fire a native `input` event the second time (standard browser file-input behavior, not something this component works around).

## Gotchas

- The rendered "input" the user sees typing/reading into is actually a disabled, read-only `NInput` (`disabled: true` is hardcoded in `NInputFileView.input()`) showing either the file name (`Obj.get(data.model, 'name')`) or, when `multiple`, a pluralized count string built from `countText`/`Locale.choice`. It is not connected to `modelValue` for writing — only for display.
- The actual file-selection UI is a visually hidden native `<input type="file">`, clicked programmatically via the trigger `NButton`'s `onClick` (`scope.rel('input')?.click()`).
- No built-in way to clear the selection from the rendered UI — `clearable` has no effect (see Common mistakes); clearing must be done by setting `modelValue` to `null` (or `[]`) from the parent yourself.

## Related components

`NInput` (plain string variant, and what this component uses internally for display), `NInputNumber` (numeric variant), `NTextarea` (multi-line variant), `NFormItem` (form-layout wrapper providing labels/validation context).

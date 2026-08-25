# NPreview

An inline thumbnail component for a file/image/video/URL that opens a shared fullscreen lightbox (with prev/next paging across a `group`) when clicked.

## Import / Registration

Registered globally by `src/preview/index.ts` (`App.component(NPreview.name, NPreview)`), which also seeds `globalThis.NPreviewModules = { text: NPreviewFileModule, image: NPreviewImageModule, video: NPreviewVideoModule }`. Source: `src/preview/js/preview/{NPreview,NPreviewController,NPreviewData,NPreviewView}.ts`, `src/preview/js/preview-module/{NPreviewFileModule,NPreviewImageModule,NPreviewVideoModule}.ts`, `src/preview/js/handler/{NPreviewElement,NPreviewHandler}.ts`, `src/preview/js/helper/NPreviewHelper.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `load` | `Boolean` | `false` | `Props.Load` (`BaseProps.ts`) | Standard load-state class from `classRoot()`. |
| `size` | `String` (open string; known: `xs`/`sm`/`md`/`lg`/`xl`) | `null` | `Props.Size` (`BaseProps.ts`) | See concepts.md "Type and Size are open strings". |
| `type` | `String` (open string; known: `primary`/`secondary`/`info`/`warning`/`danger`/`success`) | `null` | `Props.Type` (`BaseProps.ts`) | Same open-string rule. |
| `theme` | `String` | `null` | `Props.ThemeNone` (`BaseProps.ts`) | Root theme class. |
| `file` | `any` | `null` | local (`NPreview.ts`) | The full-resolution source: a `File`/`Blob` (rendered via `FileReader`), a URL string (image/video/pdf/etc.), or a YouTube/Vimeo URL (detected by `NPreviewHelper.youtube`/`vimeo` and rendered as an embedded `<iframe>`). Used for the fullscreen portal. |
| `thumb` | `any` | `null` | local (`NPreview.ts`) | The thumbnail source shown in the inline (non-fullscreen) body. Falls back to `file` if omitted (`safeThumb = thumb ?? file`), and vice versa (`safeFile = file ?? thumb`). |
| `title` | `[String]` | `null` | local (`NPreview.ts`) | Caption rendered under the inline thumbnail (`NPreviewView.title()`); hidden when empty. |
| `index` | `[Number]` | `null` | local (`NPreview.ts`) | This item's position within its `group` for prev/next ordering in the lightbox. If omitted, `NPreviewHandler.append()` assigns `previews.length * 10`. Changing `index` at runtime re-registers the item (`watchProp('index', onChange)` tears down and re-mounts its handler registration). |
| `group` | `[String]` | `() => Hash.uuid()` | local (`NPreview.ts`) | Groups multiple `NPreview` instances into one lightbox gallery — prev/next only cycles items sharing the same `group` string. Defaults to a fresh UUID per instance, i.e. **standalone by default** — set the same `group` string on sibling `NPreview`s to link them. |
| `fit` | `[String]` | `'contain'` | local (`NPreview.ts`) | Inline thumbnail `object-fit`. Confirmed styled values in `src/preview/css/preview.scss`: `contain` (default), `cover`, applied via `n-preview--{fit}`. |
| `mime` | `[String]` | `null` | local (`NPreview.ts`) | <!-- UNVERIFIED: declared prop, but not read anywhere in NPreviewController/Data/View — mime type is instead always derived at render time via `NPreviewHelper.mime(safeFile/safeThumb)`. Appears unused. --> |
| `forceFile` | `[Boolean]` | `false` | local (`NPreview.ts`) | <!-- UNVERIFIED: declared prop, not read anywhere in NPreviewController/Data/View. Appears unused. --> |
| `preview` | `[Boolean]` | `true` | local (`NPreview.ts`) | Enables the click-to-open lightbox and the hover overlay icon. When `false`, the component just renders a static thumbnail with no click handler and no hover affordance. |
| `previewTypes` | `[Array]` | `() => ['text', 'image']` | local (`NPreview.ts`) | Which resolved type categories are allowed to render their *real* thumbnail inline; any type not in this list is forced to `'text'` (generic file display) for the inline body only — see "Module-type selector" below. The fullscreen portal always uses the file's real resolved type regardless of this prop. |
| `showPath` | `[Boolean]` | `true` | local (`NPreview.ts`) | Shows the filename (path tail) in the fullscreen meta list. |
| `linkText` | `[String]` | `'Download file'` | local (`NPreview.ts`) | Label for the fullscreen download link, passed through `Locale.trans()`. |
| `showLink` | `[Boolean]` | `true` | local (`NPreview.ts`) | Shows a download link (`n-button`, `href` = `file`, `target="_blank"`) in the fullscreen meta list. Only rendered when `file` is a string (`Mix.isStr`). |
| `onFocus` | `[Function]` | `null` | local (`NPreview.ts`) | Called (not emitted) when this preview becomes the focused slide in the lightbox — see Events. |

## Module-type selector (`previewTypes` / resolved type)

There is no closed `type`-selector prop on `NPreview` itself; instead each file's display type is *computed* by `NPreviewHelper.type()` from its extension (or detected as a YouTube/Vimeo URL), and only the categories listed in `previewTypes` are allowed to render inline as their real module — the rest are forced to `'text'` for the inline thumbnail.

Full category list produced by `NPreviewHelper.type()` (`NPreviewMimes` map in `src/preview/js/helper/NPreviewHelper.ts`):

- `image` — extensions `jpg, jpeg, gif, svg, png, bmp`
- `video` — extensions `mp4, webm, mov`, plus any detected YouTube/Vimeo URL
- `audio` — extensions `mp3, aac`
- `font` — extensions `woff, ttf, otf`
- `text` — extensions `csv, txt, html`, and the fallback when nothing matches
- `application` — extensions `pdf, doc, xls`

Of these, only three have an actual rendering module registered in `globalThis.NPreviewModules`: `'text'`, `'image'`, `'video'`. `NPreviewView.resolve(type)` looks up `globalThis.NPreviewModules[type]` and **falls back to `'text'`** for any unregistered type — so `audio`, `font`, and `application` files always render through `NPreviewFileModule` (a generic meta list: mime type, path, optional download link), never a native player.

`previewTypes`'s default `['text', 'image']` means: only images render their real thumbnail inline by default; video files show as a generic file entry inline (still open the real `<video>`/YouTube/Vimeo player when clicked, since the fullscreen portal is unaffected by `previewTypes`).

## Events

| Event | Payload | Fired when |
|---|---|---|
| `focus` | — | Declared in `emits: ['focus']`, but `NPreviewController` never calls `this.emit('focus', ...)`. <!-- UNVERIFIED / apparent dead declaration --> The actual "this slide became focused" hook is the `onFocus` **prop** (a plain callback, not a Vue event): `focusPortal()` calls `this.get('onFocus')?.()` directly. Fired by `NPreviewHandler.next()`/`.prev()` calling `this.el.focus()` on the newly active `NPreviewElement`, which in turn calls the `onFocus` handler registered in `NPreviewController.onMounted()`. |

## Slots

None — `NPreview` has no `this.slot(...)` calls in `NPreviewView`; content comes entirely from the `file`/`thumb` props and the registered preview module.

## Exposed methods

None — no `pass()`/`context.expose` call in `NPreviewController` or `NPreview.ts`.

## Minimal example

```vue
<template>
  <n-preview file="https://picsum.photos/1920/1920.jpg" style="width: 160px;"></n-preview>
</template>
```

## Realistic example

Modeled on the `NPreview` section of `demos/overview.html` — a mixed gallery grouping images, a YouTube link, a Vimeo link, a video, and a PDF into one lightbox via a shared `group`, with explicit `index` to control paging order:

```vue
<template>
  <div class="n-grid gap-10">
    <n-preview
      group="gallery"
      :index="0"
      file="https://picsum.photos/1920/1920.jpg?a"
      thumb="https://picsum.photos/300/300.jpg?a"
      title="Photo A"
      style="width: 160px;"
    ></n-preview>

    <n-preview
      group="gallery"
      :index="1"
      file="https://picsum.photos/1920/1920.jpg?b"
      thumb="https://picsum.photos/300/300.jpg?b"
      title="Photo B"
      style="width: 160px;"
    ></n-preview>

    <n-preview
      group="gallery"
      :index="2"
      file="https://www.youtube.com/watch?v=m_Nw_BF90_4"
      thumb="https://via.placeholder.com/100/000/fff.jpg?text=Youtube"
      style="width: 160px;"
    ></n-preview>

    <n-preview
      group="gallery"
      :index="3"
      file="https://www.w3schools.com/html/mov_bbb.webm"
      title="Sample video"
      style="width: 160px;"
    ></n-preview>
  </div>
</template>
```

## Required composition

None — every `NPreview` instance registers itself with the internal `NPreviewHandler` singleton on mount and needs no wrapping component. Grouping into one gallery is done purely by giving multiple instances the same `group` string prop, not by nesting them inside a parent component.

## Common mistakes

- Expecting a JS API like `NPreview.open(...)` (à la `Notify`/`Alert`/`Confirm`) — there isn't one. `NPreview` is a template component; you drop `<n-preview>` where the thumbnail should appear, and clicking it (when `preview` is `true`, the default) opens the lightbox itself.
- Omitting `group` on related images and expecting prev/next to cycle between them — each `NPreview` defaults `group` to its own random UUID, so without an explicit shared `group` string every instance is its own single-item gallery.
- Assuming `previewTypes` changes what the fullscreen lightbox can play — it only controls whether the *inline* thumbnail shows the real preview (e.g. an actual `<video>` element) vs. a generic file icon. The fullscreen portal always resolves the real type.
- Setting `mime` or `forceFile` expecting them to affect rendering — neither prop is read anywhere in the component; the mime type and displayed module are always derived from `file`/`thumb` via `NPreviewHelper`.
- Relying on the `focus` emit (`@focus="..."`) — it is declared but never fired; use the `onFocus` prop (a plain function) instead.

## Gotchas

- **Invocation model: inline template component, not a global handler.** Unlike `Alert`/`Confirm`/`Notify`, there is no global function you call to show a preview — `<n-preview>` renders its own inline thumbnail in place, and internally uses a global singleton (`NPreviewHandler`, `src/preview/js/handler/NPreviewHandler.ts`) purely as **internal plumbing** to coordinate a shared fullscreen `<div class="n-preview-modal">` overlay (built once, appended to `document.body`, layered via `NModalHandler.open(uid, zIndex)` so it stacks correctly with real `NModal`s) and to support prev/next paging across every mounted `NPreview` sharing a `group`. You never call `NPreviewHandler` yourself.
- Clicking a thumbnail calls `scope.openPreview()`, which defers to `Pointer.wait(...)` before calling `NPreviewHandler.open(this.preview)` — this is a drag-vs-click disambiguation guard (from `Pointer`, `@kizmann/pico-js`), not an animation delay.
- The lightbox listens globally for `Escape` (close), `ArrowLeft`/`ArrowRight` (prev/next), and a `mouseup` on its own backdrop (`n-preview-modal__frame`) to close — these are bound once at `NPreviewHandler.init()` module-load time, not per-instance.
- `NPreviewHandler.next()`/`.prev()` are throttled by a `blocked` flag while the slide-out CSS transition (`transitionend` on `.n-animate-left`/`.n-animate-right`) is running, so rapid arrow-key presses are naturally debounced rather than queued.
- `previewTypes`'s type check (`Arr.has(data.previewTypes, display.type)`) only applies "when `data.preview` is true" — i.e. it's specifically about deciding whether to render the real preview element behind the click-affordance; with `preview: false` the raw resolved type is always used for the (now unclickable) inline thumbnail.
- `linkText` and `emptyText`-style props here go through `Locale.trans()` even though `linkText`'s own default is a hardcoded literal `'Download file'` (not sourced from `Props.EmptyText`-style i18n mixins) — the literal string is itself passed through translation at render time via the `$linkText` getter.

## Related components

- `NModalHandler`/`NModal` (`src/modal/`) — the fullscreen lightbox reuses `NModalHandler.open(uid, zIndex)`/`.close(uid)` purely for z-index stacking with other modals; it does not render an `NModal` instance itself.
- `n-button` — used for the fullscreen download link (`NPreviewView.link()`).

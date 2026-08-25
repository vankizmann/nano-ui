# NPaginator

A pagination bar (limit selector, item count, "go to page" select, and page-number buttons) with no data-fetching logic of its own — purely a controlled UI over `page`/`limit`/`total`.

## Import / Registration

Registered globally by `src/table/index.ts` as `NPaginator` (tag `<n-paginator>`). Source: `src/table/js/paginator/NPaginator.ts` / `NPaginatorController.ts` / `NPaginatorData.ts` / `NPaginatorView.ts`.

## Props

Spreads `Props.Size`, `Props.Type` (open strings — see concepts.md), plus its own props declared in `NPaginator.ts`.

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `size` | `String` | `null` | `Props.Size` | Open string, see concepts.md. |
| `type` | `String` | `null` | `Props.Type` | Open string, see concepts.md. |
| `page` | `Number` | `1` | own | Current page (1-indexed). Cloned locally (`cloneProp('page')`) and written via `update('page', value)`. |
| `limit` | `Number` | `100` | own | Rows-per-page. Cloned locally, written via `update('limit', value)`. |
| `limitOptions` | `Array` | `[25, 50, 100, 500, 1000, 2500]` (`NPaginatorLimits`, exported from `NPaginator.ts`) | own | Options for the limit `<n-select>`. |
| `total` | `Number` | `0` | own | Total row count across all pages — used to compute `pageOptions` (`Num.ceil(total / limit)` pages) and the count text. |
| `maxPages` | `Number` | `5` | own | How many numbered page buttons to show around the current page in the `'pages'` layout slot. |
| `layout` | `Array` | `['limit', 'count', 'spacer', 'goto', 'pages']` (`NPaginatorLayout`, exported from `NPaginator.ts`) | own | Ordered list of which built-in sections to render (or a custom slot name — see Slots below). |
| `limitText` | `String` | `':count item|:count items'` | own | pico-js `Locale.choice` pluralization template for the limit-select option labels. |
| `countText` | `String` | `'No items|Total :count item|Total :count items'` | own | `Locale.choice` template (0 / singular / plural forms) for the `'count'` layout section. |
| `buttonProps` | `Object` | `null` | own | Extra props spread onto every page-number `<n-button>` (`NPaginatorView.page()`). |

There is no row-data or column prop here — `NPaginator` never touches `NTable`'s `items`; it only emits page/limit changes for your own fetch/filter logic to react to.

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:page` | `(page: number)` | User picks a page from the "go to page" select (`slot_goto`) or clicks a page-number button (`page()`, on `pointerdown`) — both call `scope.update('page', index)`. |
| `update:limit` | `(limit: number)` | User picks a new page size from the limit select (`slot_limit`) — calls `scope.update('limit', value)`. |
| `paginate` | — | **Declared in `emits` but never emitted anywhere in source** (`grep` of `src/table/js/paginator` finds no `emit('paginate', ...)`/`this.emit(` call at all). Do not build logic around it — react to `update:page`/`update:limit` instead. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| any name listed in `layout` that isn't one of the 5 built-ins (`'limit'`, `'count'`, `'spacer'`, `'goto'`, `'pages'`) | none (`this.slot(key)`, no scope object passed) | `NPaginatorView.resolve(key)` looks for a `slot_${camelCase(key)}` method first; if none exists, it falls through to `slot_custom(key)`, which wraps `this.slot(key)` (a plain, unscoped named slot) in a `.n-paginator__pages` div — i.e. you can inject arbitrary custom sections into `layout` by name. |

## Exposed methods

None (`ctx.pass([...])` is never called for this component).

## Minimal example

```vue
<n-paginator :page="1" :limit="25" :total="264" />
```

## Realistic example

```vue
<template>
  <div style="display: flex; flex-direction: column; height: 500px;">
    <n-table :items="rows" style="flex: 1 1 auto; min-height: 0;">
      <n-table-column prop="name" label="Name" />
      <n-table-column prop="email" label="Email" />
    </n-table>

    <n-paginator
      :page="page"
      :limit="limit"
      :total="total"
      style="flex: 0 0 auto;"
      @update:page="onPage"
      @update:limit="onLimit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const rows = ref([]);
const total = ref(0);
const page = ref(1);
const limit = ref(25);

async function fetchPage() {
  // NPaginator does not fetch or slice data itself — you own this call.
  const res = await fetch(`/api/users?page=${page.value}&limit=${limit.value}`);
  const data = await res.json();
  rows.value = data.items;
  total.value = data.total;
}

function onPage(value) {
  page.value = value;
  fetchPage();
}

function onLimit(value) {
  limit.value = value;
  page.value = 1;
  fetchPage();
}

fetchPage();
</script>
```

## Required composition

`NPaginator` has no parent/child relationship with `NTable` at all — no `inject`/`provide` wiring connects them (confirmed: `NPaginatorController` never calls `injectRef`/`provide` for an `NTable` context, unlike `NTableColumn`). **Per project convention, `NPaginator` must never be nested inside `NTable`'s default slot** — use it as a sibling element adjacent to the table (e.g. below it, as in the realistic example), wiring `page`/`limit`/`total` to your own data-fetching logic and, typically, to `NTable`'s `items`/`sortProp`/`sortDir`/`filter`.

## Common mistakes

- Waiting for a `paginate` event — it's declared but dead code; use `update:page`/`update:limit`.
- Expecting `NPaginator` to slice/paginate an `items` array for you, or to talk to a sibling `NTable` automatically — it has zero awareness of `NTable`; all page/limit/total state and the resulting refetch/reslice is entirely your app's responsibility.
- Nesting `<n-paginator>` inside `<n-table>`'s slot — don't; keep them siblings (see "Required composition").

## Gotchas

- `total` is a plain row count, not a page count — `pageOptions`/`maxPages` math derives the page count from `Num.ceil(total / limit)` internally.
- `layout` accepts arbitrary custom slot names beyond the 5 built-ins — see Slots above.

## Related components

- `NTable` — commonly paired with, but structurally independent; must be a sibling, never a child.

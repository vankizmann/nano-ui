# Patterns

Realistic multi-component compositions, based on `demos/` usage and the
component pairings confirmed while writing `ai-docs/components/*.md`. Read
`ai-docs/concepts.md` first.

## 1. A validated form

`NForm` + `NFormItem` (`prop` matching a key in the bound `form` object) +
string-array `rules`. Validation is fully automatic (`NFormController`
deep-watches the `form` prop and recomputes on every mutation) — there is
**no** exposed `validate()`/`submit()` method to call manually (confirmed:
`NForm.ts`'s `setup()` never calls `ncx.pass(...)`). Read the computed
error/valid state back out via `NFormItem`'s own state instead of expecting a
programmatic gate.

```vue
<n-form :form="user">
    <n-form-item label="Email" prop="email" :rules="['required', 'email']">
        <n-input v-model="user.email" />
    </n-form-item>
    <n-form-item label="Confirm password" prop="passwordConfirm"
                 :rules="['required', 'same:password']">
        <n-input v-model="user.passwordConfirm" type="password" />
    </n-form-item>
    <n-button type="primary" @click="save(user)">Save</n-button>
</n-form>
```

See `ai-docs/components/form.md` for the full validation-rule reference
(`required`, `required_if:key`, `required_unless:key`, `same:key`,
`diffrent:key` — note the misspelling is intentional, matches the actual
module filename — `value:val`, `email`, `min:n`, `max:n`, `minlength:n`,
`maxlength:n`).

## 2. A draggable/reorderable tree

`NDraglist` with a nested `items` tree (`uniqueProp: 'id'`,
`childProp: 'children'` by default — see `ai-docs/components/draglist.md`
for the exact node shape). Handle `update:items` to persist the reordered
tree, and `move` if you need the specific drop target/mode for a server call.

```vue
<n-draglist
    :items="tree"
    @update:items="tree = $event"
    @move="onMove"
    v-slot="{ item, depth }"
>
    <div :style="{ paddingLeft: depth * 16 + 'px' }">{{ item.label }}</div>
</n-draglist>
```

Cross-container drag needs an `NDropzone` as the second zone; see
`ai-docs/components/dropzone.md` for its `mode` prop (controls copy vs. move
semantics on the source side).

## 3. A modal-driven CRUD flow

`NModal` (plain boolean `v-model`, no `title` prop — build your own header
markup in the `header` slot) wrapping an `NForm`, triggered from an
`NTable` row action:

```vue
<n-table :items="rows" height="400px" :current="current" @update:current="current = $event">
    <n-table-column prop="name" label="Name" />
    <n-table-column prop="active" label="Active" type="boolean" />
    <n-table-column label="" v-slot="{ item }">
        <n-button size="xs" @click="editing = { ...item }; open = true">Edit</n-button>
    </n-table-column>
</n-table>
<n-paginator :total="total" v-model:page="page" />

<n-modal v-model="open" :listen="false">
    <template #header>Edit item</template>
    <n-form :form="editing">
        <n-form-item label="Name" prop="name" :rules="['required']">
            <n-input v-model="editing.name" />
        </n-form-item>
    </n-form>
    <template #footer>
        <n-button @click="open = false">Cancel</n-button>
        <n-button type="primary" @click="save(editing); open = false">Save</n-button>
    </template>
</n-modal>
```

Remember: `NTable` requires an explicit height (its virtual scroller reads
`el.clientHeight`), `NPaginator` is never nested inside `NTable`, and sort/
filter state on `NTable` is presentational only — you must re-fetch/re-derive
`items` yourself in response to its `sort`/`update:filter` events.

## 4. Hierarchical / bulk selection

Two different tools depending on the shape of the choice:

- **`NCascader`** for a single drill-down path through a tree (region →
  city, category → subcategory). Bind `v-model` for the full path array, or
  `v-model:split-value` if you only need to persist the leaf id and let the
  component reconstruct the path from `options` on load (see
  `ai-docs/components/cascader.md`).
- **`NTransfer`** for picking an arbitrary subset out of a flat list (its own
  `labelProp`/`uniqueProp` props, NOT the `optionsValue`/`optionsLabel` trick
  — see `ai-docs/components/transfer.md`).

```vue
<n-cascader v-model="form.categoryPath" v-model:split-value="form.categoryId" :options="categoryTree" />
<n-transfer v-model="form.selectedUsers" :options="allUsers" label-prop="name" unique-prop="id" />
```

## 5. A read-only detail panel reusing table cell types

`NInfo` + `NInfoColumn` reuse `NTable`'s cell-type renderers (`string`,
`boolean`, `datetime`, `image`, `option` — note `select`/`matrix` are NOT
available here, unlike on `NTableColumn`) to render a key-value summary for
one record, typically the `current` row of a table:

```vue
<n-table :items="rows" height="300px" v-model:current="current" />
<n-info :item="current">
    <n-info-column label="Name" prop="name" />
    <n-info-column label="Active" prop="active" type="boolean" />
    <n-info-column label="Created" prop="createdAt" type="datetime" />
</n-info>
```

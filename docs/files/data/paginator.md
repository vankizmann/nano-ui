# Paginator

The `<n-paginator>` component provides pagination controls for navigating through large datasets. It offers flexible layouts, page size options, and navigation controls.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    paginatorBinds: {
        size: 'md', 
        type: 'primary',
        page: 1,
        limit: 25,
        total: 250
    }
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="paginatorBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="paginatorBinds.type" :options="types" />
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Basic Paginator</h3>
            </div>
            <div class="col--1-1">
                <n-paginator v-bind="paginatorBinds"></n-paginator>
            </div>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Custom Layout</h3>
            </div>
            <div class="col--1-1">
                <n-paginator v-bind="paginatorBinds" :layout="['foobar', 'pages', 'spacer', 'count']">
                    <template #foobar>
                        <div style="padding: 10px;">Foobar</div>
                    </template>
                </n-paginator>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Paginator

| **Prop**        | **Type**       | **Default**                               | **Description**                                                             |
|-----------------|----------------|-------------------------------------------|-----------------------------------------------------------------------------|
| `page`          | `Number`       | `1`                                       | Current page number.                                                        |
| `limit`         | `Number`       | `100`                                     | Number of items per page.                                                   |
| `limitOptions`  | `Array`        | `[25, 50, 100, 500, 1000, 2500]`          | Available options for items per page.                                       |
| `total`         | `Number`       | `0`                                       | Total number of items across all pages.                                     |
| `size`          | `String`       | `'md'`                                    | Size of the paginator components.                                           |
| `type`          | `String`       | `'primary'`                               | Style type of the paginator.                                                |
| `maxPages`      | `Number`       | `5`                                       | Maximum number of page buttons to display.                                  |
| `layout`        | `Array`        | `['limit', 'count', 'spacer', 'goto', 'pages']` | Order and components to display in the paginator.                    |

| **Computed**         | **Description**                                                      |
|----------------------|----------------------------------------------------------------------|
| `pages`              | Total number of pages based on total items and items per page.       |
| `pageOptions`        | Array of page numbers available for selection.                       |

| **Method**              | **Description**                                                      |
|-------------------------|----------------------------------------------------------------------|
| `forcePage(page)`       | Sets the current page without emitting events.                       |
| `updatePaginate()`      | Emits paginate event with current page and limit.                    |
| `onPrevPage()`          | Navigates to the previous page.                                      |
| `onNextPage()`          | Navigates to the next page.                                          |
| `onFirstPage()`         | Navigates to the first page.                                         |
| `onLastPage()`          | Navigates to the last page.                                          |
| `onPageInput(value)`    | Updates the current page.                                            |
| `onLimitInput(value)`   | Updates the items per page limit.                                    |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `update:page`         | Emitted when the page changes.                                       |
| `update:limit`        | Emitted when the limit changes.                                      |
| `paginate`            | Emitted when either page or limit changes, with both values provided.|

## Layout Options

The `layout` prop determines which components to display in the paginator and in what order. Available options:

| **Layout Item**  | **Description**                                                             |
|------------------|-----------------------------------------------------------------------------|
| `limit`          | Dropdown to select number of items per page.                                |
| `count`          | Text displaying the total number of items.                                  |
| `spacer`         | Flexible space to push elements apart.                                      |
| `goto`           | Dropdown to jump directly to a specific page.                               |
| `pages`          | Page navigation buttons (first, previous, numbered pages, next, last).      |